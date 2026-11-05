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
  "aliases": [],
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
  "intro": "채 썬 감자를 아삭하게 볶다가 부드러운 계란을 더한 10분 밑반찬. 도시락 반찬으로도 좋아요.",
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
    "ingredientId": 5,
    "quantity": 0.5,
    "unit": "대"
   },
   {
    "ingredientId": 21,
    "quantity": null,
    "unit": "약간"
   },
   {
    "ingredientId": 31,
    "quantity": null,
    "unit": "약간"
   },
   {
    "ingredientId": 22,
    "quantity": 2,
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
    "description": "감자는 껍질을 벗기고 0.3cm 두께로 얇게 채 썹니다. 양파도 채 썰고, 대파는 송송 썰어 둡니다.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "채 썬 감자를 찬물에 5분 담가 전분을 빼고, 체에 밭쳐 키친타월로 물기를 꼼꼼히 닦아요.",
    "timerSeconds": 300
   },
   {
    "stepNumber": 3,
    "description": "계란 3개에 소금 한 꼬집을 넣고 알끈이 끊어지도록 충분히 풀어 둡니다.",
    "timerSeconds": null
   },
   {
    "stepNumber": 4,
    "description": "달군 팬에 식용유 1큰술을 두르고 계란을 부어 젓가락으로 크게 저어 반숙 스크램블을 만든 뒤 따로 덜어 둡니다.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 5,
    "description": "같은 팬에 남은 식용유를 두르고 감자와 양파를 중불에서 투명해질 때까지 볶아요. 소금으로 간합니다.",
    "timerSeconds": 300
   },
   {
    "stepNumber": 6,
    "description": "덜어 둔 계란과 대파를 넣고 30초만 가볍게 섞은 뒤 후추와 통깨를 뿌려 마무리합니다.",
    "timerSeconds": 30
   }
  ],
  "category": "반찬",
  "tip": "감자 전분을 빼야 팬에 눌어붙지 않고 아삭해요. 계란은 먼저 익혀 두었다가 마지막에 넣어야 부드럽게 남아요."
 },
 {
  "id": 2,
  "title": "감자전",
  "emoji": "🥞",
  "cookingTime": 30,
  "difficulty": "보통",
  "writer": "오늘의밥상",
  "views": 860,
  "averageRating": 4.6,
  "servings": 2,
  "intro": "강판에 간 감자로 겉은 바삭, 속은 쫀득하게 부치는 비 오는 날 감자전.",
  "ingredients": [
   {
    "ingredientId": 1,
    "quantity": 3,
    "unit": "개"
   },
   {
    "ingredientId": 4,
    "quantity": 0.3,
    "unit": "개"
   },
   {
    "ingredientId": 20,
    "quantity": 2,
    "unit": "큰술"
   },
   {
    "ingredientId": 21,
    "quantity": 0.3,
    "unit": "작은술"
   },
   {
    "ingredientId": 22,
    "quantity": 4,
    "unit": "큰술"
   },
   {
    "ingredientId": 23,
    "quantity": 2,
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
    "description": "감자는 껍질을 벗기고 양파와 함께 강판에 곱게 갈아요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "간 감자를 체에 밭쳐 물기를 짜고, 받아 둔 물은 10분간 그대로 두어 전분을 가라앉혀요.",
    "timerSeconds": 600
   },
   {
    "stepNumber": 3,
    "description": "윗물은 따라 버리고 바닥에 가라앉은 하얀 전분만 감자 건더기에 다시 섞어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 4,
    "description": "부침가루 2큰술과 소금을 넣고 고루 섞어 반죽을 만듭니다. 너무 질면 부침가루를 조금 더 넣어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 5,
    "description": "팬에 식용유를 넉넉히 두르고 중불로 달군 뒤, 반죽을 한 국자씩 올려 얇게 펴요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 6,
    "description": "가장자리가 노릇해지면 뒤집어 앞뒤로 3분씩 바삭하게 부칩니다.",
    "timerSeconds": 360
   },
   {
    "stepNumber": 7,
    "description": "간장 2큰술, 물 1큰술, 고춧가루 약간을 섞어 초간장을 만들어 곁들여요.",
    "timerSeconds": null
   }
  ],
  "category": "반찬",
  "tip": "감자에서 나온 전분을 버리지 말고 다시 넣어야 쫀득해져요. 기름은 넉넉히, 불은 중불을 유지하세요."
 },
 {
  "id": 3,
  "title": "계란찜",
  "emoji": "🍮",
  "cookingTime": 15,
  "difficulty": "쉬움",
  "writer": "자취9단",
  "views": 2010,
  "averageRating": 4.7,
  "servings": 2,
  "intro": "전자레인지 없이 냄비 하나로 만드는 몽글몽글 폭신한 뚝배기 계란찜.",
  "ingredients": [
   {
    "ingredientId": 16,
    "quantity": 3,
    "unit": "개"
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
    "ingredientId": 28,
    "quantity": 150,
    "unit": "ml"
   },
   {
    "ingredientId": 27,
    "quantity": 0.5,
    "unit": "작은술"
   },
   {
    "ingredientId": 21,
    "quantity": null,
    "unit": "약간"
   },
   {
    "ingredientId": 30,
    "quantity": 0.5,
    "unit": "작은술"
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
    "description": "계란 3개를 볼에 깨뜨려 알끈이 없어질 때까지 곱게 풀고, 체에 한 번 걸러요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "물 150ml, 다진 새우젓 0.5작은술을 넣고 섞어요. 싱거우면 소금으로 간을 맞춥니다.",
    "timerSeconds": null
   },
   {
    "stepNumber": 3,
    "description": "대파는 잘게 송송 썰고, 당근은 아주 잘게 다져 계란물에 넣어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 4,
    "description": "뚝배기(또는 작은 냄비)에 계란물을 붓고 중불에서 바닥을 긁듯이 저어 가며 익혀요.",
    "timerSeconds": 120
   },
   {
    "stepNumber": 5,
    "description": "계란이 몽글몽글 반쯤 엉기면 약불로 줄이고 뚜껑을 덮어 3분간 뜸을 들입니다.",
    "timerSeconds": 180
   },
   {
    "stepNumber": 6,
    "description": "불을 끄고 참기름 몇 방울과 통깨를 뿌려 완성해요.",
    "timerSeconds": null
   }
  ],
  "category": "반찬",
  "tip": "처음에 저어 주면 바닥이 타지 않고 전체가 고르게 익어요. 뚜껑을 덮은 뒤에는 꼭 약불로!"
 },
 {
  "id": 4,
  "title": "김치볶음밥",
  "emoji": "🍛",
  "cookingTime": 15,
  "difficulty": "쉬움",
  "writer": "냉부요리사",
  "views": 3120,
  "averageRating": 4.9,
  "servings": 2,
  "intro": "잘 익은 김치를 버터와 함께 볶아 감칠맛을 끌어올린 기본 김치볶음밥.",
  "ingredients": [
   {
    "ingredientId": 9,
    "quantity": 1,
    "unit": "컵"
   },
   {
    "ingredientId": 18,
    "quantity": 2,
    "unit": "공기"
   },
   {
    "ingredientId": 16,
    "quantity": 2,
    "unit": "개"
   },
   {
    "ingredientId": 5,
    "quantity": 0.5,
    "unit": "대"
   },
   {
    "ingredientId": 22,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 34,
    "quantity": 10,
    "unit": "g"
   },
   {
    "ingredientId": 29,
    "quantity": 0.5,
    "unit": "큰술"
   },
   {
    "ingredientId": 23,
    "quantity": 0.5,
    "unit": "큰술"
   },
   {
    "ingredientId": 26,
    "quantity": 0.5,
    "unit": "작은술"
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
    "description": "김치는 가위로 잘게 자르고, 대파는 송송 썰어요. 밥은 미리 꺼내 한 김 식혀 둡니다.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "팬에 식용유와 버터를 두르고 약불에서 대파를 볶아 파기름을 내요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 3,
    "description": "김치와 설탕을 넣고 중불에서 김치가 투명해질 때까지 충분히 볶아요.",
    "timerSeconds": 180
   },
   {
    "stepNumber": 4,
    "description": "고춧가루와 간장을 팬 가장자리에 둘러 살짝 눌린 뒤 김치와 섞어 향을 냅니다.",
    "timerSeconds": 30
   },
   {
    "stepNumber": 5,
    "description": "밥을 넣고 주걱을 세워 자르듯이 섞으며 2분간 볶아요.",
    "timerSeconds": 120
   },
   {
    "stepNumber": 6,
    "description": "불을 끄고 참기름과 통깨를 넣어 섞어 그릇에 담아요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 7,
    "description": "다른 팬에 계란 프라이를 반숙으로 부쳐 밥 위에 올리면 완성!",
    "timerSeconds": 120
   }
  ],
  "category": "밥",
  "tip": "신김치일수록 맛있어요. 너무 시면 설탕을 조금 더 넣어 신맛을 잡으세요. 찬밥을 쓰면 더 고슬고슬해요."
 },
 {
  "id": 5,
  "title": "된장찌개",
  "emoji": "🍲",
  "cookingTime": 25,
  "difficulty": "보통",
  "writer": "오늘의밥상",
  "views": 1780,
  "averageRating": 4.7,
  "servings": 2,
  "intro": "다시마 육수에 된장을 풀고 채소를 듬뿍 넣어 끓인 구수한 집 된장찌개.",
  "ingredients": [
   {
    "ingredientId": 17,
    "quantity": 0.5,
    "unit": "모"
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
    "ingredientId": 1,
    "quantity": 1,
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
    "unit": "작은술"
   },
   {
    "ingredientId": 37,
    "quantity": 1,
    "unit": "장"
   },
   {
    "ingredientId": 28,
    "quantity": 500,
    "unit": "ml"
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "냄비에 물 500ml와 다시마 1장을 넣고 끓기 시작하면 다시마를 건져 육수를 만들어요.",
    "timerSeconds": 300
   },
   {
    "stepNumber": 2,
    "description": "감자는 납작하게, 애호박은 반달 모양으로, 양파는 깍둑 썰고 두부는 한입 크기로 잘라요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 3,
    "description": "육수에 된장 2큰술을 체에 걸러 풀고, 단단한 감자부터 넣어 5분 끓여요.",
    "timerSeconds": 300
   },
   {
    "stepNumber": 4,
    "description": "양파와 애호박, 다진 마늘을 넣고 중불에서 5분 더 끓입니다.",
    "timerSeconds": 300
   },
   {
    "stepNumber": 5,
    "description": "두부를 넣고 고춧가루를 살짝 풀어 3분간 보글보글 끓여요.",
    "timerSeconds": 180
   },
   {
    "stepNumber": 6,
    "description": "마지막에 대파를 넣고 한소끔 끓여 불을 꺼요.",
    "timerSeconds": 30
   }
  ],
  "category": "국·찌개",
  "tip": "된장은 체에 걸러 풀면 국물이 깔끔해요. 오래 끓이면 된장 향이 날아가니 채소가 익으면 바로 불을 끄세요."
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
  "intro": "고추장 양념에 재운 돼지고기를 센 불에 볶아 불향을 입힌 밥도둑 제육볶음.",
  "ingredients": [
   {
    "ingredientId": 10,
    "quantity": 300,
    "unit": "g"
   },
   {
    "ingredientId": 4,
    "quantity": 1,
    "unit": "개"
   },
   {
    "ingredientId": 5,
    "quantity": 1,
    "unit": "대"
   },
   {
    "ingredientId": 3,
    "quantity": 0.3,
    "unit": "개"
   },
   {
    "ingredientId": 6,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 24,
    "quantity": 2,
    "unit": "큰술"
   },
   {
    "ingredientId": 29,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 23,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 26,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 33,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 30,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 22,
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
    "description": "고추장 2, 고춧가루 1, 간장 1, 설탕 1, 맛술 1, 다진 마늘 1큰술을 섞어 양념장을 만들어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "돼지고기를 한입 크기로 자르고 양념장의 2/3를 넣어 조물조물 버무린 뒤 15분 재워요.",
    "timerSeconds": 900
   },
   {
    "stepNumber": 3,
    "description": "양파는 굵게 채 썰고, 당근은 얇게 반달 썰기, 대파는 어슷 썰어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 4,
    "description": "달군 팬에 식용유를 두르고 센 불에서 고기를 넣어 겉면이 익을 때까지 볶아요.",
    "timerSeconds": 240
   },
   {
    "stepNumber": 5,
    "description": "양파와 당근, 남은 양념장을 넣고 채소가 숨이 죽을 때까지 3분 더 볶아요.",
    "timerSeconds": 180
   },
   {
    "stepNumber": 6,
    "description": "대파와 참기름을 넣고 30초 볶은 뒤 통깨를 뿌려 마무리합니다.",
    "timerSeconds": 30
   }
  ],
  "category": "일품",
  "tip": "앞다리살이나 목살을 쓰면 부드럽고, 마지막에 팬을 센 불로 올리면 불향이 살아나요."
 },
 {
  "id": 7,
  "title": "감자조림",
  "emoji": "🥔",
  "cookingTime": 29,
  "difficulty": "쉬움",
  "writer": "자취9단",
  "views": 940,
  "averageRating": 4.5,
  "servings": 2,
  "intro": "간장 양념이 속까지 배어 짭조름하고 윤기 나는 감자조림.",
  "ingredients": [
   {
    "ingredientId": 1,
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
    "quantity": 0.3,
    "unit": "개"
   },
   {
    "ingredientId": 23,
    "quantity": 3,
    "unit": "큰술"
   },
   {
    "ingredientId": 26,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 35,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 28,
    "quantity": 200,
    "unit": "ml"
   },
   {
    "ingredientId": 22,
    "quantity": 1,
    "unit": "큰술"
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
    "description": "감자는 껍질을 벗겨 2cm 크기로 깍둑 썰고, 찬물에 담가 전분을 빼요.",
    "timerSeconds": 300
   },
   {
    "stepNumber": 2,
    "description": "양파와 당근도 감자와 비슷한 크기로 썰어 둡니다.",
    "timerSeconds": null
   },
   {
    "stepNumber": 3,
    "description": "냄비에 식용유를 두르고 감자와 당근을 중불에서 겉면이 투명해질 때까지 볶아요.",
    "timerSeconds": 180
   },
   {
    "stepNumber": 4,
    "description": "물 200ml, 간장 3큰술, 설탕 1큰술을 넣고 뚜껑을 덮어 10분 졸여요.",
    "timerSeconds": 600
   },
   {
    "stepNumber": 5,
    "description": "양파를 넣고 뚜껑을 연 채 국물이 자작해질 때까지 저어 가며 졸입니다.",
    "timerSeconds": 300
   },
   {
    "stepNumber": 6,
    "description": "올리고당을 넣어 윤기를 내고, 참기름과 통깨를 뿌려 완성해요.",
    "timerSeconds": 60
   }
  ],
  "category": "반찬",
  "tip": "감자를 먼저 기름에 볶으면 조려도 부서지지 않아요. 올리고당은 마지막에 넣어야 윤기가 살아요."
 },
 {
  "id": 8,
  "title": "연어덮밥",
  "emoji": "🍣",
  "cookingTime": 16,
  "difficulty": "쉬움",
  "writer": "바다식탁",
  "views": 1310,
  "averageRating": 4.6,
  "servings": 2,
  "intro": "도톰한 생연어와 양파를 간장 소스에 곁들인 일식집 스타일 연어덮밥.",
  "ingredients": [
   {
    "ingredientId": 13,
    "quantity": 200,
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
    "quantity": 0.3,
    "unit": "대"
   },
   {
    "ingredientId": 16,
    "quantity": 2,
    "unit": "개"
   },
   {
    "ingredientId": 23,
    "quantity": 2,
    "unit": "큰술"
   },
   {
    "ingredientId": 33,
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 26,
    "quantity": 0.5,
    "unit": "큰술"
   },
   {
    "ingredientId": 28,
    "quantity": 2,
    "unit": "큰술"
   },
   {
    "ingredientId": 30,
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
    "description": "간장 2, 맛술 1, 설탕 0.5, 물 2큰술을 작은 냄비에 넣고 한 번 끓여 덮밥 소스를 만들어 식혀요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 2,
    "description": "양파는 얇게 채 썰어 찬물에 10분 담가 매운맛을 빼고 물기를 빼요.",
    "timerSeconds": 600
   },
   {
    "stepNumber": 3,
    "description": "연어는 키친타월로 물기를 닦고 결 반대 방향으로 1cm 두께로 썰어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 4,
    "description": "계란은 노른자만 분리해 두거나, 반숙 계란 프라이를 준비해요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 5,
    "description": "따뜻한 밥에 참기름을 살짝 섞어 그릇에 담고 양파를 깔아요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 6,
    "description": "연어를 부채꼴로 둘러 올리고 노른자를 가운데 얹은 뒤, 소스와 송송 썬 대파·통깨를 뿌려요.",
    "timerSeconds": null
   }
  ],
  "category": "밥",
  "tip": "연어는 먹기 직전까지 냉장고에 두세요. 소스는 미리 끓여 식혀야 비린 맛 없이 깔끔해요."
 },
 {
  "id": 9,
  "title": "두부부침",
  "emoji": "🍢",
  "cookingTime": 21,
  "difficulty": "쉬움",
  "writer": "자취9단",
  "views": 680,
  "averageRating": 4.4,
  "servings": 2,
  "intro": "계란옷을 입혀 겉은 노릇, 속은 촉촉한 두부부침과 양념장.",
  "ingredients": [
   {
    "ingredientId": 17,
    "quantity": 1,
    "unit": "모"
   },
   {
    "ingredientId": 16,
    "quantity": 1,
    "unit": "개"
   },
   {
    "ingredientId": 5,
    "quantity": 0.3,
    "unit": "대"
   },
   {
    "ingredientId": 21,
    "quantity": 0.3,
    "unit": "작은술"
   },
   {
    "ingredientId": 22,
    "quantity": 2,
    "unit": "큰술"
   },
   {
    "ingredientId": 23,
    "quantity": 2,
    "unit": "큰술"
   },
   {
    "ingredientId": 29,
    "quantity": 0.5,
    "unit": "작은술"
   },
   {
    "ingredientId": 26,
    "quantity": 0.3,
    "unit": "작은술"
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
    "description": "두부는 1cm 두께로 썰어 키친타월 위에 올리고 소금을 뿌려 10분간 물기를 빼요.",
    "timerSeconds": 600
   },
   {
    "stepNumber": 2,
    "description": "계란을 풀고 소금 한 꼬집을 넣어 계란물을 만들어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 3,
    "description": "두부의 물기를 한 번 더 닦고 계란물을 앞뒤로 골고루 입혀요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 4,
    "description": "달군 팬에 식용유를 두르고 중불에서 한 면당 3분씩 노릇하게 부쳐요.",
    "timerSeconds": 360
   },
   {
    "stepNumber": 5,
    "description": "간장 2, 고춧가루 0.5, 설탕 약간, 참기름, 송송 썬 대파, 통깨를 섞어 양념장을 만들어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 6,
    "description": "접시에 두부를 담고 양념장을 한 숟갈씩 올려 완성해요.",
    "timerSeconds": null
   }
  ],
  "category": "반찬",
  "tip": "물기를 충분히 빼야 기름이 튀지 않고 겉이 바삭해져요. 자주 뒤집지 말고 한 번만 뒤집으세요."
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
  "intro": "탱글한 오징어와 채소를 매콤달콤한 고추장 양념에 센 불로 빠르게 볶은 오징어볶음.",
  "ingredients": [
   {
    "ingredientId": 14,
    "quantity": 1,
    "unit": "마리"
   },
   {
    "ingredientId": 4,
    "quantity": 1,
    "unit": "개"
   },
   {
    "ingredientId": 3,
    "quantity": 0.3,
    "unit": "개"
   },
   {
    "ingredientId": 5,
    "quantity": 1,
    "unit": "대"
   },
   {
    "ingredientId": 7,
    "quantity": 0.3,
    "unit": "개"
   },
   {
    "ingredientId": 6,
    "quantity": 1,
    "unit": "큰술"
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
    "quantity": 1,
    "unit": "큰술"
   },
   {
    "ingredientId": 22,
    "quantity": 1,
    "unit": "큰술"
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
    "description": "오징어는 내장을 빼고 껍질을 벗긴 뒤, 몸통 안쪽에 칼집을 넣어 한입 크기로 썰어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "양파·애호박은 굵게 채 썰고, 당근은 얇게, 대파는 어슷 썰어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 3,
    "description": "고추장 2, 고춧가루 1.5, 간장 1, 설탕 1, 다진 마늘 1큰술을 섞어 양념장을 만들어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 4,
    "description": "팬에 식용유를 두르고 센 불에서 양파와 당근을 1분 볶아요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 5,
    "description": "오징어와 애호박, 양념장을 넣고 센 불에서 2~3분만 빠르게 볶아요.",
    "timerSeconds": 150
   },
   {
    "stepNumber": 6,
    "description": "대파와 올리고당을 넣어 30초 더 볶고, 참기름과 통깨로 마무리해요.",
    "timerSeconds": 30
   }
  ],
  "category": "일품",
  "tip": "오징어는 오래 볶으면 질겨지고 물이 생겨요. 센 불에서 3분 안에 끝내는 게 핵심이에요."
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
  "intro": "새콤한 토마토와 부드러운 계란이 어우러진 중국식 가정식 토마토달걀볶음.",
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
    "ingredientId": 6,
    "quantity": 0.5,
    "unit": "큰술"
   },
   {
    "ingredientId": 21,
    "quantity": 0.3,
    "unit": "작은술"
   },
   {
    "ingredientId": 26,
    "quantity": 0.5,
    "unit": "큰술"
   },
   {
    "ingredientId": 36,
    "quantity": 0.5,
    "unit": "큰술"
   },
   {
    "ingredientId": 22,
    "quantity": 2,
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
    "description": "토마토는 꼭지를 떼고 8등분으로 웨지 모양으로 썰어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "계란에 소금 한 꼬집을 넣고 풀어 둡니다. 대파는 송송 썰어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 3,
    "description": "팬에 식용유 1큰술을 두르고 센 불에서 계란을 부어 크게 저어 70%만 익힌 뒤 덜어 둬요.",
    "timerSeconds": 40
   },
   {
    "stepNumber": 4,
    "description": "같은 팬에 남은 기름을 두르고 대파와 다진 마늘을 볶아 향을 내요.",
    "timerSeconds": 30
   },
   {
    "stepNumber": 5,
    "description": "토마토와 설탕을 넣고 토마토 즙이 살짝 나올 때까지 2분 볶아요.",
    "timerSeconds": 120
   },
   {
    "stepNumber": 6,
    "description": "굴소스를 넣고 덜어 둔 계란을 다시 넣어 가볍게 섞은 뒤 후추를 뿌려 완성해요.",
    "timerSeconds": 30
   }
  ],
  "category": "일품",
  "tip": "계란은 덜 익었을 때 건져야 마지막에 부드러워요. 잘 익은 토마토를 쓰면 설탕을 줄여도 돼요."
 },
 {
  "id": 12,
  "title": "치즈계란말이",
  "emoji": "🧀",
  "cookingTime": 15,
  "difficulty": "보통",
  "writer": "냉부요리사",
  "views": 1890,
  "averageRating": 4.8,
  "servings": 2,
  "intro": "돌돌 말린 계란 속에서 치즈가 쭉 늘어나는 아이들도 좋아하는 계란말이.",
  "ingredients": [
   {
    "ingredientId": 16,
    "quantity": 4,
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
    "quantity": 0.2,
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
    "description": "계란 4개에 소금과 맛술을 넣어 곱게 풀고, 다진 채소를 섞어요.",
    "timerSeconds": null
   },
   {
    "stepNumber": 3,
    "description": "사각팬(또는 작은 팬)에 식용유를 얇게 두르고 약불로 달궈요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 4,
    "description": "계란물의 1/3을 부어 얇게 펴고, 반쯤 익으면 치즈 2장을 가운데 올려요.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 5,
    "description": "끝에서부터 돌돌 말아 한쪽으로 밀고, 남은 계란물을 나눠 부어 이어서 말아요.",
    "timerSeconds": 180
   },
   {
    "stepNumber": 6,
    "description": "다 말았으면 불을 끄고 3분간 그대로 두어 모양을 잡은 뒤 한 김 식혀 썰어요.",
    "timerSeconds": 180
   }
  ],
  "category": "반찬",
  "tip": "약불을 유지해야 겉이 타지 않고 노랗게 말려요. 썰기 전 김발로 감싸 두면 모양이 더 예뻐요."
 }
];
