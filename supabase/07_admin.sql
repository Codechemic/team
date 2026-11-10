-- 냉장고를 부탁해 · 관리자 기능 (UC-G01 레시피·댓글 관리, UC-G02 재료 관리, UC-N06 공지)
-- 06_edit_notify_admin.sql 다음에 SQL Editor에서 한 번 실행. 여러 번 실행해도 결과는 같습니다.
-- ※ 먼저 앱에서 관리자 계정으로 쓸 이메일(기본: admin@fridgy.app)로 회원가입한 뒤 실행하세요.
begin;

-- 1) 숨김 칸 -------------------------------------------------------------------------
alter table recipe  add column if not exists is_hidden boolean not null default false;
alter table recipe  add column if not exists hidden_reason varchar(200);
alter table comment add column if not exists is_hidden boolean not null default false;
alter table report  add column if not exists processed_at timestamptz;

-- 2) 권한: 숨긴 글은 작성자·관리자만 보임, 관리자는 모든 레시피·댓글·후기 관리 -------------
drop policy if exists "read all" on recipe;
drop policy if exists "read visible" on recipe;
create policy "read visible" on recipe for select using (not is_hidden or writer_id = auth.uid() or is_admin());
drop policy if exists "admin manage" on recipe;
create policy "admin manage" on recipe for update using (is_admin()) with check (is_admin());
drop policy if exists "admin delete" on recipe;
create policy "admin delete" on recipe for delete using (is_admin());

drop policy if exists "read all" on comment;
drop policy if exists "read visible" on comment;
create policy "read visible" on comment for select using (not is_hidden or writer_id = auth.uid() or is_admin());
drop policy if exists "admin manage" on comment;
create policy "admin manage" on comment for update using (is_admin()) with check (is_admin());

drop policy if exists "admin delete" on review;
create policy "admin delete" on review for delete using (is_admin());

-- 3) 상세 조회: 숨긴 레시피는 작성자·관리자만, 숨김 여부 포함 --------------------------------
create or replace function get_recipe(p_recipe_id bigint) returns json
language plpgsql security definer set search_path = public as $$
declare result json; hid boolean; wid uuid;
begin
  select is_hidden, writer_id into hid, wid from recipe where recipe_id = p_recipe_id;
  if wid is null or (hid and wid is distinct from auth.uid() and not is_admin()) then
    raise exception '레시피를 찾을 수 없어요' using errcode = 'P0002';
  end if;
  if not hid then update recipe set views = views + 1 where recipe_id = p_recipe_id; end if;
  select json_build_object(
    'recipeId', r.recipe_id, 'title', r.title, 'intro', r.intro, 'tip', r.tip, 'category', r.category, 'emoji', r.emoji, 'mainPhoto', r.main_photo,
    'cookingTime', r.cooking_time, 'difficulty', r.difficulty, 'servings', r.servings, 'views', r.views,
    'averageRating', r.average_rating, 'writer', p.nickname, 'writerId', p.id, 'isHidden', r.is_hidden, 'hiddenReason', r.hidden_reason,
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
  return result;
end $$;

-- 관리자 확인 공통
create or replace function assert_admin() returns void
language plpgsql stable security definer set search_path = public as $$
begin
  if not is_admin() then raise exception '관리자만 사용할 수 있어요' using errcode = '42501'; end if;
end $$;

-- 4) 대시보드 통계 -------------------------------------------------------------------
create or replace function admin_stats() returns json
language plpgsql stable security definer set search_path = public as $$
begin
  perform assert_admin();
  return json_build_object(
    'users', (select count(*) from profiles),
    'newUsers7d', (select count(*) from profiles where created_at > now() - interval '7 days'),
    'recipes', (select count(*) from recipe),
    'hiddenRecipes', (select count(*) from recipe where is_hidden),
    'newRecipes7d', (select count(*) from recipe where created_at > now() - interval '7 days'),
    'reviews', (select count(*) from review),
    'comments', (select count(*) from comment),
    'pendingReports', (select count(*) from report where status = '대기'),
    'ingredients', (select count(*) from ingredient),
    'topRecipes', coalesce((select json_agg(t) from (select recipe_id as "recipeId", title, views, saves from recipe where not is_hidden order by views desc limit 5) t), '[]')
  );
end $$;

-- 5) 신고 목록: 대상별로 묶어서 (대상 정보·신고 사유·횟수) -----------------------------------
create or replace function admin_reports(p_status text default '대기') returns json
language plpgsql stable security definer set search_path = public as $$
begin
  perform assert_admin();
  return coalesce((
    select json_agg(x order by x."lastAt" desc) from (
      select rp.target_type as "targetType", rp.target_id as "targetId",
             count(*) as "count", max(rp.created_at) as "lastAt",
             json_agg(json_build_object('reportId', rp.report_id, 'reason', rp.reason, 'reporter', pr.nickname, 'createdAt', rp.created_at, 'status', rp.status) order by rp.created_at desc) as reports,
             case rp.target_type
               when 'RECIPE' then (select json_build_object('title', r.title, 'writer', w.nickname, 'writerId', r.writer_id, 'isHidden', r.is_hidden, 'recipeId', r.recipe_id, 'emoji', r.emoji)
                                   from recipe r join profiles w on w.id = r.writer_id where r.recipe_id = rp.target_id)
               else (select json_build_object('content', c.content, 'writer', w.nickname, 'writerId', c.writer_id, 'isHidden', c.is_hidden, 'recipeId', c.recipe_id, 'title', r.title)
                     from comment c join profiles w on w.id = c.writer_id join recipe r on r.recipe_id = c.recipe_id where c.comment_id = rp.target_id)
             end as target
      from report rp join profiles pr on pr.id = rp.reporter_id
      where p_status = '전체' or rp.status = p_status
      group by rp.target_type, rp.target_id
    ) x), '[]');
end $$;

-- 6) 신고 처리 (UC-G01): hide 숨김 · delete 삭제 · restore 숨김 해제 · reject 반려 ----------------
create or replace function admin_resolve(p_target_type text, p_target_id bigint, p_action text, p_reason text default null) returns void
language plpgsql security definer set search_path = public as $$
declare wid uuid; ttl text;
begin
  perform assert_admin();
  if p_action not in ('hide', 'delete', 'restore', 'reject') then raise exception '알 수 없는 처리예요'; end if;
  if p_target_type = 'RECIPE' then
    select writer_id, title into wid, ttl from recipe where recipe_id = p_target_id;
  else
    select c.writer_id, r.title into wid, ttl from comment c join recipe r using (recipe_id) where c.comment_id = p_target_id;
  end if;

  if p_action = 'hide' then
    if p_target_type = 'RECIPE' then update recipe set is_hidden = true, hidden_reason = coalesce(p_reason, '신고 접수로 숨김') where recipe_id = p_target_id;
    else update comment set is_hidden = true where comment_id = p_target_id; end if;
  elsif p_action = 'restore' then
    if p_target_type = 'RECIPE' then update recipe set is_hidden = false, hidden_reason = null where recipe_id = p_target_id;
    else update comment set is_hidden = false where comment_id = p_target_id; end if;
  elsif p_action = 'delete' then
    if p_target_type = 'RECIPE' then delete from recipe where recipe_id = p_target_id;
    else delete from comment where comment_id = p_target_id; end if;
  end if;

  update report set status = case when p_action = 'reject' then '반려' else '처리 완료' end,
                    processed_by_admin_id = auth.uid(), processed_at = now()
  where target_type = p_target_type and target_id = p_target_id and (status = '대기' or p_action = 'restore');

  -- 작성자에게 처리 결과 알림
  if wid is not null and p_action in ('hide', 'delete') then
    insert into notification (user_id, type, related_type, related_id, message)
    values (wid, 'ADMIN', case when p_action = 'hide' then p_target_type end, case when p_action = 'hide' and p_target_type = 'RECIPE' then p_target_id end,
            left('관리자가 「' || coalesce(ttl, '') || '」' || case when p_target_type = 'RECIPE' then ' 레시피를 ' else '에 남긴 댓글을 ' end
                 || case when p_action = 'hide' then '숨김 처리했어요' else '삭제했어요' end
                 || coalesce(' (사유: ' || p_reason || ')', ''), 255));
  end if;
end $$;

-- 7) 공지 (UC-N06): 관리자가 앱에서 점검·공지 등록 -------------------------------------------
create table if not exists notice (
  notice_id   bigint generated by default as identity primary key,
  message     varchar(300) not null,
  level       varchar(10)  not null default 'warn' check (level in ('info', 'warn', 'error')),
  starts_at   timestamptz  not null default now(),
  ends_at     timestamptz,
  created_at  timestamptz  not null default now(),
  created_by  uuid references profiles(id) on delete set null
);
alter table notice enable row level security;
drop policy if exists "read all" on notice;
create policy "read all" on notice for select using (true);
drop policy if exists "admin writes" on notice;
create policy "admin writes" on notice for all using (is_admin()) with check (is_admin());

-- 8) 회원 관리: 목록·관리자 지정/해제 -----------------------------------------------------
create or replace function admin_users(q text default '') returns json
language plpgsql stable security definer set search_path = public as $$
begin
  perform assert_admin();
  return coalesce((select json_agg(u order by u."createdAt" desc) from (
    select p.id, p.nickname, p.email, p.created_at as "createdAt",
           (select count(*) from recipe r where r.writer_id = p.id) as recipes,
           (select count(*) from report rp where rp.reporter_id = p.id) as reports,
           exists (select 1 from admin a where a.admin_id = p.id) as "isAdmin"
    from profiles p
    where q = '' or p.nickname ilike '%' || q || '%' or p.email ilike '%' || q || '%'
    limit 200) u), '[]');
end $$;

create or replace function admin_set_admin(p_user uuid, p_on boolean) returns void
language plpgsql security definer set search_path = public as $$
begin
  perform assert_admin();
  if p_on then insert into admin (admin_id) values (p_user) on conflict do nothing;
  else
    if p_user = auth.uid() then raise exception '내 관리자 권한은 스스로 해제할 수 없어요'; end if;
    delete from admin where admin_id = p_user;
  end if;
end $$;

revoke execute on function admin_stats(), admin_reports(text), admin_resolve(text, bigint, text, text), admin_users(text), admin_set_admin(uuid, boolean), assert_admin() from public, anon;
grant execute on function admin_stats(), admin_reports(text), admin_resolve(text, bigint, text, text), admin_users(text), admin_set_admin(uuid, boolean), assert_admin() to authenticated;

-- 9) 관리자 전용 계정 등록 ------------------------------------------------------------------
-- 앱에서 admin@fridgy.app 으로 회원가입(닉네임: 관리자)한 뒤 이 SQL을 실행하면 관리자가 됩니다.
-- 다른 이메일을 쓰려면 아래 이메일만 바꾸세요.
insert into admin (admin_id) select id from profiles where email = 'admin@fridgy.app' on conflict do nothing;

commit;
