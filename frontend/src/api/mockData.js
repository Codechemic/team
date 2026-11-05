// 서버 연결 전 화면 개발용 mock 데이터 (supabase/seed.sql + 05_recipe_detail.sql 과 같은 내용)
export const INGREDIENTS = [
 {
  "id": 1,
  "name": "감자",
  "category": "채소",
  "emoji": "🥔",
  "aliases": [
   "알감자"
  ],
  "isSeasoning": false
 },
 {
  "id": 2,
  "name": "고구마",
  "category": "채소",
  "emoji": "🍠",
  "aliases": [],
  "isSeasoning": false
 },
 {
  "id": 3,
  "name": "당근",
  "category": "채소",
  "emoji": "🥕",
  "aliases": [],
  "isSeasoning": false
 },
 {
  "id": 4,
  "name": "양파",
  "category": "채소",
  "emoji": "🧅",
  "aliases": [],
  "isSeasoning": false
 },
 {
  "id": 5,
  "name": "대파",
  "category": "채소",
  "emoji": "🌿",
  "aliases": [
   "파",
   "쪽파"
  ],
  "isSeasoning": false
 },
 {
  "id": 6,
  "name": "마늘",
  "category": "채소",
  "emoji": "🧄",
  "aliases": [
   "다진마늘"
  ],
  "isSeasoning": false
 },
 {
  "id": 7,
  "name": "애호박",
  "category": "채소",
  "emoji": "🥒",
  "aliases": [
   "호박"
  ],
  "isSeasoning": false
 },
 {
  "id": 8,
  "name": "토마토",
  "category": "채소",
  "emoji": "🍅",
  "aliases": [
   "방울토마토"
  ],
  "isSeasoning": false
 },
 {
  "id": 9,
  "name": "김치",
  "category": "채소",
  "emoji": "🥬",
  "aliases": [
   "배추김치"
  ],
  "isSeasoning": false
 },
 {
  "id": 10,
  "name": "돼지고기",
  "category": "육류",
  "emoji": "🥓",
  "aliases": [
   "돼지",
   "삼겹살",
   "앞다리살"
  ],
  "isSeasoning": false
 },
 {
  "id": 11,
  "name": "닭고기",
  "category": "육류",
  "emoji": "🍗",
  "aliases": [
   "닭",
   "닭가슴살"
  ],
  "isSeasoning": false
 },
 {
  "id": 12,
  "name": "소고기",
  "category": "육류",
  "emoji": "🥩",
  "aliases": [
   "쇠고기",
   "불고기"
  ],
  "isSeasoning": false
 },
 {
  "id": 13,
  "name": "연어",
  "category": "수산물",
  "emoji": "🐟",
  "aliases": [],
  "isSeasoning": false
 },
 {
  "id": 14,
  "name": "오징어",
  "category": "수산물",
  "emoji": "🦑",
  "aliases": [],
  "isSeasoning": false
 },
 {
  "id": 15,
  "name": "새우",
  "category": "수산물",
  "emoji": "🦐",
  "aliases": [
   "칵테일새우"
  ],
  "isSeasoning": false
 },
 {
  "id": 16,
  "name": "계란",
  "category": "기타",
  "emoji": "🥚",
  "aliases": [
   "달걀"
  ],
  "isSeasoning": false
 },
 {
  "id": 17,
  "name": "두부",
  "category": "기타",
  "emoji": "🧈",
  "aliases": [],
  "isSeasoning": false
 },
 {
  "id": 18,
  "name": "밥",
  "category": "기타",
  "emoji": "🍚",
  "aliases": [
   "쌀밥",
   "공기밥"
  ],
  "isSeasoning": false
 },
 {
  "id": 19,
  "name": "치즈",
  "category": "기타",
  "emoji": "🧀",
  "aliases": [
   "슬라이스치즈"
  ],
  "isSeasoning": false
 },
 {
  "id": 20,
  "name": "부침가루",
  "category": "기타",
  "emoji": "🌾",
  "aliases": [
   "밀가루"
  ],
  "isSeasoning": false
 },
 {
  "id": 21,
  "name": "소금",
  "category": "양념",
  "emoji": "🧂",
  "aliases": [],
  "isSeasoning": true
 },
 {
  "id": 22,
  "name": "식용유",
  "category": "양념",
  "emoji": "🧂",
  "aliases": [],
  "isSeasoning": true
 },
 {
  "id": 23,
  "name": "간장",
  "category": "양념",
  "emoji": "🧂",
  "aliases": [],
  "isSeasoning": true
 },
 {
  "id": 24,
  "name": "고추장",
  "category": "양념",
  "emoji": "🧂",
  "aliases": [],
  "isSeasoning": true
 },
 {
  "id": 25,
  "name": "된장",
  "category": "양념",
  "emoji": "🧂",
  "aliases": [],
  "isSeasoning": true
 },
 {
  "id": 26,
  "name": "설탕",
  "category": "양념",
  "emoji": "🧂",
  "aliases": [],
  "isSeasoning": true
 },
 {
  "id": 27,
  "name": "새우젓",
  "category": "양념",
  "emoji": "🧂",
  "aliases": [],
  "isSeasoning": true
 },
 {
  "id": 28,
  "name": "물",
  "category": "양념",
  "emoji": "🧂",
  "aliases": [],
  "isSeasoning": true
 },
 {
  "id": 29,
  "name": "고춧가루",
  "category": "양념",
  "emoji": "🌶️",
  "aliases": [
   "고추가루"
  ],
  "isSeasoning": true
 },
 {
  "id": 30,
  "name": "참기름",
  "category": "양념",
  "emoji": "🫙",
  "aliases": [
   "들기름"
  ],
  "isSeasoning": true
 },
 {
  "id": 31,
  "name": "후추",
  "category": "양념",
  "emoji": "🧂",
  "aliases": [
   "후춧가루"
  ],
  "isSeasoning": true
 },
 {
  "id": 32,
  "name": "통깨",
  "category": "양념",
  "emoji": "🌰",
  "aliases": [
   "깨",
   "참깨"
  ],
  "isSeasoning": true
 },
 {
  "id": 33,
  "name": "맛술",
  "category": "양념",
  "emoji": "🍶",
  "aliases": [
   "미림"
  ],
  "isSeasoning": true
 },
 {
  "id": 34,
  "name": "버터",
  "category": "양념",
  "emoji": "🧈",
  "aliases": [],
  "isSeasoning": true
 },
 {
  "id": 35,
  "name": "올리고당",
  "category": "양념",
  "emoji": "🍯",
  "aliases": [
   "물엿"
  ],
  "isSeasoning": true
 },
 {
  "id": 36,
  "name": "굴소스",
  "category": "양념",
  "emoji": "🫙",
  "aliases": [],
  "isSeasoning": true
 },
 {
  "id": 37,
  "name": "다시마",
  "category": "양념",
  "emoji": "🌊",
  "aliases": [],
  "isSeasoning": true
 },
 {
  "id": 38,
  "name": "양배추",
  "category": "채소",
  "emoji": "🥬",
  "aliases": [],
  "isSeasoning": false
 },
 {
  "id": 39,
  "name": "청양고추",
  "category": "양념",
  "emoji": "🌶️",
  "aliases": [
   "고추",
   "풋고추"
  ],
  "isSeasoning": true
 },
 {
  "id": 40,
  "name": "식초",
  "category": "양념",
  "emoji": "🍶",
  "aliases": [],
  "isSeasoning": true
 },
 {
  "id": 41,
  "name": "와사비",
  "category": "양념",
  "emoji": "🟢",
  "aliases": [
   "고추냉이"
  ],
  "isSeasoning": true
 },
 {
  "id": 42,
  "name": "멸치",
  "category": "양념",
  "emoji": "🐟",
  "aliases": [
   "국물용멸치",
   "다시멸치"
  ],
  "isSeasoning": true
 }
];

export const RECIPES = [
 {
  "id": 1,
  "title": "감자계란볶음",
  "emoji": "🍳",
  "cookingTime": 20,
  "difficulty": "쉬움",
  "writer": "냉부요리사",
  "views": 1240,
  "averageRating": 4.8,
  "servings": 2,
  "intro": "채 썬 감자를 파기름에 아삭하게 볶고, 부드러운 스크램블 계란을 더한 기본 밑반찬. 도시락 반찬으로도 좋아요.",
  "ingredients": [
   {
    "ingredientId": 1,
    "quantity": 2,
    "unit": "개"
   },
   {
    "ingredientId": 16,
    "quantity": 3,
    "unit": "개"
   },
   {
    "ingredientId": 4,
    "quantity": 0.5,
    "unit": "개"
   },
   {
    "ingredientId": 3,
    "quantity": 0.2,
    "unit": "개"
   },
   {
    "ingredientId": 5,
    "quantity": 0.5,
    "unit": "대"
   },
   {
    "ingredientId": 22,
    "quantity": 3,
    "unit": "큰술"
   },
   {
    "ingredientId": 21,
    "quantity": 0.5,
    "unit": "작은술"
   },
   {
    "ingredientId": 31,
    "quantity": null,
    "unit": "약간"
   },
   {
    "ingredientId": 30,
    "quantity": 0.5,
    "unit": "큰술"
   },
   {
    "ingredientId": 32,
    "quantity": 0.5,
    "unit": "큰술"
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "감자는 껍질을 벗기고 0.3cm 두께로 편 썬 뒤, 같은 굵기로 가늘게 채 썰어요. 굵기가 일정해야 고르게 익어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "채 썬 감자를 찬물에 5분 담갔다가 물을 2~3번 갈아 가며 헹궈 전분을 빼요.",
    "timerSeconds": 300
   },
   {
    "stepNumber": 3,
    "description": "감자를 체에 밭쳐 물기를 빼고, 키친타월로 눌러 남은 물기를 꼼꼼히 닦아요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 4,
    "description": "양파와 당근은 감자와 비슷한 굵기로 채 썰고, 대파는 송송 썰어 둬요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 5,
    "description": "볼에 계란 3개와 소금 한 꼬집을 넣고 알끈이 끊어지도록 충분히 풀어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 6,
    "description": "달군 팬에 식용유 1큰술을 두르고 중불에서 계란물을 부어, 젓가락으로 크게 저어 70%만 익힌 뒤 접시에 덜어 둬요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 7,
    "description": "같은 팬에 식용유 2큰술과 대파 절반을 넣고 약불에서 1분간 볶아 파기름을 내요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 8,
    "description": "감자와 당근을 넣고 중불에서 3분간 볶아요. 자주 뒤적여야 팬에 붙지 않아요.",
    "timerSeconds": 180
   },
   {
    "stepNumber": 9,
    "description": "양파를 넣고 소금 1/2작은술로 간한 뒤, 감자가 반투명해질 때까지 2분 더 볶아요.",
    "timerSeconds": 120
   },
   {
    "stepNumber": 10,
    "description": "감자 한 가닥을 맛봐서 덜 익었으면 물 2큰술을 넣고 뚜껑을 덮어 1분간 익혀요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 11,
    "description": "덜어 둔 계란과 남은 대파를 넣고 30초만 가볍게 섞어요. 오래 볶으면 계란이 퍽퍽해져요.",
    "timerSeconds": 30
   },
   {
    "stepNumber": 12,
    "description": "불을 끄고 후추, 참기름, 통깨를 뿌려 한 번 섞으면 완성이에요.",
    "timerSeconds": null
   }
  ],
  "category": "반찬",
  "tip": "감자 전분을 충분히 빼고 물기를 닦아야 팬에 눌어붙지 않고 아삭해요. 계란은 먼저 반숙으로 익혀 두었다가 마지막에 넣어야 부드럽게 남아요."
 },
 {
  "id": 2,
  "title": "감자전",
  "emoji": "🥞",
  "cookingTime": 35,
  "difficulty": "보통",
  "writer": "오늘의밥상",
  "views": 860,
  "averageRating": 4.6,
  "servings": 2,
  "intro": "강판에 간 감자와 가라앉힌 감자 전분으로 겉은 바삭, 속은 쫀득하게 부치는 정통 감자전. 초간장을 곁들여요.",
  "ingredients": [
   {
    "ingredientId": 1,
    "quantity": 3,
    "unit": "개"
   },
   {
    "ingredientId": 4,
    "quantity": 0.25,
    "unit": "개"
   },
   {
    "ingredientId": 20,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 21,
    "quantity": 0.3,
    "unit": "작은술"
   },
   {
    "ingredientId": 22,
    "quantity": 5,
    "unit": "큰술"
   },
   {
    "ingredientId": 23,
    "quantity": 2,
    "unit": "큰술"
   },
   {
    "ingredientId": 40,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 28,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 29,
    "quantity": null,
    "unit": "약간"
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "감자는 껍질을 벗기고 찬물에 한 번 헹궈요. 양파도 껍질을 벗겨 둬요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "감자와 양파를 강판에 곱게 갈아요. 믹서를 쓸 때는 물 없이 짧게 끊어 갈아야 질어지지 않아요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 3,
    "description": "간 감자를 체에 밭쳐 숟가락으로 꾹꾹 눌러 물기를 짜고, 빠진 물은 볼에 받아 둬요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 4,
    "description": "받아 둔 감자 물을 10분간 그대로 두어 하얀 전분을 바닥에 가라앉혀요.",
    "timerSeconds": 600
   },
   {
    "stepNumber": 5,
    "description": "윗물만 조심스럽게 따라 버리고, 바닥에 남은 하얀 전분은 그대로 둬요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 6,
    "description": "전분이 있는 볼에 감자 건더기, 부침가루 1큰술, 소금을 넣고 고루 섞어 반죽을 만들어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 7,
    "description": "간장 2큰술, 식초 1큰술, 물 1큰술, 고춧가루 약간을 섞어 초간장을 만들어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 8,
    "description": "팬에 식용유 3큰술을 두르고 중불에서 1분간 충분히 달궈요. 기름이 넉넉해야 바삭해요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 9,
    "description": "반죽을 한 국자 떠서 올리고 숟가락으로 지름 10cm 정도로 얇게 펴요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 10,
    "description": "가장자리가 노릇하고 투명해질 때까지 3분간 그대로 부쳐요.",
    "timerSeconds": 180
   },
   {
    "stepNumber": 11,
    "description": "뒤집은 뒤 뒤집개로 꾹 눌러 주고, 기름을 1큰술씩 보충하며 2~3분 더 부쳐요.",
    "timerSeconds": 150
   },
   {
    "stepNumber": 12,
    "description": "키친타월 위에 올려 기름을 빼고, 초간장과 함께 따뜻할 때 내요.",
    "timerSeconds": null
   }
  ],
  "category": "반찬",
  "tip": "감자에서 빠진 전분을 다시 넣는 게 쫀득함의 비결이에요. 반죽을 얇게 펴고 기름을 넉넉히 둘러야 가장자리가 튀기듯 바삭해져요."
 },
 {
  "id": 3,
  "title": "계란찜",
  "emoji": "🍮",
  "cookingTime": 20,
  "difficulty": "쉬움",
  "writer": "자취9단",
  "views": 2010,
  "averageRating": 4.7,
  "servings": 2,
  "intro": "뚝배기 하나로 끓이는 몽글몽글 폭신한 식당식 계란찜. 새우젓으로 간해 감칠맛이 좋아요.",
  "ingredients": [
   {
    "ingredientId": 16,
    "quantity": 4,
    "unit": "개"
   },
   {
    "ingredientId": 28,
    "quantity": 120,
    "unit": "ml"
   },
   {
    "ingredientId": 27,
    "quantity": 1,
    "unit": "작은술"
   },
   {
    "ingredientId": 26,
    "quantity": 0.3,
    "unit": "작은술"
   },
   {
    "ingredientId": 5,
    "quantity": 0.3,
    "unit": "대"
   },
   {
    "ingredientId": 3,
    "quantity": 0.1,
    "unit": "개"
   },
   {
    "ingredientId": 30,
    "quantity": 0.5,
    "unit": "큰술"
   },
   {
    "ingredientId": 32,
    "quantity": null,
    "unit": "약간"
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "대파는 송송 썰고, 당근은 아주 잘게 다져요. 새우젓은 건더기만 건져 잘게 다져요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "볼에 계란 4개, 다진 새우젓, 설탕을 넣고 알끈이 끊어질 때까지 충분히 풀어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 3,
    "description": "물 120ml를 넣고 섞은 뒤 체에 한 번 걸러요. 걸러야 식감이 훨씬 부드러워요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 4,
    "description": "뚝배기를 중약불에 올려 1분간 예열해요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 5,
    "description": "계란물을 붓고 다진 당근을 넣어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 6,
    "description": "숟가락으로 바닥과 가장자리를 긁어 가며 계속 저어요. 눌어붙지 않게 하는 게 핵심이에요.",
    "timerSeconds": 120
   },
   {
    "stepNumber": 7,
    "description": "계란이 몽글몽글 70% 정도 엉기면 대파를 넣고 한 번만 크게 섞어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 8,
    "description": "크기가 맞는 뚜껑이나 뒤집은 그릇을 덮고 약불로 줄여 3분간 익혀요.",
    "timerSeconds": 180
   },
   {
    "stepNumber": 9,
    "description": "뚜껑 위로 봉긋하게 부풀어 오르면 불을 끄고 1분간 뜸을 들여요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 10,
    "description": "뚜껑을 열고 참기름 몇 방울과 통깨를 뿌려 뜨거울 때 내요.",
    "timerSeconds": null
   }
  ],
  "category": "반찬",
  "tip": "처음에 저어 주면 바닥이 타지 않고 전체가 고르게 익어요. 뚜껑을 덮은 뒤에는 꼭 약불로! 새우젓이 없으면 소금 1/3작은술로 대신해요."
 },
 {
  "id": 4,
  "title": "김치볶음밥",
  "emoji": "🍛",
  "cookingTime": 20,
  "difficulty": "쉬움",
  "writer": "냉부요리사",
  "views": 3120,
  "averageRating": 4.9,
  "servings": 2,
  "intro": "파기름과 눌린 간장으로 감칠맛을 낸 백종원 스타일 김치볶음밥. 반숙 계란 프라이를 올려 완성해요.",
  "ingredients": [
   {
    "ingredientId": 9,
    "quantity": 200,
    "unit": "g"
   },
   {
    "ingredientId": 18,
    "quantity": 2,
    "unit": "공기"
   },
   {
    "ingredientId": 5,
    "quantity": 1,
    "unit": "대"
   },
   {
    "ingredientId": 16,
    "quantity": 2,
    "unit": "개"
   },
   {
    "ingredientId": 22,
    "quantity": 3,
    "unit": "큰술"
   },
   {
    "ingredientId": 23,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 26,
    "quantity": 0.5,
    "unit": "큰술"
   },
   {
    "ingredientId": 29,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 34,
    "quantity": 10,
    "unit": "g"
   },
   {
    "ingredientId": 30,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 32,
    "quantity": null,
    "unit": "약간"
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "김치는 속을 털어 내고 가위로 1cm 크기로 잘게 잘라요. 김치 국물 2큰술은 따로 덜어 둬요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "대파는 송송 썰고, 밥은 찬밥을 준비해요. 따뜻한 밥이면 넓게 펼쳐 한 김 식혀요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 3,
    "description": "팬에 식용유 3큰술과 대파를 넣고 약불에서 2분간 볶아 파기름을 내요.",
    "timerSeconds": 120
   },
   {
    "stepNumber": 4,
    "description": "중불로 올리고 팬 한쪽에 간장 1큰술을 둘러 살짝 눌려 불향을 내요.",
    "timerSeconds": 20
   },
   {
    "stepNumber": 5,
    "description": "김치와 설탕을 넣고 김치가 투명해질 때까지 3분간 볶아요.",
    "timerSeconds": 180
   },
   {
    "stepNumber": 6,
    "description": "고춧가루를 넣고 기름에 30초간 볶아 색을 내요.",
    "timerSeconds": 30
   },
   {
    "stepNumber": 7,
    "description": "불을 끄고 밥을 넣어요. 불을 끈 상태에서 섞어야 밥이 눌어붙지 않아요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 8,
    "description": "주걱을 세워 자르듯이 섞어 양념이 밥알에 고루 묻게 해요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 9,
    "description": "다시 센 불로 올리고 김치 국물을 넣어 2분간 볶아 수분을 날려요.",
    "timerSeconds": 120
   },
   {
    "stepNumber": 10,
    "description": "버터와 참기름을 넣고 30초 섞은 뒤 맛을 보고 싱거우면 간장을 조금 더해요.",
    "timerSeconds": 30
   },
   {
    "stepNumber": 11,
    "description": "다른 팬에 식용유를 두르고 계란 프라이 2개를 반숙으로 부쳐요.",
    "timerSeconds": 120
   },
   {
    "stepNumber": 12,
    "description": "그릇에 볶음밥을 담고 계란 프라이를 올린 뒤 통깨를 뿌려 완성해요.",
    "timerSeconds": null
   }
  ],
  "category": "밥",
  "tip": "잘 익은 신김치일수록 맛있어요. 너무 시면 설탕을 조금 더 넣어 신맛을 잡아요. 찬밥을 쓰면 밥알이 뭉치지 않고 고슬고슬해져요."
 },
 {
  "id": 5,
  "title": "된장찌개",
  "emoji": "🍲",
  "cookingTime": 35,
  "difficulty": "보통",
  "writer": "오늘의밥상",
  "views": 1780,
  "averageRating": 4.7,
  "servings": 2,
  "intro": "멸치·다시마 육수에 된장을 풀고 감자, 애호박, 두부를 넣어 끓인 구수한 집 된장찌개.",
  "ingredients": [
   {
    "ingredientId": 17,
    "quantity": 0.5,
    "unit": "모"
   },
   {
    "ingredientId": 1,
    "quantity": 1,
    "unit": "개"
   },
   {
    "ingredientId": 7,
    "quantity": 0.3,
    "unit": "개"
   },
   {
    "ingredientId": 4,
    "quantity": 0.5,
    "unit": "개"
   },
   {
    "ingredientId": 5,
    "quantity": 0.5,
    "unit": "대"
   },
   {
    "ingredientId": 6,
    "quantity": 0.5,
    "unit": "큰술"
   },
   {
    "ingredientId": 25,
    "quantity": 2,
    "unit": "큰술"
   },
   {
    "ingredientId": 29,
    "quantity": 0.5,
    "unit": "큰술"
   },
   {
    "ingredientId": 39,
    "quantity": 1,
    "unit": "개"
   },
   {
    "ingredientId": 42,
    "quantity": 10,
    "unit": "마리"
   },
   {
    "ingredientId": 37,
    "quantity": 1,
    "unit": "장"
   },
   {
    "ingredientId": 28,
    "quantity": 600,
    "unit": "ml"
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "국물용 멸치는 머리와 배 속 검은 내장을 떼어 내요. 내장이 남으면 국물이 써요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "냄비에 손질한 멸치를 넣고 중불에서 1분간 마른 채로 볶아 비린내를 날려요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 3,
    "description": "물 600ml와 다시마를 넣고 센 불로 끓여요. 물이 끓기 시작하면 다시마는 건져요.",
    "timerSeconds": 300
   },
   {
    "stepNumber": 4,
    "description": "불을 중약불로 줄여 멸치를 10분간 우린 뒤 건져 내 육수를 완성해요.",
    "timerSeconds": 600
   },
   {
    "stepNumber": 5,
    "description": "감자는 0.7cm 두께로 납작하게, 애호박은 반달 모양으로, 양파는 깍둑 썰어요. 두부는 2cm 크기로 썰고, 대파와 청양고추는 어슷 썰어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 6,
    "description": "육수에 된장 2큰술을 체에 받쳐 풀고 다진 마늘을 넣어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 7,
    "description": "단단한 감자부터 넣고 중불에서 5분간 끓여요.",
    "timerSeconds": 300
   },
   {
    "stepNumber": 8,
    "description": "양파와 애호박을 넣고 3분간 더 끓여요.",
    "timerSeconds": 180
   },
   {
    "stepNumber": 9,
    "description": "두부와 고춧가루를 넣고 3분간 보글보글 끓여요.",
    "timerSeconds": 180
   },
   {
    "stepNumber": 10,
    "description": "국물 맛을 보고 싱거우면 된장을 조금씩 더 풀어 간을 맞춰요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 11,
    "description": "대파와 청양고추를 넣고 1분만 더 끓여요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 12,
    "description": "불을 끄고 바로 뚝배기에 담아 내요. 오래 두면 채소 전분 때문에 국물이 텁텁해져요.",
    "timerSeconds": null
   }
  ],
  "category": "국·찌개",
  "tip": "된장은 체에 걸러 풀면 국물이 깔끔해요. 오래 끓이면 된장 향이 날아가니 채소가 익으면 바로 불을 끄세요. 육수를 넉넉히 우려 냉장 보관하면 다음엔 10분이면 끓여요."
 },
 {
  "id": 6,
  "title": "제육볶음",
  "emoji": "🥘",
  "cookingTime": 30,
  "difficulty": "보통",
  "writer": "고기러버",
  "views": 2440,
  "averageRating": 4.8,
  "servings": 2,
  "intro": "고기를 먼저 굽고 설탕으로 코팅한 뒤 고추장 양념에 졸여 불향을 입힌 밥도둑 제육볶음.",
  "ingredients": [
   {
    "ingredientId": 10,
    "quantity": 400,
    "unit": "g"
   },
   {
    "ingredientId": 38,
    "quantity": 100,
    "unit": "g"
   },
   {
    "ingredientId": 4,
    "quantity": 0.5,
    "unit": "개"
   },
   {
    "ingredientId": 3,
    "quantity": 0.25,
    "unit": "개"
   },
   {
    "ingredientId": 5,
    "quantity": 1,
    "unit": "대"
   },
   {
    "ingredientId": 6,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 39,
    "quantity": 1,
    "unit": "개"
   },
   {
    "ingredientId": 24,
    "quantity": 2,
    "unit": "큰술"
   },
   {
    "ingredientId": 29,
    "quantity": 1.5,
    "unit": "큰술"
   },
   {
    "ingredientId": 23,
    "quantity": 2,
    "unit": "큰술"
   },
   {
    "ingredientId": 26,
    "quantity": 1.5,
    "unit": "큰술"
   },
   {
    "ingredientId": 33,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 28,
    "quantity": 60,
    "unit": "ml"
   },
   {
    "ingredientId": 22,
    "quantity": 2,
    "unit": "큰술"
   },
   {
    "ingredientId": 30,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 31,
    "quantity": null,
    "unit": "약간"
   },
   {
    "ingredientId": 32,
    "quantity": null,
    "unit": "약간"
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "돼지고기(앞다리살)는 키친타월로 핏물을 닦고 한입 크기로 썰어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "고추장 2, 고춧가루 1, 간장 2, 다진 마늘 1, 맛술 1큰술과 물 60ml, 후추 약간을 섞어 양념장을 만들어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 3,
    "description": "양배추는 큼직하게, 양파는 굵게 채 썰고 당근은 얇게 반달 썰어요. 대파는 흰 부분은 송송, 초록 부분은 어슷 썰고 청양고추도 어슷 썰어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 4,
    "description": "팬에 식용유 2큰술과 대파 흰 부분을 넣고 중불에서 1분간 볶아 파기름을 내요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 5,
    "description": "고기를 넣고 센 불에서 겉면이 하얗게 익을 때까지 3분간 볶아요.",
    "timerSeconds": 180
   },
   {
    "stepNumber": 6,
    "description": "설탕 1.5큰술을 넣고 1분간 볶아 고기에 단맛을 먼저 입혀요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 7,
    "description": "양념장을 모두 붓고 중불에서 졸이며 고기에 양념이 배게 3분간 볶아요.",
    "timerSeconds": 180
   },
   {
    "stepNumber": 8,
    "description": "국물이 절반쯤 줄면 양배추, 양파, 당근을 넣고 2분간 볶아요.",
    "timerSeconds": 120
   },
   {
    "stepNumber": 9,
    "description": "남은 고춧가루 0.5큰술을 넣고 센 불에서 1분간 수분을 날리며 볶아 불향을 내요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 10,
    "description": "대파 초록 부분과 청양고추를 넣고 30초만 더 볶아요.",
    "timerSeconds": 30
   },
   {
    "stepNumber": 11,
    "description": "불을 끄고 참기름과 통깨를 뿌려 한 번 섞으면 완성이에요.",
    "timerSeconds": null
   }
  ],
  "category": "일품",
  "tip": "앞다리살이나 목살을 쓰면 부드럽고 기름기가 적당해요. 설탕을 양념보다 먼저 넣으면 고기가 연해지고 양념이 겉돌지 않아요. 매운맛은 청양고추로 조절하세요."
 },
 {
  "id": 7,
  "title": "감자조림",
  "emoji": "🥔",
  "cookingTime": 35,
  "difficulty": "쉬움",
  "writer": "자취9단",
  "views": 940,
  "averageRating": 4.5,
  "servings": 2,
  "intro": "간장 양념이 속까지 배어 짭조름하고, 마지막에 올리고당으로 윤기를 낸 쫀득한 감자조림.",
  "ingredients": [
   {
    "ingredientId": 1,
    "quantity": 3,
    "unit": "개"
   },
   {
    "ingredientId": 3,
    "quantity": 0.3,
    "unit": "개"
   },
   {
    "ingredientId": 4,
    "quantity": 0.5,
    "unit": "개"
   },
   {
    "ingredientId": 6,
    "quantity": 0.5,
    "unit": "큰술"
   },
   {
    "ingredientId": 22,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 23,
    "quantity": 3,
    "unit": "큰술"
   },
   {
    "ingredientId": 33,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 26,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 35,
    "quantity": 2,
    "unit": "큰술"
   },
   {
    "ingredientId": 28,
    "quantity": 200,
    "unit": "ml"
   },
   {
    "ingredientId": 30,
    "quantity": 0.5,
    "unit": "큰술"
   },
   {
    "ingredientId": 32,
    "quantity": 0.5,
    "unit": "큰술"
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "감자는 껍질을 벗겨 2cm 크기로 깍둑 썰어요. 모서리를 살짝 다듬으면 조려도 부서지지 않아요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "썬 감자를 찬물에 10분간 담가 전분을 빼요.",
    "timerSeconds": 600
   },
   {
    "stepNumber": 3,
    "description": "체에 밭쳐 물기를 충분히 빼요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 4,
    "description": "당근과 양파도 감자와 비슷한 크기로 썰어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 5,
    "description": "냄비에 식용유를 두르고 감자와 당근을 넣어 중불에서 3분간 볶아 겉면을 코팅해요.",
    "timerSeconds": 180
   },
   {
    "stepNumber": 6,
    "description": "물 200ml, 간장 3큰술, 맛술 1큰술, 설탕 1큰술, 다진 마늘을 넣고 끓여요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 7,
    "description": "끓어오르면 뚜껑을 덮고 중약불로 줄여 10분간 조려요.",
    "timerSeconds": 600
   },
   {
    "stepNumber": 8,
    "description": "뚜껑을 열고 양파를 넣은 뒤, 중불에서 저어 가며 국물이 자작해질 때까지 5분간 조려요.",
    "timerSeconds": 300
   },
   {
    "stepNumber": 9,
    "description": "젓가락으로 감자를 찔러 보아 쑥 들어가면 다 익은 거예요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 10,
    "description": "올리고당 2큰술을 넣고 센 불에서 1분 30초간 굴려 가며 윤기를 내요.",
    "timerSeconds": 90
   },
   {
    "stepNumber": 11,
    "description": "불을 끄고 참기름과 통깨를 뿌려 섞어요. 식으면 더 쫀득해져요.",
    "timerSeconds": null
   }
  ],
  "category": "반찬",
  "tip": "감자를 먼저 기름에 볶으면 조려도 모양이 살아 있어요. 올리고당(물엿)은 마지막에 넣어야 타지 않고 윤기가 나요."
 },
 {
  "id": 8,
  "title": "연어덮밥",
  "emoji": "🍣",
  "cookingTime": 35,
  "difficulty": "쉬움",
  "writer": "바다식탁",
  "views": 1310,
  "averageRating": 4.6,
  "servings": 2,
  "intro": "배합초로 간한 밥 위에 도톰한 생연어와 양파를 올리고 달짝지근한 간장 소스를 곁들인 사케동.",
  "ingredients": [
   {
    "ingredientId": 13,
    "quantity": 300,
    "unit": "g"
   },
   {
    "ingredientId": 18,
    "quantity": 2,
    "unit": "공기"
   },
   {
    "ingredientId": 4,
    "quantity": 0.5,
    "unit": "개"
   },
   {
    "ingredientId": 5,
    "quantity": 0.2,
    "unit": "대"
   },
   {
    "ingredientId": 16,
    "quantity": 2,
    "unit": "개"
   },
   {
    "ingredientId": 23,
    "quantity": 4,
    "unit": "큰술"
   },
   {
    "ingredientId": 33,
    "quantity": 2,
    "unit": "큰술"
   },
   {
    "ingredientId": 26,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 28,
    "quantity": 4,
    "unit": "큰술"
   },
   {
    "ingredientId": 40,
    "quantity": 2,
    "unit": "큰술"
   },
   {
    "ingredientId": 21,
    "quantity": null,
    "unit": "약간"
   },
   {
    "ingredientId": 41,
    "quantity": null,
    "unit": "약간"
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "양파는 아주 얇게 채 썰어 찬물에 20분 담가 매운맛을 빼요.",
    "timerSeconds": 1200
   },
   {
    "stepNumber": 2,
    "description": "작은 냄비에 간장 4, 맛술 2, 물 4큰술, 설탕 0.5큰술과 양파 몇 가닥을 넣고 끓으면 약불로 5분 졸여요.",
    "timerSeconds": 300
   },
   {
    "stepNumber": 3,
    "description": "소스를 체에 걸러 그릇에 담고 식혀 둬요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 4,
    "description": "식초 2큰술, 설탕 0.5큰술, 소금 한 꼬집을 섞어 배합초를 만들어요. 전자레인지에 10초 돌리면 설탕이 잘 녹아요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 5,
    "description": "뜨거운 밥에 배합초를 넣고 주걱을 세워 자르듯 섞은 뒤, 체온 정도로 식혀요.",
    "timerSeconds": 300
   },
   {
    "stepNumber": 6,
    "description": "연어는 키친타월로 물기를 닦고, 결 반대 방향으로 1cm 두께로 썰어요. 1인분에 8조각 정도면 좋아요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 7,
    "description": "물에 담가 둔 양파를 건져 물기를 완전히 빼요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 8,
    "description": "대파(또는 쪽파)는 아주 얇게 송송 썰고, 계란은 노른자만 분리해 둬요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 9,
    "description": "그릇에 밥을 봉긋하게 담고 간장 소스를 1큰술씩 뿌려요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 10,
    "description": "밥 위에 양파를 깔고, 연어를 넓은 면이 아래로 가게 부채꼴로 둘러 올려요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 11,
    "description": "가운데에 노른자를 올리고 와사비와 송송 썬 파를 곁들여요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 12,
    "description": "남은 소스는 따로 내어 먹기 직전에 입맛대로 뿌려요.",
    "timerSeconds": null
   }
  ],
  "category": "밥",
  "tip": "연어는 먹기 직전까지 냉장고에 두세요. 소스는 미리 끓여 식혀야 비린 맛 없이 깔끔해요. 밥을 비비지 말고 연어를 한 점씩 올려 먹는 게 정석이에요."
 },
 {
  "id": 9,
  "title": "두부부침",
  "emoji": "🍢",
  "cookingTime": 25,
  "difficulty": "쉬움",
  "writer": "자취9단",
  "views": 680,
  "averageRating": 4.4,
  "servings": 2,
  "intro": "물기를 뺀 두부에 계란옷을 두 번 입혀 노릇하게 부치고, 매콤한 간장 양념장을 곁들인 두부부침.",
  "ingredients": [
   {
    "ingredientId": 17,
    "quantity": 1,
    "unit": "모"
   },
   {
    "ingredientId": 16,
    "quantity": 2,
    "unit": "개"
   },
   {
    "ingredientId": 5,
    "quantity": 0.3,
    "unit": "대"
   },
   {
    "ingredientId": 6,
    "quantity": 0.5,
    "unit": "큰술"
   },
   {
    "ingredientId": 39,
    "quantity": 1,
    "unit": "개"
   },
   {
    "ingredientId": 21,
    "quantity": 0.3,
    "unit": "작은술"
   },
   {
    "ingredientId": 31,
    "quantity": null,
    "unit": "약간"
   },
   {
    "ingredientId": 22,
    "quantity": 3,
    "unit": "큰술"
   },
   {
    "ingredientId": 23,
    "quantity": 3,
    "unit": "큰술"
   },
   {
    "ingredientId": 28,
    "quantity": 2,
    "unit": "큰술"
   },
   {
    "ingredientId": 33,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 29,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 26,
    "quantity": 0.5,
    "unit": "작은술"
   },
   {
    "ingredientId": 30,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 32,
    "quantity": null,
    "unit": "약간"
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "두부는 1cm 두께로 8등분해요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "키친타월 위에 두부를 올리고 소금을 솔솔 뿌려 10분간 물기를 빼요.",
    "timerSeconds": 600
   },
   {
    "stepNumber": 3,
    "description": "계란 2개에 소금 한 꼬집과 후추를 넣고 곱게 풀어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 4,
    "description": "대파와 청양고추는 잘게 다져요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 5,
    "description": "간장 3, 물 2, 맛술 1, 고춧가루 1큰술과 다진 마늘, 설탕, 참기름, 다진 대파·청양고추, 통깨를 섞어 양념장을 만들어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 6,
    "description": "두부 겉면의 물기를 키친타월로 한 번 더 닦아요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 7,
    "description": "팬에 식용유를 두르고 중불에서 1분간 달궈요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 8,
    "description": "두부에 계란물을 골고루 입혀 팬에 올려요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 9,
    "description": "아랫면이 노릇해질 때까지 3분간 건드리지 말고 부쳐요.",
    "timerSeconds": 180
   },
   {
    "stepNumber": 10,
    "description": "윗면에 계란물을 한 번 더 바른 뒤 뒤집어 3분간 노릇하게 부쳐요.",
    "timerSeconds": 180
   },
   {
    "stepNumber": 11,
    "description": "옆면도 세워 굴려 가며 익힌 뒤 접시에 담고 양념장을 곁들여요.",
    "timerSeconds": null
   }
  ],
  "category": "반찬",
  "tip": "물기를 충분히 빼야 기름이 튀지 않고 계란옷이 벗겨지지 않아요. 계란물은 두 번에 나눠 입히면 더 두툼하고 고르게 붙어요."
 },
 {
  "id": 10,
  "title": "오징어볶음",
  "emoji": "🦑",
  "cookingTime": 25,
  "difficulty": "보통",
  "writer": "바다식탁",
  "views": 1050,
  "averageRating": 4.6,
  "servings": 2,
  "intro": "단맛을 먼저 입히고 매운 양념을 더해 센 불에 빠르게 볶은 탱글탱글 오징어볶음.",
  "ingredients": [
   {
    "ingredientId": 14,
    "quantity": 2,
    "unit": "마리"
   },
   {
    "ingredientId": 38,
    "quantity": 150,
    "unit": "g"
   },
   {
    "ingredientId": 4,
    "quantity": 0.5,
    "unit": "개"
   },
   {
    "ingredientId": 3,
    "quantity": 0.2,
    "unit": "개"
   },
   {
    "ingredientId": 5,
    "quantity": 1,
    "unit": "대"
   },
   {
    "ingredientId": 6,
    "quantity": 0.5,
    "unit": "큰술"
   },
   {
    "ingredientId": 39,
    "quantity": 1,
    "unit": "개"
   },
   {
    "ingredientId": 24,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 29,
    "quantity": 1.5,
    "unit": "큰술"
   },
   {
    "ingredientId": 23,
    "quantity": 2,
    "unit": "큰술"
   },
   {
    "ingredientId": 26,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 28,
    "quantity": 3,
    "unit": "큰술"
   },
   {
    "ingredientId": 22,
    "quantity": 1.5,
    "unit": "큰술"
   },
   {
    "ingredientId": 30,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 32,
    "quantity": 0.5,
    "unit": "큰술"
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "오징어는 몸통을 갈라 내장과 눈, 입을 떼어 내고, 다리는 소금으로 문질러 빨판을 깨끗이 씻어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "몸통 안쪽에 사선으로 칼집을 넣고 1.5×5cm 크기로, 다리는 5cm 길이로 썰어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 3,
    "description": "양배추는 한입 크기로, 양파는 굵게 썰고 당근은 0.4cm 두께로 편 썰어요. 대파 흰 부분은 잘게 다지고 나머지와 청양고추는 어슷 썰어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 4,
    "description": "고추장 1, 고춧가루 1.5, 간장 2큰술과 다진 마늘을 섞어 양념장을 만들어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 5,
    "description": "팬에 식용유와 다진 대파를 넣고 중불에서 1분간 볶아 파기름을 내요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 6,
    "description": "센 불로 올려 오징어를 넣고 겉면이 하얗게 변할 때까지 1분간 볶아요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 7,
    "description": "설탕 1큰술을 넣고 섞어 단맛을 먼저 입혀요.",
    "timerSeconds": 30
   },
   {
    "stepNumber": 8,
    "description": "양념장을 넣고 오징어에 고루 묻도록 볶아요.",
    "timerSeconds": 30
   },
   {
    "stepNumber": 9,
    "description": "양배추, 양파, 당근을 넣고 물 3큰술을 부어 센 불에서 2분간 빠르게 볶아요.",
    "timerSeconds": 120
   },
   {
    "stepNumber": 10,
    "description": "어슷 썬 대파와 청양고추를 넣고 30초만 더 볶아요.",
    "timerSeconds": 30
   },
   {
    "stepNumber": 11,
    "description": "불을 끄고 참기름과 통깨를 뿌려 섞어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 12,
    "description": "식으면 물이 생기니 바로 내요. 밥 위에 올려 오징어덮밥으로 먹어도 좋아요.",
    "timerSeconds": null
   }
  ],
  "category": "일품",
  "tip": "오징어는 오래 볶으면 질겨지고 물이 생겨요. 센 불에서 3~4분 안에 끝내는 게 핵심이에요. 단맛을 먼저 내고 매운맛을 나중에 더하면 감칠맛이 살아요."
 },
 {
  "id": 11,
  "title": "토마토달걀볶음",
  "emoji": "🍅",
  "cookingTime": 15,
  "difficulty": "쉬움",
  "writer": "오늘의밥상",
  "views": 1520,
  "averageRating": 4.7,
  "servings": 2,
  "intro": "센 불에 부드럽게 익힌 계란과 새콤한 토마토를 굴소스로 맛을 낸 중국식 가정식 토마토달걀볶음.",
  "ingredients": [
   {
    "ingredientId": 8,
    "quantity": 2,
    "unit": "개"
   },
   {
    "ingredientId": 16,
    "quantity": 3,
    "unit": "개"
   },
   {
    "ingredientId": 5,
    "quantity": 0.5,
    "unit": "대"
   },
   {
    "ingredientId": 22,
    "quantity": 3,
    "unit": "큰술"
   },
   {
    "ingredientId": 21,
    "quantity": null,
    "unit": "약간"
   },
   {
    "ingredientId": 26,
    "quantity": 0.5,
    "unit": "작은술"
   },
   {
    "ingredientId": 36,
    "quantity": 0.5,
    "unit": "큰술"
   },
   {
    "ingredientId": 31,
    "quantity": null,
    "unit": "약간"
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "토마토는 깨끗이 씻어 꼭지를 떼어 내요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "토마토를 8등분해 웨지 모양으로 썰어요. 방울토마토라면 옆으로 반 갈라요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 3,
    "description": "대파는 송송 썰어 둬요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 4,
    "description": "계란 3개에 소금 한 꼬집을 넣고 곱게 풀어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 5,
    "description": "팬에 식용유 2큰술을 두르고 센 불에서 연기가 살짝 날 때까지 달궈요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 6,
    "description": "계란물을 붓고 10초 기다렸다가 크게 저어 70%만 익혀요.",
    "timerSeconds": 30
   },
   {
    "stepNumber": 7,
    "description": "계란을 접시에 덜어 둬요. 덜 익었을 때 건져야 마지막에 부드러워요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 8,
    "description": "같은 팬에 식용유 1큰술과 대파를 넣고 중불에서 30초간 볶아 파기름을 내요.",
    "timerSeconds": 30
   },
   {
    "stepNumber": 9,
    "description": "토마토와 설탕을 넣고 즙이 살짝 나올 때까지 1분 30초간 볶아요.",
    "timerSeconds": 90
   },
   {
    "stepNumber": 10,
    "description": "굴소스 0.5큰술을 넣고 고루 섞어요. 싱거우면 조금씩 더해요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 11,
    "description": "덜어 둔 계란을 다시 넣고 30초간 가볍게 섞은 뒤 후추로 마무리해요.",
    "timerSeconds": 30
   }
  ],
  "category": "일품",
  "tip": "팬을 충분히 달군 뒤 계란을 넣어야 폭신하게 부풀어요. 잘 익은 토마토를 쓰면 설탕을 줄여도 달고 새콤해요."
 },
 {
  "id": 12,
  "title": "치즈계란말이",
  "emoji": "🧀",
  "cookingTime": 20,
  "difficulty": "보통",
  "writer": "냉부요리사",
  "views": 1890,
  "averageRating": 4.8,
  "servings": 2,
  "intro": "계란물을 세 번에 나눠 부으며 돌돌 말아 속에서 치즈가 쭉 늘어나는 두툼한 치즈계란말이.",
  "ingredients": [
   {
    "ingredientId": 16,
    "quantity": 5,
    "unit": "개"
   },
   {
    "ingredientId": 19,
    "quantity": 2,
    "unit": "장"
   },
   {
    "ingredientId": 5,
    "quantity": 0.3,
    "unit": "대"
   },
   {
    "ingredientId": 3,
    "quantity": 0.1,
    "unit": "개"
   },
   {
    "ingredientId": 21,
    "quantity": 0.3,
    "unit": "작은술"
   },
   {
    "ingredientId": 33,
    "quantity": 0.5,
    "unit": "큰술"
   },
   {
    "ingredientId": 22,
    "quantity": 1,
    "unit": "큰술"
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "대파와 당근은 아주 잘게 다져요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "계란 5개에 소금과 맛술을 넣고 곱게 풀어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 3,
    "description": "계란물을 체에 걸러 알끈을 제거해요. 훨씬 매끈하고 부드럽게 말려요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 4,
    "description": "다진 대파와 당근을 넣고 섞어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 5,
    "description": "사각팬(또는 작은 팬)에 식용유를 두르고 키친타월로 얇게 펴 바른 뒤 약불에서 1분간 예열해요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 6,
    "description": "계란물 1/3을 붓고 팬을 기울여 얇게 펴요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 7,
    "description": "윗면이 70% 정도 익으면 한쪽 끝에 치즈 2장을 올려요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 8,
    "description": "치즈 쪽부터 뒤집개로 3~4번 접어 가며 돌돌 말아요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 9,
    "description": "말은 계란을 팬 끝으로 밀고, 빈 곳에 기름을 살짝 바른 뒤 계란물 1/3을 부어 말은 계란 밑으로 흘려 이어 붙여요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 10,
    "description": "익으면 같은 방법으로 다시 말고, 남은 계란물로 한 번 더 반복해요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 11,
    "description": "다 말았으면 뒤집개로 모서리를 눌러 가며 1분간 굴려 모양을 잡아요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 12,
    "description": "불을 끄고 3분간 그대로 두어 한 김 식힌 뒤 2cm 두께로 썰어요.",
    "timerSeconds": 180
   }
  ],
  "category": "반찬",
  "tip": "약불을 유지해야 겉이 타지 않고 노랗게 말려요. 치즈 자체가 짜니 소금은 조금만 넣으세요. 썰기 전에 김발로 감싸 두면 모양이 더 반듯해요."
 }
];
