-- 냉장고를 부탁해 · 05 + 06 + 07 한 번에 실행 (Supabase SQL Editor에 통째로 붙여넣고 Run)
-- 내용은 05_recipe_detail.sql, 06_edit_notify_admin.sql, 07_admin.sql 과 같습니다. 여러 번 실행해도 안전합니다.
-- ※ 실행 전에 앱에서 admin@fridgy.app 으로 회원가입해 두면 그 계정이 관리자가 됩니다.

-- ===================== 05_recipe_detail.sql =====================
-- 냉장고를 부탁해 · 레시피 상세화 (seed.sql 다음에 SQL Editor에서 한 번 실행)
-- 여러 번 실행해도 결과는 같습니다.
begin;

-- 1) 레시피 팁 칸 추가
alter table recipe add column if not exists tip text;

-- 2) 새 양념 재료 (일치율 계산 제외)
insert into ingredient (ingredient_id, name, category, emoji, is_seasoning) values (29, '고춧가루', '양념', '🌶️', true) on conflict (ingredient_id) do update set name = excluded.name, category = excluded.category, emoji = excluded.emoji, is_seasoning = excluded.is_seasoning;
insert into ingredient_alias (alias_name, ingredient_id) values ('고추가루', 29) on conflict (alias_name) do nothing;
insert into ingredient (ingredient_id, name, category, emoji, is_seasoning) values (30, '참기름', '양념', '🫙', true) on conflict (ingredient_id) do update set name = excluded.name, category = excluded.category, emoji = excluded.emoji, is_seasoning = excluded.is_seasoning;
insert into ingredient_alias (alias_name, ingredient_id) values ('들기름', 30) on conflict (alias_name) do nothing;
insert into ingredient (ingredient_id, name, category, emoji, is_seasoning) values (31, '후추', '양념', '🧂', true) on conflict (ingredient_id) do update set name = excluded.name, category = excluded.category, emoji = excluded.emoji, is_seasoning = excluded.is_seasoning;
insert into ingredient_alias (alias_name, ingredient_id) values ('후춧가루', 31) on conflict (alias_name) do nothing;
insert into ingredient (ingredient_id, name, category, emoji, is_seasoning) values (32, '통깨', '양념', '🌰', true) on conflict (ingredient_id) do update set name = excluded.name, category = excluded.category, emoji = excluded.emoji, is_seasoning = excluded.is_seasoning;
insert into ingredient_alias (alias_name, ingredient_id) values ('깨', 32) on conflict (alias_name) do nothing;
insert into ingredient_alias (alias_name, ingredient_id) values ('참깨', 32) on conflict (alias_name) do nothing;
insert into ingredient (ingredient_id, name, category, emoji, is_seasoning) values (33, '맛술', '양념', '🍶', true) on conflict (ingredient_id) do update set name = excluded.name, category = excluded.category, emoji = excluded.emoji, is_seasoning = excluded.is_seasoning;
insert into ingredient_alias (alias_name, ingredient_id) values ('미림', 33) on conflict (alias_name) do nothing;
insert into ingredient (ingredient_id, name, category, emoji, is_seasoning) values (34, '버터', '양념', '🧈', true) on conflict (ingredient_id) do update set name = excluded.name, category = excluded.category, emoji = excluded.emoji, is_seasoning = excluded.is_seasoning;
insert into ingredient (ingredient_id, name, category, emoji, is_seasoning) values (35, '올리고당', '양념', '🍯', true) on conflict (ingredient_id) do update set name = excluded.name, category = excluded.category, emoji = excluded.emoji, is_seasoning = excluded.is_seasoning;
insert into ingredient_alias (alias_name, ingredient_id) values ('물엿', 35) on conflict (alias_name) do nothing;
insert into ingredient (ingredient_id, name, category, emoji, is_seasoning) values (36, '굴소스', '양념', '🫙', true) on conflict (ingredient_id) do update set name = excluded.name, category = excluded.category, emoji = excluded.emoji, is_seasoning = excluded.is_seasoning;
insert into ingredient (ingredient_id, name, category, emoji, is_seasoning) values (37, '다시마', '양념', '🌊', true) on conflict (ingredient_id) do update set name = excluded.name, category = excluded.category, emoji = excluded.emoji, is_seasoning = excluded.is_seasoning;
insert into ingredient (ingredient_id, name, category, emoji, is_seasoning) values (38, '양배추', '채소', '🥬', false) on conflict (ingredient_id) do update set name = excluded.name, category = excluded.category, emoji = excluded.emoji, is_seasoning = excluded.is_seasoning;
insert into ingredient (ingredient_id, name, category, emoji, is_seasoning) values (39, '청양고추', '양념', '🌶️', true) on conflict (ingredient_id) do update set name = excluded.name, category = excluded.category, emoji = excluded.emoji, is_seasoning = excluded.is_seasoning;
insert into ingredient_alias (alias_name, ingredient_id) values ('고추', 39) on conflict (alias_name) do nothing;
insert into ingredient_alias (alias_name, ingredient_id) values ('풋고추', 39) on conflict (alias_name) do nothing;
insert into ingredient (ingredient_id, name, category, emoji, is_seasoning) values (40, '식초', '양념', '🍶', true) on conflict (ingredient_id) do update set name = excluded.name, category = excluded.category, emoji = excluded.emoji, is_seasoning = excluded.is_seasoning;
insert into ingredient (ingredient_id, name, category, emoji, is_seasoning) values (41, '와사비', '양념', '🟢', true) on conflict (ingredient_id) do update set name = excluded.name, category = excluded.category, emoji = excluded.emoji, is_seasoning = excluded.is_seasoning;
insert into ingredient_alias (alias_name, ingredient_id) values ('고추냉이', 41) on conflict (alias_name) do nothing;
insert into ingredient (ingredient_id, name, category, emoji, is_seasoning) values (42, '멸치', '양념', '🐟', true) on conflict (ingredient_id) do update set name = excluded.name, category = excluded.category, emoji = excluded.emoji, is_seasoning = excluded.is_seasoning;
insert into ingredient_alias (alias_name, ingredient_id) values ('국물용멸치', 42) on conflict (alias_name) do nothing;
insert into ingredient_alias (alias_name, ingredient_id) values ('다시멸치', 42) on conflict (alias_name) do nothing;
select setval(pg_get_serial_sequence('ingredient', 'ingredient_id'), (select max(ingredient_id) from ingredient));

-- 3) 레시피 12개: 소개·분류·팁·재료·조리 단계(10단계 이상) 교체

-- 감자계란볶음
update recipe set intro = '채 썬 감자를 파기름에 아삭하게 볶고, 부드러운 스크램블 계란을 더한 기본 밑반찬. 도시락 반찬으로도 좋아요.', category = '반찬', tip = '감자 전분을 충분히 빼고 물기를 닦아야 팬에 눌어붙지 않고 아삭해요. 계란은 먼저 반숙으로 익혀 두었다가 마지막에 넣어야 부드럽게 남아요.', emoji = '🍳', cooking_time = 20 where recipe_id = 1;
delete from recipe_ingredient where recipe_id = 1;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (1, 1, 2, '개'), (1, 16, 3, '개'), (1, 4, 0.5, '개'), (1, 3, 0.2, '개'), (1, 5, 0.5, '대'), (1, 22, 3, '큰술'), (1, 21, 0.5, '작은술'), (1, 31, null, '약간'), (1, 30, 0.5, '큰술'), (1, 32, 0.5, '큰술');
delete from recipe_step where recipe_id = 1;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (1, 1, '감자는 껍질을 벗기고 0.3cm 두께로 편 썬 뒤, 같은 굵기로 가늘게 채 썰어요. 굵기가 일정해야 고르게 익어요.', null), (1, 2, '채 썬 감자를 찬물에 5분 담갔다가 물을 2~3번 갈아 가며 헹궈 전분을 빼요.', 300), (1, 3, '감자를 체에 밭쳐 물기를 빼고, 키친타월로 눌러 남은 물기를 꼼꼼히 닦아요.', null), (1, 4, '양파와 당근은 감자와 비슷한 굵기로 채 썰고, 대파는 송송 썰어 둬요.', null), (1, 5, '볼에 계란 3개와 소금 한 꼬집을 넣고 알끈이 끊어지도록 충분히 풀어요.', null), (1, 6, '달군 팬에 식용유 1큰술을 두르고 중불에서 계란물을 부어, 젓가락으로 크게 저어 70%만 익힌 뒤 접시에 덜어 둬요.', 60), (1, 7, '같은 팬에 식용유 2큰술과 대파 절반을 넣고 약불에서 1분간 볶아 파기름을 내요.', 60), (1, 8, '감자와 당근을 넣고 중불에서 3분간 볶아요. 자주 뒤적여야 팬에 붙지 않아요.', 180), (1, 9, '양파를 넣고 소금 1/2작은술로 간한 뒤, 감자가 반투명해질 때까지 2분 더 볶아요.', 120), (1, 10, '감자 한 가닥을 맛봐서 덜 익었으면 물 2큰술을 넣고 뚜껑을 덮어 1분간 익혀요.', 60), (1, 11, '덜어 둔 계란과 남은 대파를 넣고 30초만 가볍게 섞어요. 오래 볶으면 계란이 퍽퍽해져요.', 30), (1, 12, '불을 끄고 후추, 참기름, 통깨를 뿌려 한 번 섞으면 완성이에요.', null);

-- 감자전
update recipe set intro = '강판에 간 감자와 가라앉힌 감자 전분으로 겉은 바삭, 속은 쫀득하게 부치는 정통 감자전. 초간장을 곁들여요.', category = '반찬', tip = '감자에서 빠진 전분을 다시 넣는 게 쫀득함의 비결이에요. 반죽을 얇게 펴고 기름을 넉넉히 둘러야 가장자리가 튀기듯 바삭해져요.', emoji = '🥞', cooking_time = 35 where recipe_id = 2;
delete from recipe_ingredient where recipe_id = 2;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (2, 1, 3, '개'), (2, 4, 0.25, '개'), (2, 20, 1, '큰술'), (2, 21, 0.3, '작은술'), (2, 22, 5, '큰술'), (2, 23, 2, '큰술'), (2, 40, 1, '큰술'), (2, 28, 1, '큰술'), (2, 29, null, '약간');
delete from recipe_step where recipe_id = 2;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (2, 1, '감자는 껍질을 벗기고 찬물에 한 번 헹궈요. 양파도 껍질을 벗겨 둬요.', null), (2, 2, '감자와 양파를 강판에 곱게 갈아요. 믹서를 쓸 때는 물 없이 짧게 끊어 갈아야 질어지지 않아요.', null), (2, 3, '간 감자를 체에 밭쳐 숟가락으로 꾹꾹 눌러 물기를 짜고, 빠진 물은 볼에 받아 둬요.', null), (2, 4, '받아 둔 감자 물을 10분간 그대로 두어 하얀 전분을 바닥에 가라앉혀요.', 600), (2, 5, '윗물만 조심스럽게 따라 버리고, 바닥에 남은 하얀 전분은 그대로 둬요.', null), (2, 6, '전분이 있는 볼에 감자 건더기, 부침가루 1큰술, 소금을 넣고 고루 섞어 반죽을 만들어요.', null), (2, 7, '간장 2큰술, 식초 1큰술, 물 1큰술, 고춧가루 약간을 섞어 초간장을 만들어요.', null), (2, 8, '팬에 식용유 3큰술을 두르고 중불에서 1분간 충분히 달궈요. 기름이 넉넉해야 바삭해요.', 60), (2, 9, '반죽을 한 국자 떠서 올리고 숟가락으로 지름 10cm 정도로 얇게 펴요.', null), (2, 10, '가장자리가 노릇하고 투명해질 때까지 3분간 그대로 부쳐요.', 180), (2, 11, '뒤집은 뒤 뒤집개로 꾹 눌러 주고, 기름을 1큰술씩 보충하며 2~3분 더 부쳐요.', 150), (2, 12, '키친타월 위에 올려 기름을 빼고, 초간장과 함께 따뜻할 때 내요.', null);

-- 계란찜
update recipe set intro = '뚝배기 하나로 끓이는 몽글몽글 폭신한 식당식 계란찜. 새우젓으로 간해 감칠맛이 좋아요.', category = '반찬', tip = '처음에 저어 주면 바닥이 타지 않고 전체가 고르게 익어요. 뚜껑을 덮은 뒤에는 꼭 약불로! 새우젓이 없으면 소금 1/3작은술로 대신해요.', emoji = '🍮', cooking_time = 20 where recipe_id = 3;
delete from recipe_ingredient where recipe_id = 3;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (3, 16, 4, '개'), (3, 28, 120, 'ml'), (3, 27, 1, '작은술'), (3, 26, 0.3, '작은술'), (3, 5, 0.3, '대'), (3, 3, 0.1, '개'), (3, 30, 0.5, '큰술'), (3, 32, null, '약간');
delete from recipe_step where recipe_id = 3;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (3, 1, '대파는 송송 썰고, 당근은 아주 잘게 다져요. 새우젓은 건더기만 건져 잘게 다져요.', null), (3, 2, '볼에 계란 4개, 다진 새우젓, 설탕을 넣고 알끈이 끊어질 때까지 충분히 풀어요.', null), (3, 3, '물 120ml를 넣고 섞은 뒤 체에 한 번 걸러요. 걸러야 식감이 훨씬 부드러워요.', null), (3, 4, '뚝배기를 중약불에 올려 1분간 예열해요.', 60), (3, 5, '계란물을 붓고 다진 당근을 넣어요.', null), (3, 6, '숟가락으로 바닥과 가장자리를 긁어 가며 계속 저어요. 눌어붙지 않게 하는 게 핵심이에요.', 120), (3, 7, '계란이 몽글몽글 70% 정도 엉기면 대파를 넣고 한 번만 크게 섞어요.', null), (3, 8, '크기가 맞는 뚜껑이나 뒤집은 그릇을 덮고 약불로 줄여 3분간 익혀요.', 180), (3, 9, '뚜껑 위로 봉긋하게 부풀어 오르면 불을 끄고 1분간 뜸을 들여요.', 60), (3, 10, '뚜껑을 열고 참기름 몇 방울과 통깨를 뿌려 뜨거울 때 내요.', null);

-- 김치볶음밥
update recipe set intro = '파기름과 눌린 간장으로 감칠맛을 낸 백종원 스타일 김치볶음밥. 반숙 계란 프라이를 올려 완성해요.', category = '밥', tip = '잘 익은 신김치일수록 맛있어요. 너무 시면 설탕을 조금 더 넣어 신맛을 잡아요. 찬밥을 쓰면 밥알이 뭉치지 않고 고슬고슬해져요.', emoji = '🍛', cooking_time = 20 where recipe_id = 4;
delete from recipe_ingredient where recipe_id = 4;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (4, 9, 200, 'g'), (4, 18, 2, '공기'), (4, 5, 1, '대'), (4, 16, 2, '개'), (4, 22, 3, '큰술'), (4, 23, 1, '큰술'), (4, 26, 0.5, '큰술'), (4, 29, 1, '큰술'), (4, 34, 10, 'g'), (4, 30, 1, '큰술'), (4, 32, null, '약간');
delete from recipe_step where recipe_id = 4;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (4, 1, '김치는 속을 털어 내고 가위로 1cm 크기로 잘게 잘라요. 김치 국물 2큰술은 따로 덜어 둬요.', null), (4, 2, '대파는 송송 썰고, 밥은 찬밥을 준비해요. 따뜻한 밥이면 넓게 펼쳐 한 김 식혀요.', null), (4, 3, '팬에 식용유 3큰술과 대파를 넣고 약불에서 2분간 볶아 파기름을 내요.', 120), (4, 4, '중불로 올리고 팬 한쪽에 간장 1큰술을 둘러 살짝 눌려 불향을 내요.', 20), (4, 5, '김치와 설탕을 넣고 김치가 투명해질 때까지 3분간 볶아요.', 180), (4, 6, '고춧가루를 넣고 기름에 30초간 볶아 색을 내요.', 30), (4, 7, '불을 끄고 밥을 넣어요. 불을 끈 상태에서 섞어야 밥이 눌어붙지 않아요.', null), (4, 8, '주걱을 세워 자르듯이 섞어 양념이 밥알에 고루 묻게 해요.', null), (4, 9, '다시 센 불로 올리고 김치 국물을 넣어 2분간 볶아 수분을 날려요.', 120), (4, 10, '버터와 참기름을 넣고 30초 섞은 뒤 맛을 보고 싱거우면 간장을 조금 더해요.', 30), (4, 11, '다른 팬에 식용유를 두르고 계란 프라이 2개를 반숙으로 부쳐요.', 120), (4, 12, '그릇에 볶음밥을 담고 계란 프라이를 올린 뒤 통깨를 뿌려 완성해요.', null);

-- 된장찌개
update recipe set intro = '멸치·다시마 육수에 된장을 풀고 감자, 애호박, 두부를 넣어 끓인 구수한 집 된장찌개.', category = '국·찌개', tip = '된장은 체에 걸러 풀면 국물이 깔끔해요. 오래 끓이면 된장 향이 날아가니 채소가 익으면 바로 불을 끄세요. 육수를 넉넉히 우려 냉장 보관하면 다음엔 10분이면 끓여요.', emoji = '🍲', cooking_time = 35 where recipe_id = 5;
delete from recipe_ingredient where recipe_id = 5;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (5, 17, 0.5, '모'), (5, 1, 1, '개'), (5, 7, 0.3, '개'), (5, 4, 0.5, '개'), (5, 5, 0.5, '대'), (5, 6, 0.5, '큰술'), (5, 25, 2, '큰술'), (5, 29, 0.5, '큰술'), (5, 39, 1, '개'), (5, 42, 10, '마리'), (5, 37, 1, '장'), (5, 28, 600, 'ml');
delete from recipe_step where recipe_id = 5;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (5, 1, '국물용 멸치는 머리와 배 속 검은 내장을 떼어 내요. 내장이 남으면 국물이 써요.', null), (5, 2, '냄비에 손질한 멸치를 넣고 중불에서 1분간 마른 채로 볶아 비린내를 날려요.', 60), (5, 3, '물 600ml와 다시마를 넣고 센 불로 끓여요. 물이 끓기 시작하면 다시마는 건져요.', 300), (5, 4, '불을 중약불로 줄여 멸치를 10분간 우린 뒤 건져 내 육수를 완성해요.', 600), (5, 5, '감자는 0.7cm 두께로 납작하게, 애호박은 반달 모양으로, 양파는 깍둑 썰어요. 두부는 2cm 크기로 썰고, 대파와 청양고추는 어슷 썰어요.', null), (5, 6, '육수에 된장 2큰술을 체에 받쳐 풀고 다진 마늘을 넣어요.', null), (5, 7, '단단한 감자부터 넣고 중불에서 5분간 끓여요.', 300), (5, 8, '양파와 애호박을 넣고 3분간 더 끓여요.', 180), (5, 9, '두부와 고춧가루를 넣고 3분간 보글보글 끓여요.', 180), (5, 10, '국물 맛을 보고 싱거우면 된장을 조금씩 더 풀어 간을 맞춰요.', null), (5, 11, '대파와 청양고추를 넣고 1분만 더 끓여요.', 60), (5, 12, '불을 끄고 바로 뚝배기에 담아 내요. 오래 두면 채소 전분 때문에 국물이 텁텁해져요.', null);

-- 제육볶음
update recipe set intro = '고기를 먼저 굽고 설탕으로 코팅한 뒤 고추장 양념에 졸여 불향을 입힌 밥도둑 제육볶음.', category = '일품', tip = '앞다리살이나 목살을 쓰면 부드럽고 기름기가 적당해요. 설탕을 양념보다 먼저 넣으면 고기가 연해지고 양념이 겉돌지 않아요. 매운맛은 청양고추로 조절하세요.', emoji = '🥘', cooking_time = 30 where recipe_id = 6;
delete from recipe_ingredient where recipe_id = 6;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (6, 10, 400, 'g'), (6, 38, 100, 'g'), (6, 4, 0.5, '개'), (6, 3, 0.25, '개'), (6, 5, 1, '대'), (6, 6, 1, '큰술'), (6, 39, 1, '개'), (6, 24, 2, '큰술'), (6, 29, 1.5, '큰술'), (6, 23, 2, '큰술'), (6, 26, 1.5, '큰술'), (6, 33, 1, '큰술'), (6, 28, 60, 'ml'), (6, 22, 2, '큰술'), (6, 30, 1, '큰술'), (6, 31, null, '약간'), (6, 32, null, '약간');
delete from recipe_step where recipe_id = 6;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (6, 1, '돼지고기(앞다리살)는 키친타월로 핏물을 닦고 한입 크기로 썰어요.', null), (6, 2, '고추장 2, 고춧가루 1, 간장 2, 다진 마늘 1, 맛술 1큰술과 물 60ml, 후추 약간을 섞어 양념장을 만들어요.', null), (6, 3, '양배추는 큼직하게, 양파는 굵게 채 썰고 당근은 얇게 반달 썰어요. 대파는 흰 부분은 송송, 초록 부분은 어슷 썰고 청양고추도 어슷 썰어요.', null), (6, 4, '팬에 식용유 2큰술과 대파 흰 부분을 넣고 중불에서 1분간 볶아 파기름을 내요.', 60), (6, 5, '고기를 넣고 센 불에서 겉면이 하얗게 익을 때까지 3분간 볶아요.', 180), (6, 6, '설탕 1.5큰술을 넣고 1분간 볶아 고기에 단맛을 먼저 입혀요.', 60), (6, 7, '양념장을 모두 붓고 중불에서 졸이며 고기에 양념이 배게 3분간 볶아요.', 180), (6, 8, '국물이 절반쯤 줄면 양배추, 양파, 당근을 넣고 2분간 볶아요.', 120), (6, 9, '남은 고춧가루 0.5큰술을 넣고 센 불에서 1분간 수분을 날리며 볶아 불향을 내요.', 60), (6, 10, '대파 초록 부분과 청양고추를 넣고 30초만 더 볶아요.', 30), (6, 11, '불을 끄고 참기름과 통깨를 뿌려 한 번 섞으면 완성이에요.', null);

-- 감자조림
update recipe set intro = '간장 양념이 속까지 배어 짭조름하고, 마지막에 올리고당으로 윤기를 낸 쫀득한 감자조림.', category = '반찬', tip = '감자를 먼저 기름에 볶으면 조려도 모양이 살아 있어요. 올리고당(물엿)은 마지막에 넣어야 타지 않고 윤기가 나요.', emoji = '🥔', cooking_time = 35 where recipe_id = 7;
delete from recipe_ingredient where recipe_id = 7;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (7, 1, 3, '개'), (7, 3, 0.3, '개'), (7, 4, 0.5, '개'), (7, 6, 0.5, '큰술'), (7, 22, 1, '큰술'), (7, 23, 3, '큰술'), (7, 33, 1, '큰술'), (7, 26, 1, '큰술'), (7, 35, 2, '큰술'), (7, 28, 200, 'ml'), (7, 30, 0.5, '큰술'), (7, 32, 0.5, '큰술');
delete from recipe_step where recipe_id = 7;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (7, 1, '감자는 껍질을 벗겨 2cm 크기로 깍둑 썰어요. 모서리를 살짝 다듬으면 조려도 부서지지 않아요.', null), (7, 2, '썬 감자를 찬물에 10분간 담가 전분을 빼요.', 600), (7, 3, '체에 밭쳐 물기를 충분히 빼요.', null), (7, 4, '당근과 양파도 감자와 비슷한 크기로 썰어요.', null), (7, 5, '냄비에 식용유를 두르고 감자와 당근을 넣어 중불에서 3분간 볶아 겉면을 코팅해요.', 180), (7, 6, '물 200ml, 간장 3큰술, 맛술 1큰술, 설탕 1큰술, 다진 마늘을 넣고 끓여요.', 60), (7, 7, '끓어오르면 뚜껑을 덮고 중약불로 줄여 10분간 조려요.', 600), (7, 8, '뚜껑을 열고 양파를 넣은 뒤, 중불에서 저어 가며 국물이 자작해질 때까지 5분간 조려요.', 300), (7, 9, '젓가락으로 감자를 찔러 보아 쑥 들어가면 다 익은 거예요.', null), (7, 10, '올리고당 2큰술을 넣고 센 불에서 1분 30초간 굴려 가며 윤기를 내요.', 90), (7, 11, '불을 끄고 참기름과 통깨를 뿌려 섞어요. 식으면 더 쫀득해져요.', null);

-- 연어덮밥
update recipe set intro = '배합초로 간한 밥 위에 도톰한 생연어와 양파를 올리고 달짝지근한 간장 소스를 곁들인 사케동.', category = '밥', tip = '연어는 먹기 직전까지 냉장고에 두세요. 소스는 미리 끓여 식혀야 비린 맛 없이 깔끔해요. 밥을 비비지 말고 연어를 한 점씩 올려 먹는 게 정석이에요.', emoji = '🍣', cooking_time = 35 where recipe_id = 8;
delete from recipe_ingredient where recipe_id = 8;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (8, 13, 300, 'g'), (8, 18, 2, '공기'), (8, 4, 0.5, '개'), (8, 5, 0.2, '대'), (8, 16, 2, '개'), (8, 23, 4, '큰술'), (8, 33, 2, '큰술'), (8, 26, 1, '큰술'), (8, 28, 4, '큰술'), (8, 40, 2, '큰술'), (8, 21, null, '약간'), (8, 41, null, '약간');
delete from recipe_step where recipe_id = 8;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (8, 1, '양파는 아주 얇게 채 썰어 찬물에 20분 담가 매운맛을 빼요.', 1200), (8, 2, '작은 냄비에 간장 4, 맛술 2, 물 4큰술, 설탕 0.5큰술과 양파 몇 가닥을 넣고 끓으면 약불로 5분 졸여요.', 300), (8, 3, '소스를 체에 걸러 그릇에 담고 식혀 둬요.', null), (8, 4, '식초 2큰술, 설탕 0.5큰술, 소금 한 꼬집을 섞어 배합초를 만들어요. 전자레인지에 10초 돌리면 설탕이 잘 녹아요.', null), (8, 5, '뜨거운 밥에 배합초를 넣고 주걱을 세워 자르듯 섞은 뒤, 체온 정도로 식혀요.', 300), (8, 6, '연어는 키친타월로 물기를 닦고, 결 반대 방향으로 1cm 두께로 썰어요. 1인분에 8조각 정도면 좋아요.', null), (8, 7, '물에 담가 둔 양파를 건져 물기를 완전히 빼요.', null), (8, 8, '대파(또는 쪽파)는 아주 얇게 송송 썰고, 계란은 노른자만 분리해 둬요.', null), (8, 9, '그릇에 밥을 봉긋하게 담고 간장 소스를 1큰술씩 뿌려요.', null), (8, 10, '밥 위에 양파를 깔고, 연어를 넓은 면이 아래로 가게 부채꼴로 둘러 올려요.', null), (8, 11, '가운데에 노른자를 올리고 와사비와 송송 썬 파를 곁들여요.', null), (8, 12, '남은 소스는 따로 내어 먹기 직전에 입맛대로 뿌려요.', null);

-- 두부부침
update recipe set intro = '물기를 뺀 두부에 계란옷을 두 번 입혀 노릇하게 부치고, 매콤한 간장 양념장을 곁들인 두부부침.', category = '반찬', tip = '물기를 충분히 빼야 기름이 튀지 않고 계란옷이 벗겨지지 않아요. 계란물은 두 번에 나눠 입히면 더 두툼하고 고르게 붙어요.', emoji = '🍢', cooking_time = 25 where recipe_id = 9;
delete from recipe_ingredient where recipe_id = 9;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (9, 17, 1, '모'), (9, 16, 2, '개'), (9, 5, 0.3, '대'), (9, 6, 0.5, '큰술'), (9, 39, 1, '개'), (9, 21, 0.3, '작은술'), (9, 31, null, '약간'), (9, 22, 3, '큰술'), (9, 23, 3, '큰술'), (9, 28, 2, '큰술'), (9, 33, 1, '큰술'), (9, 29, 1, '큰술'), (9, 26, 0.5, '작은술'), (9, 30, 1, '큰술'), (9, 32, null, '약간');
delete from recipe_step where recipe_id = 9;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (9, 1, '두부는 1cm 두께로 8등분해요.', null), (9, 2, '키친타월 위에 두부를 올리고 소금을 솔솔 뿌려 10분간 물기를 빼요.', 600), (9, 3, '계란 2개에 소금 한 꼬집과 후추를 넣고 곱게 풀어요.', null), (9, 4, '대파와 청양고추는 잘게 다져요.', null), (9, 5, '간장 3, 물 2, 맛술 1, 고춧가루 1큰술과 다진 마늘, 설탕, 참기름, 다진 대파·청양고추, 통깨를 섞어 양념장을 만들어요.', null), (9, 6, '두부 겉면의 물기를 키친타월로 한 번 더 닦아요.', null), (9, 7, '팬에 식용유를 두르고 중불에서 1분간 달궈요.', 60), (9, 8, '두부에 계란물을 골고루 입혀 팬에 올려요.', null), (9, 9, '아랫면이 노릇해질 때까지 3분간 건드리지 말고 부쳐요.', 180), (9, 10, '윗면에 계란물을 한 번 더 바른 뒤 뒤집어 3분간 노릇하게 부쳐요.', 180), (9, 11, '옆면도 세워 굴려 가며 익힌 뒤 접시에 담고 양념장을 곁들여요.', null);

-- 오징어볶음
update recipe set intro = '단맛을 먼저 입히고 매운 양념을 더해 센 불에 빠르게 볶은 탱글탱글 오징어볶음.', category = '일품', tip = '오징어는 오래 볶으면 질겨지고 물이 생겨요. 센 불에서 3~4분 안에 끝내는 게 핵심이에요. 단맛을 먼저 내고 매운맛을 나중에 더하면 감칠맛이 살아요.', emoji = '🦑', cooking_time = 25 where recipe_id = 10;
delete from recipe_ingredient where recipe_id = 10;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (10, 14, 2, '마리'), (10, 38, 150, 'g'), (10, 4, 0.5, '개'), (10, 3, 0.2, '개'), (10, 5, 1, '대'), (10, 6, 0.5, '큰술'), (10, 39, 1, '개'), (10, 24, 1, '큰술'), (10, 29, 1.5, '큰술'), (10, 23, 2, '큰술'), (10, 26, 1, '큰술'), (10, 28, 3, '큰술'), (10, 22, 1.5, '큰술'), (10, 30, 1, '큰술'), (10, 32, 0.5, '큰술');
delete from recipe_step where recipe_id = 10;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (10, 1, '오징어는 몸통을 갈라 내장과 눈, 입을 떼어 내고, 다리는 소금으로 문질러 빨판을 깨끗이 씻어요.', null), (10, 2, '몸통 안쪽에 사선으로 칼집을 넣고 1.5×5cm 크기로, 다리는 5cm 길이로 썰어요.', null), (10, 3, '양배추는 한입 크기로, 양파는 굵게 썰고 당근은 0.4cm 두께로 편 썰어요. 대파 흰 부분은 잘게 다지고 나머지와 청양고추는 어슷 썰어요.', null), (10, 4, '고추장 1, 고춧가루 1.5, 간장 2큰술과 다진 마늘을 섞어 양념장을 만들어요.', null), (10, 5, '팬에 식용유와 다진 대파를 넣고 중불에서 1분간 볶아 파기름을 내요.', 60), (10, 6, '센 불로 올려 오징어를 넣고 겉면이 하얗게 변할 때까지 1분간 볶아요.', 60), (10, 7, '설탕 1큰술을 넣고 섞어 단맛을 먼저 입혀요.', 30), (10, 8, '양념장을 넣고 오징어에 고루 묻도록 볶아요.', 30), (10, 9, '양배추, 양파, 당근을 넣고 물 3큰술을 부어 센 불에서 2분간 빠르게 볶아요.', 120), (10, 10, '어슷 썬 대파와 청양고추를 넣고 30초만 더 볶아요.', 30), (10, 11, '불을 끄고 참기름과 통깨를 뿌려 섞어요.', null), (10, 12, '식으면 물이 생기니 바로 내요. 밥 위에 올려 오징어덮밥으로 먹어도 좋아요.', null);

-- 토마토달걀볶음
update recipe set intro = '센 불에 부드럽게 익힌 계란과 새콤한 토마토를 굴소스로 맛을 낸 중국식 가정식 토마토달걀볶음.', category = '일품', tip = '팬을 충분히 달군 뒤 계란을 넣어야 폭신하게 부풀어요. 잘 익은 토마토를 쓰면 설탕을 줄여도 달고 새콤해요.', emoji = '🍅', cooking_time = 15 where recipe_id = 11;
delete from recipe_ingredient where recipe_id = 11;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (11, 8, 2, '개'), (11, 16, 3, '개'), (11, 5, 0.5, '대'), (11, 22, 3, '큰술'), (11, 21, null, '약간'), (11, 26, 0.5, '작은술'), (11, 36, 0.5, '큰술'), (11, 31, null, '약간');
delete from recipe_step where recipe_id = 11;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (11, 1, '토마토는 깨끗이 씻어 꼭지를 떼어 내요.', null), (11, 2, '토마토를 8등분해 웨지 모양으로 썰어요. 방울토마토라면 옆으로 반 갈라요.', null), (11, 3, '대파는 송송 썰어 둬요.', null), (11, 4, '계란 3개에 소금 한 꼬집을 넣고 곱게 풀어요.', null), (11, 5, '팬에 식용유 2큰술을 두르고 센 불에서 연기가 살짝 날 때까지 달궈요.', 60), (11, 6, '계란물을 붓고 10초 기다렸다가 크게 저어 70%만 익혀요.', 30), (11, 7, '계란을 접시에 덜어 둬요. 덜 익었을 때 건져야 마지막에 부드러워요.', null), (11, 8, '같은 팬에 식용유 1큰술과 대파를 넣고 중불에서 30초간 볶아 파기름을 내요.', 30), (11, 9, '토마토와 설탕을 넣고 즙이 살짝 나올 때까지 1분 30초간 볶아요.', 90), (11, 10, '굴소스 0.5큰술을 넣고 고루 섞어요. 싱거우면 조금씩 더해요.', null), (11, 11, '덜어 둔 계란을 다시 넣고 30초간 가볍게 섞은 뒤 후추로 마무리해요.', 30);

-- 치즈계란말이
update recipe set intro = '계란물을 세 번에 나눠 부으며 돌돌 말아 속에서 치즈가 쭉 늘어나는 두툼한 치즈계란말이.', category = '반찬', tip = '약불을 유지해야 겉이 타지 않고 노랗게 말려요. 치즈 자체가 짜니 소금은 조금만 넣으세요. 썰기 전에 김발로 감싸 두면 모양이 더 반듯해요.', emoji = '🧀', cooking_time = 20 where recipe_id = 12;
delete from recipe_ingredient where recipe_id = 12;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (12, 16, 5, '개'), (12, 19, 2, '장'), (12, 5, 0.3, '대'), (12, 3, 0.1, '개'), (12, 21, 0.3, '작은술'), (12, 33, 0.5, '큰술'), (12, 22, 1, '큰술');
delete from recipe_step where recipe_id = 12;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (12, 1, '대파와 당근은 아주 잘게 다져요.', null), (12, 2, '계란 5개에 소금과 맛술을 넣고 곱게 풀어요.', null), (12, 3, '계란물을 체에 걸러 알끈을 제거해요. 훨씬 매끈하고 부드럽게 말려요.', null), (12, 4, '다진 대파와 당근을 넣고 섞어요.', null), (12, 5, '사각팬(또는 작은 팬)에 식용유를 두르고 키친타월로 얇게 펴 바른 뒤 약불에서 1분간 예열해요.', 60), (12, 6, '계란물 1/3을 붓고 팬을 기울여 얇게 펴요.', null), (12, 7, '윗면이 70% 정도 익으면 한쪽 끝에 치즈 2장을 올려요.', 60), (12, 8, '치즈 쪽부터 뒤집개로 3~4번 접어 가며 돌돌 말아요.', null), (12, 9, '말은 계란을 팬 끝으로 밀고, 빈 곳에 기름을 살짝 바른 뒤 계란물 1/3을 부어 말은 계란 밑으로 흘려 이어 붙여요.', 60), (12, 10, '익으면 같은 방법으로 다시 말고, 남은 계란물로 한 번 더 반복해요.', 60), (12, 11, '다 말았으면 뒤집개로 모서리를 눌러 가며 1분간 굴려 모양을 잡아요.', 60), (12, 12, '불을 끄고 3분간 그대로 두어 한 김 식힌 뒤 2cm 두께로 썰어요.', 180);

-- 4) 상세 조회에 팁·분류 포함
create or replace function get_recipe(p_recipe_id bigint) returns json
language plpgsql security definer set search_path = public as $$
declare result json;
begin
  update recipe set views = views + 1 where recipe_id = p_recipe_id;
  select json_build_object(
    'recipeId', r.recipe_id, 'title', r.title, 'intro', r.intro, 'tip', r.tip, 'category', r.category, 'emoji', r.emoji, 'mainPhoto', r.main_photo,
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

-- 5) 내 냉장고 모델을 계정에 저장 (설정 > 내 냉장고)
alter table user_preference add column if not exists fridge_model varchar(30);

-- 6) 계정 설정 > 회원 탈퇴: 내 프로필(레시피·찜·후기 등 연결 데이터 포함)과 로그인 계정 삭제
create or replace function delete_my_account() returns void
language plpgsql security definer set search_path = public, auth as $$
declare uid uuid := auth.uid();
begin
  if uid is null then raise exception '로그인이 필요해요' using errcode = '28000'; end if;
  delete from public.profiles where id = uid;
  delete from auth.users where id = uid;
end $$;
revoke execute on function delete_my_account() from public, anon;
grant execute on function delete_my_account() to authenticated;

commit;

-- ===================== 06_edit_notify_admin.sql =====================
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

-- ===================== 07_admin.sql =====================
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

