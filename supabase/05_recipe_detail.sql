-- 냉장고를 부탁해 · 레시피 상세화 (seed.sql 다음에 SQL Editor에서 한 번 실행)
-- 여러 번 실행해도 결과는 같습니다.
begin;

-- 1) 레시피 팁 칸 추가
alter table recipe add column if not exists tip text;

-- 2) 새 양념 재료 (일치율 계산 제외)
insert into ingredient (ingredient_id, name, category, emoji, is_seasoning) values (29, '고춧가루', '양념', '🌶️', true) on conflict (ingredient_id) do update set name = excluded.name, category = excluded.category, emoji = excluded.emoji, is_seasoning = excluded.is_seasoning;
insert into ingredient_alias (alias_name, ingredient_id) values ('고추가루', 29) on conflict (alias_name) do nothing;
insert into ingredient (ingredient_id, name, category, emoji, is_seasoning) values (30, '참기름', '양념', '🫙', true) on conflict (ingredient_id) do update set name = excluded.name, category = excluded.category, emoji = excluded.emoji, is_seasoning = excluded.is_seasoning;
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
select setval(pg_get_serial_sequence('ingredient', 'ingredient_id'), (select max(ingredient_id) from ingredient));

-- 3) 레시피 12개: 소개·분류·팁·재료·조리 단계 교체

-- 감자계란볶음
update recipe set intro = '채 썬 감자를 아삭하게 볶다가 부드러운 계란을 더한 10분 밑반찬. 도시락 반찬으로도 좋아요.', category = '반찬', tip = '감자 전분을 빼야 팬에 눌어붙지 않고 아삭해요. 계란은 먼저 익혀 두었다가 마지막에 넣어야 부드럽게 남아요.', emoji = '🍳', cooking_time = 20 where recipe_id = 1;
delete from recipe_ingredient where recipe_id = 1;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (1, 1, 2, '개'), (1, 16, 3, '개'), (1, 4, 0.5, '개'), (1, 5, 0.5, '대'), (1, 21, null, '약간'), (1, 31, null, '약간'), (1, 22, 2, '큰술'), (1, 32, 0.5, '큰술');
delete from recipe_step where recipe_id = 1;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (1, 1, '감자는 껍질을 벗기고 0.3cm 두께로 얇게 채 썹니다. 양파도 채 썰고, 대파는 송송 썰어 둡니다.', null), (1, 2, '채 썬 감자를 찬물에 5분 담가 전분을 빼고, 체에 밭쳐 키친타월로 물기를 꼼꼼히 닦아요.', 300), (1, 3, '계란 3개에 소금 한 꼬집을 넣고 알끈이 끊어지도록 충분히 풀어 둡니다.', null), (1, 4, '달군 팬에 식용유 1큰술을 두르고 계란을 부어 젓가락으로 크게 저어 반숙 스크램블을 만든 뒤 따로 덜어 둡니다.', 60), (1, 5, '같은 팬에 남은 식용유를 두르고 감자와 양파를 중불에서 투명해질 때까지 볶아요. 소금으로 간합니다.', 300), (1, 6, '덜어 둔 계란과 대파를 넣고 30초만 가볍게 섞은 뒤 후추와 통깨를 뿌려 마무리합니다.', 30);

-- 감자전
update recipe set intro = '강판에 간 감자로 겉은 바삭, 속은 쫀득하게 부치는 비 오는 날 감자전.', category = '반찬', tip = '감자에서 나온 전분을 버리지 말고 다시 넣어야 쫀득해져요. 기름은 넉넉히, 불은 중불을 유지하세요.', emoji = '🥞', cooking_time = 30 where recipe_id = 2;
delete from recipe_ingredient where recipe_id = 2;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (2, 1, 3, '개'), (2, 4, 0.3, '개'), (2, 20, 2, '큰술'), (2, 21, 0.3, '작은술'), (2, 22, 4, '큰술'), (2, 23, 2, '큰술'), (2, 28, 1, '큰술'), (2, 29, null, '약간');
delete from recipe_step where recipe_id = 2;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (2, 1, '감자는 껍질을 벗기고 양파와 함께 강판에 곱게 갈아요.', null), (2, 2, '간 감자를 체에 밭쳐 물기를 짜고, 받아 둔 물은 10분간 그대로 두어 전분을 가라앉혀요.', 600), (2, 3, '윗물은 따라 버리고 바닥에 가라앉은 하얀 전분만 감자 건더기에 다시 섞어요.', null), (2, 4, '부침가루 2큰술과 소금을 넣고 고루 섞어 반죽을 만듭니다. 너무 질면 부침가루를 조금 더 넣어요.', null), (2, 5, '팬에 식용유를 넉넉히 두르고 중불로 달군 뒤, 반죽을 한 국자씩 올려 얇게 펴요.', null), (2, 6, '가장자리가 노릇해지면 뒤집어 앞뒤로 3분씩 바삭하게 부칩니다.', 360), (2, 7, '간장 2큰술, 물 1큰술, 고춧가루 약간을 섞어 초간장을 만들어 곁들여요.', null);

-- 계란찜
update recipe set intro = '전자레인지 없이 냄비 하나로 만드는 몽글몽글 폭신한 뚝배기 계란찜.', category = '반찬', tip = '처음에 저어 주면 바닥이 타지 않고 전체가 고르게 익어요. 뚜껑을 덮은 뒤에는 꼭 약불로!', emoji = '🍮', cooking_time = 15 where recipe_id = 3;
delete from recipe_ingredient where recipe_id = 3;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (3, 16, 3, '개'), (3, 5, 0.3, '대'), (3, 3, 0.1, '개'), (3, 28, 150, 'ml'), (3, 27, 0.5, '작은술'), (3, 21, null, '약간'), (3, 30, 0.5, '작은술'), (3, 32, null, '약간');
delete from recipe_step where recipe_id = 3;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (3, 1, '계란 3개를 볼에 깨뜨려 알끈이 없어질 때까지 곱게 풀고, 체에 한 번 걸러요.', null), (3, 2, '물 150ml, 다진 새우젓 0.5작은술을 넣고 섞어요. 싱거우면 소금으로 간을 맞춥니다.', null), (3, 3, '대파는 잘게 송송 썰고, 당근은 아주 잘게 다져 계란물에 넣어요.', null), (3, 4, '뚝배기(또는 작은 냄비)에 계란물을 붓고 중불에서 바닥을 긁듯이 저어 가며 익혀요.', 120), (3, 5, '계란이 몽글몽글 반쯤 엉기면 약불로 줄이고 뚜껑을 덮어 3분간 뜸을 들입니다.', 180), (3, 6, '불을 끄고 참기름 몇 방울과 통깨를 뿌려 완성해요.', null);

-- 김치볶음밥
update recipe set intro = '잘 익은 김치를 버터와 함께 볶아 감칠맛을 끌어올린 기본 김치볶음밥.', category = '밥', tip = '신김치일수록 맛있어요. 너무 시면 설탕을 조금 더 넣어 신맛을 잡으세요. 찬밥을 쓰면 더 고슬고슬해요.', emoji = '🍛', cooking_time = 15 where recipe_id = 4;
delete from recipe_ingredient where recipe_id = 4;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (4, 9, 1, '컵'), (4, 18, 2, '공기'), (4, 16, 2, '개'), (4, 5, 0.5, '대'), (4, 22, 1, '큰술'), (4, 34, 10, 'g'), (4, 29, 0.5, '큰술'), (4, 23, 0.5, '큰술'), (4, 26, 0.5, '작은술'), (4, 30, 0.5, '큰술'), (4, 32, null, '약간');
delete from recipe_step where recipe_id = 4;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (4, 1, '김치는 가위로 잘게 자르고, 대파는 송송 썰어요. 밥은 미리 꺼내 한 김 식혀 둡니다.', null), (4, 2, '팬에 식용유와 버터를 두르고 약불에서 대파를 볶아 파기름을 내요.', 60), (4, 3, '김치와 설탕을 넣고 중불에서 김치가 투명해질 때까지 충분히 볶아요.', 180), (4, 4, '고춧가루와 간장을 팬 가장자리에 둘러 살짝 눌린 뒤 김치와 섞어 향을 냅니다.', 30), (4, 5, '밥을 넣고 주걱을 세워 자르듯이 섞으며 2분간 볶아요.', 120), (4, 6, '불을 끄고 참기름과 통깨를 넣어 섞어 그릇에 담아요.', null), (4, 7, '다른 팬에 계란 프라이를 반숙으로 부쳐 밥 위에 올리면 완성!', 120);

-- 된장찌개
update recipe set intro = '다시마 육수에 된장을 풀고 채소를 듬뿍 넣어 끓인 구수한 집 된장찌개.', category = '국·찌개', tip = '된장은 체에 걸러 풀면 국물이 깔끔해요. 오래 끓이면 된장 향이 날아가니 채소가 익으면 바로 불을 끄세요.', emoji = '🍲', cooking_time = 25 where recipe_id = 5;
delete from recipe_ingredient where recipe_id = 5;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (5, 17, 0.5, '모'), (5, 7, 0.3, '개'), (5, 4, 0.5, '개'), (5, 1, 1, '개'), (5, 5, 0.5, '대'), (5, 6, 0.5, '큰술'), (5, 25, 2, '큰술'), (5, 29, 0.5, '작은술'), (5, 37, 1, '장'), (5, 28, 500, 'ml');
delete from recipe_step where recipe_id = 5;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (5, 1, '냄비에 물 500ml와 다시마 1장을 넣고 끓기 시작하면 다시마를 건져 육수를 만들어요.', 300), (5, 2, '감자는 납작하게, 애호박은 반달 모양으로, 양파는 깍둑 썰고 두부는 한입 크기로 잘라요.', null), (5, 3, '육수에 된장 2큰술을 체에 걸러 풀고, 단단한 감자부터 넣어 5분 끓여요.', 300), (5, 4, '양파와 애호박, 다진 마늘을 넣고 중불에서 5분 더 끓입니다.', 300), (5, 5, '두부를 넣고 고춧가루를 살짝 풀어 3분간 보글보글 끓여요.', 180), (5, 6, '마지막에 대파를 넣고 한소끔 끓여 불을 꺼요.', 30);

-- 제육볶음
update recipe set intro = '고추장 양념에 재운 돼지고기를 센 불에 볶아 불향을 입힌 밥도둑 제육볶음.', category = '일품', tip = '앞다리살이나 목살을 쓰면 부드럽고, 마지막에 팬을 센 불로 올리면 불향이 살아나요.', emoji = '🥘', cooking_time = 30 where recipe_id = 6;
delete from recipe_ingredient where recipe_id = 6;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (6, 10, 300, 'g'), (6, 4, 1, '개'), (6, 5, 1, '대'), (6, 3, 0.3, '개'), (6, 6, 1, '큰술'), (6, 24, 2, '큰술'), (6, 29, 1, '큰술'), (6, 23, 1, '큰술'), (6, 26, 1, '큰술'), (6, 33, 1, '큰술'), (6, 30, 1, '큰술'), (6, 22, 1, '큰술'), (6, 32, null, '약간');
delete from recipe_step where recipe_id = 6;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (6, 1, '고추장 2, 고춧가루 1, 간장 1, 설탕 1, 맛술 1, 다진 마늘 1큰술을 섞어 양념장을 만들어요.', null), (6, 2, '돼지고기를 한입 크기로 자르고 양념장의 2/3를 넣어 조물조물 버무린 뒤 15분 재워요.', 900), (6, 3, '양파는 굵게 채 썰고, 당근은 얇게 반달 썰기, 대파는 어슷 썰어요.', null), (6, 4, '달군 팬에 식용유를 두르고 센 불에서 고기를 넣어 겉면이 익을 때까지 볶아요.', 240), (6, 5, '양파와 당근, 남은 양념장을 넣고 채소가 숨이 죽을 때까지 3분 더 볶아요.', 180), (6, 6, '대파와 참기름을 넣고 30초 볶은 뒤 통깨를 뿌려 마무리합니다.', 30);

-- 감자조림
update recipe set intro = '간장 양념이 속까지 배어 짭조름하고 윤기 나는 감자조림.', category = '반찬', tip = '감자를 먼저 기름에 볶으면 조려도 부서지지 않아요. 올리고당은 마지막에 넣어야 윤기가 살아요.', emoji = '🥔', cooking_time = 29 where recipe_id = 7;
delete from recipe_ingredient where recipe_id = 7;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (7, 1, 3, '개'), (7, 4, 0.5, '개'), (7, 3, 0.3, '개'), (7, 23, 3, '큰술'), (7, 26, 1, '큰술'), (7, 35, 1, '큰술'), (7, 28, 200, 'ml'), (7, 22, 1, '큰술'), (7, 30, 0.5, '큰술'), (7, 32, null, '약간');
delete from recipe_step where recipe_id = 7;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (7, 1, '감자는 껍질을 벗겨 2cm 크기로 깍둑 썰고, 찬물에 담가 전분을 빼요.', 300), (7, 2, '양파와 당근도 감자와 비슷한 크기로 썰어 둡니다.', null), (7, 3, '냄비에 식용유를 두르고 감자와 당근을 중불에서 겉면이 투명해질 때까지 볶아요.', 180), (7, 4, '물 200ml, 간장 3큰술, 설탕 1큰술을 넣고 뚜껑을 덮어 10분 졸여요.', 600), (7, 5, '양파를 넣고 뚜껑을 연 채 국물이 자작해질 때까지 저어 가며 졸입니다.', 300), (7, 6, '올리고당을 넣어 윤기를 내고, 참기름과 통깨를 뿌려 완성해요.', 60);

-- 연어덮밥
update recipe set intro = '도톰한 생연어와 양파를 간장 소스에 곁들인 일식집 스타일 연어덮밥.', category = '밥', tip = '연어는 먹기 직전까지 냉장고에 두세요. 소스는 미리 끓여 식혀야 비린 맛 없이 깔끔해요.', emoji = '🍣', cooking_time = 16 where recipe_id = 8;
delete from recipe_ingredient where recipe_id = 8;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (8, 13, 200, 'g'), (8, 18, 2, '공기'), (8, 4, 0.5, '개'), (8, 5, 0.3, '대'), (8, 16, 2, '개'), (8, 23, 2, '큰술'), (8, 33, 1, '큰술'), (8, 26, 0.5, '큰술'), (8, 28, 2, '큰술'), (8, 30, null, '약간'), (8, 32, null, '약간');
delete from recipe_step where recipe_id = 8;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (8, 1, '간장 2, 맛술 1, 설탕 0.5, 물 2큰술을 작은 냄비에 넣고 한 번 끓여 덮밥 소스를 만들어 식혀요.', 60), (8, 2, '양파는 얇게 채 썰어 찬물에 10분 담가 매운맛을 빼고 물기를 빼요.', 600), (8, 3, '연어는 키친타월로 물기를 닦고 결 반대 방향으로 1cm 두께로 썰어요.', null), (8, 4, '계란은 노른자만 분리해 두거나, 반숙 계란 프라이를 준비해요.', null), (8, 5, '따뜻한 밥에 참기름을 살짝 섞어 그릇에 담고 양파를 깔아요.', null), (8, 6, '연어를 부채꼴로 둘러 올리고 노른자를 가운데 얹은 뒤, 소스와 송송 썬 대파·통깨를 뿌려요.', null);

-- 두부부침
update recipe set intro = '계란옷을 입혀 겉은 노릇, 속은 촉촉한 두부부침과 양념장.', category = '반찬', tip = '물기를 충분히 빼야 기름이 튀지 않고 겉이 바삭해져요. 자주 뒤집지 말고 한 번만 뒤집으세요.', emoji = '🍢', cooking_time = 21 where recipe_id = 9;
delete from recipe_ingredient where recipe_id = 9;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (9, 17, 1, '모'), (9, 16, 1, '개'), (9, 5, 0.3, '대'), (9, 21, 0.3, '작은술'), (9, 22, 2, '큰술'), (9, 23, 2, '큰술'), (9, 29, 0.5, '작은술'), (9, 26, 0.3, '작은술'), (9, 30, 0.5, '큰술'), (9, 32, null, '약간');
delete from recipe_step where recipe_id = 9;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (9, 1, '두부는 1cm 두께로 썰어 키친타월 위에 올리고 소금을 뿌려 10분간 물기를 빼요.', 600), (9, 2, '계란을 풀고 소금 한 꼬집을 넣어 계란물을 만들어요.', null), (9, 3, '두부의 물기를 한 번 더 닦고 계란물을 앞뒤로 골고루 입혀요.', null), (9, 4, '달군 팬에 식용유를 두르고 중불에서 한 면당 3분씩 노릇하게 부쳐요.', 360), (9, 5, '간장 2, 고춧가루 0.5, 설탕 약간, 참기름, 송송 썬 대파, 통깨를 섞어 양념장을 만들어요.', null), (9, 6, '접시에 두부를 담고 양념장을 한 숟갈씩 올려 완성해요.', null);

-- 오징어볶음
update recipe set intro = '탱글한 오징어와 채소를 매콤달콤한 고추장 양념에 센 불로 빠르게 볶은 오징어볶음.', category = '일품', tip = '오징어는 오래 볶으면 질겨지고 물이 생겨요. 센 불에서 3분 안에 끝내는 게 핵심이에요.', emoji = '🦑', cooking_time = 25 where recipe_id = 10;
delete from recipe_ingredient where recipe_id = 10;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (10, 14, 1, '마리'), (10, 4, 1, '개'), (10, 3, 0.3, '개'), (10, 5, 1, '대'), (10, 7, 0.3, '개'), (10, 6, 1, '큰술'), (10, 24, 2, '큰술'), (10, 29, 1.5, '큰술'), (10, 23, 1, '큰술'), (10, 26, 1, '큰술'), (10, 35, 1, '큰술'), (10, 22, 1, '큰술'), (10, 30, 1, '큰술'), (10, 32, null, '약간');
delete from recipe_step where recipe_id = 10;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (10, 1, '오징어는 내장을 빼고 껍질을 벗긴 뒤, 몸통 안쪽에 칼집을 넣어 한입 크기로 썰어요.', null), (10, 2, '양파·애호박은 굵게 채 썰고, 당근은 얇게, 대파는 어슷 썰어요.', null), (10, 3, '고추장 2, 고춧가루 1.5, 간장 1, 설탕 1, 다진 마늘 1큰술을 섞어 양념장을 만들어요.', null), (10, 4, '팬에 식용유를 두르고 센 불에서 양파와 당근을 1분 볶아요.', 60), (10, 5, '오징어와 애호박, 양념장을 넣고 센 불에서 2~3분만 빠르게 볶아요.', 150), (10, 6, '대파와 올리고당을 넣어 30초 더 볶고, 참기름과 통깨로 마무리해요.', 30);

-- 토마토달걀볶음
update recipe set intro = '새콤한 토마토와 부드러운 계란이 어우러진 중국식 가정식 토마토달걀볶음.', category = '일품', tip = '계란은 덜 익었을 때 건져야 마지막에 부드러워요. 잘 익은 토마토를 쓰면 설탕을 줄여도 돼요.', emoji = '🍅', cooking_time = 15 where recipe_id = 11;
delete from recipe_ingredient where recipe_id = 11;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (11, 8, 2, '개'), (11, 16, 3, '개'), (11, 5, 0.5, '대'), (11, 6, 0.5, '큰술'), (11, 21, 0.3, '작은술'), (11, 26, 0.5, '큰술'), (11, 36, 0.5, '큰술'), (11, 22, 2, '큰술'), (11, 31, null, '약간');
delete from recipe_step where recipe_id = 11;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (11, 1, '토마토는 꼭지를 떼고 8등분으로 웨지 모양으로 썰어요.', null), (11, 2, '계란에 소금 한 꼬집을 넣고 풀어 둡니다. 대파는 송송 썰어요.', null), (11, 3, '팬에 식용유 1큰술을 두르고 센 불에서 계란을 부어 크게 저어 70%만 익힌 뒤 덜어 둬요.', 40), (11, 4, '같은 팬에 남은 기름을 두르고 대파와 다진 마늘을 볶아 향을 내요.', 30), (11, 5, '토마토와 설탕을 넣고 토마토 즙이 살짝 나올 때까지 2분 볶아요.', 120), (11, 6, '굴소스를 넣고 덜어 둔 계란을 다시 넣어 가볍게 섞은 뒤 후추를 뿌려 완성해요.', 30);

-- 치즈계란말이
update recipe set intro = '돌돌 말린 계란 속에서 치즈가 쭉 늘어나는 아이들도 좋아하는 계란말이.', category = '반찬', tip = '약불을 유지해야 겉이 타지 않고 노랗게 말려요. 썰기 전 김발로 감싸 두면 모양이 더 예뻐요.', emoji = '🧀', cooking_time = 15 where recipe_id = 12;
delete from recipe_ingredient where recipe_id = 12;
insert into recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (12, 16, 4, '개'), (12, 19, 2, '장'), (12, 5, 0.3, '대'), (12, 3, 0.2, '개'), (12, 21, 0.3, '작은술'), (12, 33, 0.5, '큰술'), (12, 22, 1, '큰술');
delete from recipe_step where recipe_id = 12;
insert into recipe_step (recipe_id, step_number, description, timer_seconds) values (12, 1, '대파와 당근은 아주 잘게 다져요.', null), (12, 2, '계란 4개에 소금과 맛술을 넣어 곱게 풀고, 다진 채소를 섞어요.', null), (12, 3, '사각팬(또는 작은 팬)에 식용유를 얇게 두르고 약불로 달궈요.', 60), (12, 4, '계란물의 1/3을 부어 얇게 펴고, 반쯤 익으면 치즈 2장을 가운데 올려요.', 60), (12, 5, '끝에서부터 돌돌 말아 한쪽으로 밀고, 남은 계란물을 나눠 부어 이어서 말아요.', 180), (12, 6, '다 말았으면 불을 끄고 3분간 그대로 두어 모양을 잡은 뒤 한 김 식혀 썰어요.', 180);

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
