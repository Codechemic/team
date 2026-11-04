-- 냉장고를 부탁해 · 보안 규칙 (Row Level Security)
-- 화면이 DB를 직접 부르기 때문에 반드시 실행해야 합니다. 안 하면 누구나 남의 데이터를 바꿀 수 있어요.

alter table profiles enable row level security;
alter table admin enable row level security;
alter table recipe enable row level security;
alter table recipe_step enable row level security;
alter table ingredient enable row level security;
alter table ingredient_alias enable row level security;
alter table recipe_ingredient enable row level security;
alter table favorite enable row level security;
alter table review enable row level security;
alter table comment enable row level security;
alter table follow enable row level security;
alter table fridge_item enable row level security;
alter table recent_search enable row level security;
alter table user_preference enable row level security;
alter table user_ingredient_preference enable row level security;
alter table notification enable row level security;
alter table report enable row level security;

-- 누구나 읽기 가능 (로그인 없이 추천·검색·레시피 보기)
create policy "read all" on profiles for select using (true);
create policy "read all" on recipe for select using (true);
create policy "read all" on recipe_step for select using (true);
create policy "read all" on ingredient for select using (true);
create policy "read all" on ingredient_alias for select using (true);
create policy "read all" on recipe_ingredient for select using (true);
create policy "read all" on review for select using (true);
create policy "read all" on comment for select using (true);
create policy "read all" on follow for select using (true);

-- 내 프로필만 수정
create policy "update own" on profiles for update using (id = auth.uid());

-- 레시피: 작성자 본인만 등록·수정·삭제 (UC-E)
create policy "insert own" on recipe for insert with check (writer_id = auth.uid());
create policy "update own" on recipe for update using (writer_id = auth.uid());
create policy "delete own" on recipe for delete using (writer_id = auth.uid());
create policy "write own recipe" on recipe_step for all
  using (exists (select 1 from recipe r where r.recipe_id = recipe_step.recipe_id and r.writer_id = auth.uid()))
  with check (exists (select 1 from recipe r where r.recipe_id = recipe_step.recipe_id and r.writer_id = auth.uid()));
create policy "write own recipe" on recipe_ingredient for all
  using (exists (select 1 from recipe r where r.recipe_id = recipe_ingredient.recipe_id and r.writer_id = auth.uid()))
  with check (exists (select 1 from recipe r where r.recipe_id = recipe_ingredient.recipe_id and r.writer_id = auth.uid()));

-- 재료 목록은 관리자만 추가·수정 (재료 표준화)
create policy "admin writes" on ingredient for all using (is_admin()) with check (is_admin());
create policy "admin writes" on ingredient_alias for all using (is_admin()) with check (is_admin());

-- 내 데이터만 (찜, 냉장고, 최근 검색어, 식성, 알림)
create policy "own rows" on favorite for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own rows" on fridge_item for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own rows" on recent_search for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own rows" on user_preference for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own rows" on user_ingredient_preference for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own rows" on notification for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- 후기·댓글: 본인 글만 쓰기·수정·삭제
create policy "insert own" on review for insert with check (writer_id = auth.uid());
create policy "update own" on review for update using (writer_id = auth.uid());
create policy "delete own" on review for delete using (writer_id = auth.uid());
create policy "insert own" on comment for insert with check (writer_id = auth.uid());
create policy "update own" on comment for update using (writer_id = auth.uid());
create policy "delete own" on comment for delete using (writer_id = auth.uid() or is_admin());

-- 팔로우: 내가 하는 팔로우만
create policy "insert own" on follow for insert with check (follower_id = auth.uid());
create policy "delete own" on follow for delete using (follower_id = auth.uid());

-- 신고: 본인 신고 접수·조회, 관리자는 전체 조회·처리 (UC-F04, G01)
create policy "insert own" on report for insert with check (reporter_id = auth.uid() and status = '대기');
create policy "read own or admin" on report for select using (reporter_id = auth.uid() or is_admin());
create policy "admin updates" on report for update using (is_admin()) with check (is_admin());
create policy "read self" on admin for select using (admin_id = auth.uid());
