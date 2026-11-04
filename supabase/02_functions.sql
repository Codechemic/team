-- 냉장고를 부탁해 · DB 함수와 트리거 (클래스 다이어그램의 Service/Handler 역할)
-- 화면에서는 supabase.rpc('함수이름', {...}) 로 호출

-- 회원가입하면 profiles 자동 생성 (닉네임은 가입 때 넘긴 값, 없으면 이메일 앞부분) ---------------------
create or replace function handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, nickname, email)
  values (new.id, coalesce(nullif(new.raw_user_meta_data->>'nickname', ''), split_part(new.email, '@', 1)), new.email);
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function handle_new_user();

-- IngredientService.searchIngredients (UC-B01, E04) -----------------------------------------
-- 표준 재료 이름과 별칭을 함께 검색. 정렬: 완전 일치 > 이름 앞부분 > 별칭 앞부분 > 이름 포함 > 별칭 포함
create or replace function search_ingredients(q text default '', cat text default '')
returns table (id bigint, name varchar, category varchar, emoji varchar, matched_alias varchar)
language sql stable as $$
  with k as (select regexp_replace(coalesce(q, ''), '\s', '', 'g') as k)
  select i.ingredient_id, i.name, i.category, i.emoji,
         case when a.ascore < coalesce(n.nscore, 99) then a.alias_name end
  from ingredient i
  cross join k
  cross join lateral (select case when k.k = '' then 9
                                  when i.name = k.k then 0
                                  when i.name like k.k || '%' then 2
                                  when i.name like '%' || k.k || '%' then 4 end as nscore) n
  left join lateral (
    select al.alias_name,
           case when al.alias_name = k.k then 0 when al.alias_name like k.k || '%' then 3 else 5 end as ascore
    from ingredient_alias al
    where al.ingredient_id = i.ingredient_id and k.k <> '' and al.alias_name like '%' || k.k || '%'
    order by 2 limit 1
  ) a on true
  where i.is_seasoning = false
    and (k.k <> '' or coalesce(cat, '') in ('', '전체') or i.category = cat)
    and (n.nscore is not null or a.ascore is not null)
  order by least(coalesce(n.nscore, 99), coalesce(a.ascore, 99)), length(i.name), i.ingredient_id;
$$;

-- RecipeService.recommendRecipes (UC-C01, C02) ----------------------------------------------
-- 일치율 = 일치한 주재료 ÷ 레시피 주재료 × 100 (양념 제외), 일치 0개·제외 재료 포함 레시피는 뺌
create or replace function recommend_recipes(ingredient_ids bigint[], exclude_ids bigint[] default '{}', sort text default 'rec')
returns table (recipe_id bigint, title varchar, emoji varchar, main_photo varchar, cooking_time int, difficulty varchar,
               average_rating numeric, match_rate int, matched_count int, missing text[])
language sql stable as $$
  with s as (
    select r.recipe_id,
           count(*) filter (where ri.ingredient_id = any(ingredient_ids))::int as matched,
           count(*)::int as total,
           coalesce(array_agg(i.name::text order by i.ingredient_id) filter (where not (ri.ingredient_id = any(ingredient_ids))), '{}') as missing
    from recipe r
    join recipe_ingredient ri on ri.recipe_id = r.recipe_id
    join ingredient i on i.ingredient_id = ri.ingredient_id and i.is_seasoning = false
    where not exists (select 1 from recipe_ingredient x where x.recipe_id = r.recipe_id and x.ingredient_id = any(exclude_ids))
    group by r.recipe_id
  )
  select r.recipe_id, r.title, r.emoji, r.main_photo, r.cooking_time, r.difficulty, r.average_rating,
         round(s.matched * 100.0 / s.total)::int, s.matched, s.missing
  from s join recipe r using (recipe_id)
  where s.matched > 0
  order by
    case when sort = 'time' then r.cooking_time end asc,
    case when sort = 'rating' then r.average_rating end desc,
    round(s.matched * 100.0 / s.total) desc, s.matched desc, r.average_rating desc, r.recipe_id;
$$;

-- RecipeService.getRecipe (UC-D): 조회수 +1 후 상세(재료·단계 포함)를 JSON으로 -----------------------
create or replace function get_recipe(p_recipe_id bigint) returns json
language plpgsql security definer set search_path = public as $$
declare result json;
begin
  update recipe set views = views + 1 where recipe_id = p_recipe_id;
  select json_build_object(
    'recipeId', r.recipe_id, 'title', r.title, 'intro', r.intro, 'emoji', r.emoji, 'mainPhoto', r.main_photo,
    'cookingTime', r.cooking_time, 'difficulty', r.difficulty, 'servings', r.servings, 'views', r.views,
    'averageRating', r.average_rating, 'writer', p.nickname, 'writerId', p.id,
    'ingredients', coalesce((select json_agg(json_build_object(
        'ingredientId', i.ingredient_id, 'name', i.name, 'emoji', i.emoji,
        'quantity', ri.quantity, 'unit', ri.unit, 'isSeasoning', i.is_seasoning) order by i.is_seasoning, i.ingredient_id)
      from recipe_ingredient ri join ingredient i using (ingredient_id) where ri.recipe_id = r.recipe_id), '[]'),
    'steps', coalesce((select json_agg(json_build_object(
        'stepNumber', st.step_number, 'description', st.description, 'stepPhoto', st.step_photo, 'timerSeconds', st.timer_seconds)
        order by st.step_number)
      from recipe_step st where st.recipe_id = r.recipe_id), '[]'))
  into result
  from recipe r join profiles p on p.id = r.writer_id
  where r.recipe_id = p_recipe_id;
  if result is null then raise exception '레시피를 찾을 수 없어요' using errcode = 'P0002'; end if;
  return result;
end $$;

-- RecipeService.registerRecipe (UC-E01, E04): 레시피·재료·단계를 한 번에 저장 ------------------------
create or replace function create_recipe(payload jsonb) returns bigint
language plpgsql security invoker set search_path = public as $$
declare new_id bigint; uid uuid := auth.uid();
begin
  if uid is null then raise exception '로그인이 필요해요' using errcode = '28000'; end if;
  if coalesce(trim(payload->>'title'), '') = '' then raise exception '요리 이름을 입력해 주세요'; end if;
  if jsonb_array_length(coalesce(payload->'ingredients', '[]')) = 0 then raise exception '재료를 1개 이상 추가해 주세요'; end if;
  if jsonb_array_length(coalesce(payload->'steps', '[]')) = 0 then raise exception '조리 단계를 1개 이상 적어 주세요'; end if;

  insert into recipe (writer_id, title, intro, emoji, main_photo, cooking_time, difficulty, servings)
  values (uid, trim(payload->>'title'), nullif(payload->>'intro', ''), coalesce(payload->>'emoji', '🍽️'),
          nullif(payload->>'mainPhoto', ''), coalesce((payload->>'cookingTime')::int, 20),
          coalesce(payload->>'difficulty', '쉬움'), coalesce((payload->>'servings')::int, 2))
  returning recipe_id into new_id;

  insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit)
  select new_id, (x->>'ingredientId')::bigint, nullif(x->>'quantity', '')::numeric, coalesce(x->>'unit', '개')
  from jsonb_array_elements(payload->'ingredients') x;

  insert into recipe_step (recipe_id, step_number, description, timer_seconds)
  select new_id, row_number() over (), x->>'description', nullif(x->>'timerSeconds', '')::int
  from jsonb_array_elements(payload->'steps') x;

  return new_id;
end $$;

-- InteractionService: 찜 수(saves) ±1, 후기 평균 평점 재계산 (시퀀스 다이어그램 ⑤) ----------------------
create or replace function sync_saves() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then update recipe set saves = saves + 1 where recipe_id = new.recipe_id;
  else update recipe set saves = greatest(saves - 1, 0) where recipe_id = old.recipe_id; end if;
  return null;
end $$;
create trigger favorite_saves after insert or delete on favorite for each row execute function sync_saves();

create or replace function sync_rating() returns trigger
language plpgsql security definer set search_path = public as $$
declare rid bigint := coalesce(new.recipe_id, old.recipe_id);
begin
  update recipe set average_rating = coalesce((select round(avg(rating), 2) from review where recipe_id = rid), 0)
  where recipe_id = rid;
  return null;
end $$;
create trigger review_rating after insert or update or delete on review for each row execute function sync_rating();

-- 관리자 여부 (보안 규칙에서 사용)
create or replace function is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from admin where admin_id = auth.uid());
$$;
