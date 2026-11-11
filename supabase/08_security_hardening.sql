-- 냉장고를 부탁해 · 보안 정리 (Supabase 보안 점검 경고 반영). 07 다음에 실행
-- 트리거 전용 함수는 API로 직접 호출하지 못하게
revoke execute on function handle_new_user(), notify_followers(), sync_rating(), sync_saves() from public, anon, authenticated;
-- 관리자 확인 내부 함수도 직접 호출 막기 (다른 관리자 함수 안에서만 사용)
revoke execute on function assert_admin() from public, anon, authenticated;
-- search_path 고정
alter function search_ingredients(text, text) set search_path = public;
alter function recommend_recipes(bigint[], bigint[], text) set search_path = public;
