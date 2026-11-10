-- 냉장고를 부탁해 · 레시피 수정(UC-E02) · 레시피 알림(UC-F05) · 관리자 재료 관리(UC-G02)
-- 05_recipe_detail.sql 다음에 SQL Editor에서 한 번 실행. 여러 번 실행해도 결과는 같습니다.
-- ※ 맨 아래 "관리자 등록"의 이메일을 본인 로그인 이메일로 바꾼 뒤 실행하세요.
begin;

-- 1) 레시피 등록: 단계 사진(step_photo)도 저장 -----------------------------------------
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

  insert into recipe_step (recipe_id, step_number, description, step_photo, timer_seconds)
  select new_id, n, x->>'description', nullif(x->>'stepPhoto', ''), nullif(x->>'timerSeconds', '')::int
  from jsonb_array_elements(payload->'steps') with ordinality as t(x, n);

  return new_id;
end $$;

-- 2) 레시피 수정 (UC-E02): 본인 레시피만, 기본 정보·재료·단계를 한 번에 교체 ----------------
create or replace function update_recipe(p_recipe_id bigint, payload jsonb) returns void
language plpgsql security invoker set search_path = public as $$
declare uid uuid := auth.uid();
begin
  if uid is null then raise exception '로그인이 필요해요' using errcode = '28000'; end if;
  if not exists (select 1 from recipe where recipe_id = p_recipe_id and writer_id = uid) then
    raise exception '내가 등록한 레시피만 수정할 수 있어요' using errcode = '42501';
  end if;
  if coalesce(trim(payload->>'title'), '') = '' then raise exception '요리 이름을 입력해 주세요'; end if;
  if jsonb_array_length(coalesce(payload->'ingredients', '[]')) = 0 then raise exception '재료를 1개 이상 추가해 주세요'; end if;
  if jsonb_array_length(coalesce(payload->'steps', '[]')) = 0 then raise exception '조리 단계를 1개 이상 적어 주세요'; end if;

  update recipe set title = trim(payload->>'title'), intro = nullif(payload->>'intro', ''),
    main_photo = nullif(payload->>'mainPhoto', ''), cooking_time = coalesce((payload->>'cookingTime')::int, cooking_time),
    difficulty = coalesce(payload->>'difficulty', difficulty), servings = coalesce((payload->>'servings')::int, servings)
  where recipe_id = p_recipe_id;

  delete from recipe_ingredient where recipe_id = p_recipe_id;
  insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit)
  select p_recipe_id, (x->>'ingredientId')::bigint, nullif(x->>'quantity', '')::numeric, coalesce(x->>'unit', '개')
  from jsonb_array_elements(payload->'ingredients') x;

  delete from recipe_step where recipe_id = p_recipe_id;
  insert into recipe_step (recipe_id, step_number, description, step_photo, timer_seconds)
  select p_recipe_id, n, x->>'description', nullif(x->>'stepPhoto', ''), nullif(x->>'timerSeconds', '')::int
  from jsonb_array_elements(payload->'steps') with ordinality as t(x, n);
end $$;
grant execute on function update_recipe(bigint, jsonb) to authenticated;

-- 3) 레시피 알림 (UC-F05): 레시피가 등록되면 작성자의 팔로워에게 알림 생성 ----------------
create or replace function notify_followers() returns trigger
language plpgsql security definer set search_path = public as $$
declare nick text;
begin
  select nickname into nick from profiles where id = new.writer_id;
  insert into notification (user_id, type, related_type, related_id, message)
  select f.follower_id, 'NEW_RECIPE', 'RECIPE', new.recipe_id,
         left(coalesce(nick, '팔로우한 업로더') || '님이 새 레시피 「' || new.title || '」을(를) 올렸어요', 255)
  from follow f where f.following_id = new.writer_id;
  return null;
end $$;
drop trigger if exists recipe_notify_followers on recipe;
create trigger recipe_notify_followers after insert on recipe for each row execute function notify_followers();
create index if not exists idx_notification_user on notification(user_id, created_at desc);

-- 4) 관리자 재료 관리 (UC-G02) --------------------------------------------------------
-- 재료를 지울 때 사용자 냉장고·최근 검색어·선호 기록은 함께 지움 (레시피에 쓰인 재료는 삭제 불가로 유지)
alter table fridge_item drop constraint if exists fridge_item_ingredient_id_fkey;
alter table fridge_item add constraint fridge_item_ingredient_id_fkey foreign key (ingredient_id) references ingredient(ingredient_id) on delete cascade;
alter table recent_search drop constraint if exists recent_search_ingredient_id_fkey;
alter table recent_search add constraint recent_search_ingredient_id_fkey foreign key (ingredient_id) references ingredient(ingredient_id) on delete cascade;
alter table user_ingredient_preference drop constraint if exists user_ingredient_preference_ingredient_id_fkey;
alter table user_ingredient_preference add constraint user_ingredient_preference_ingredient_id_fkey foreign key (ingredient_id) references ingredient(ingredient_id) on delete cascade;
grant execute on function is_admin() to authenticated;

-- 기본 대체 재료 정보 (관리자 화면에서 수정 가능)
update ingredient set substitute_info = v.info from (values
  ('대파', '쪽파, 양파'), ('양파', '대파 흰 부분'), ('애호박', '주키니, 가지'), ('돼지고기', '닭고기, 소고기'),
  ('소고기', '돼지고기'), ('닭고기', '돼지고기'), ('연어', '참치 회'), ('오징어', '새우, 낙지'),
  ('새우', '오징어'), ('치즈', '모짜렐라 치즈'), ('부침가루', '밀가루 + 소금 약간'), ('고추장', '고춧가루 + 간장 + 설탕'),
  ('된장', '쌈장'), ('맛술', '청주, 설탕 약간'), ('올리고당', '설탕, 꿀'), ('버터', '식용유'), ('굴소스', '간장 + 설탕 약간'),
  ('양배추', '배추'), ('청양고추', '고춧가루'), ('새우젓', '소금'), ('식초', '레몬즙')
) as v(name, info) where ingredient.name = v.name and ingredient.substitute_info is null;

-- 관리자 등록: 아래 이메일을 본인 로그인 이메일로 바꿔서 실행 (먼저 앱에서 회원가입이 되어 있어야 함)
insert into admin (admin_id)
select id from profiles where email = '여기에_내_이메일@example.com'
on conflict do nothing;

commit;
