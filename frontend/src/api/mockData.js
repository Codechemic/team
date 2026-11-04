// 서버 연결 전 화면 개발용 mock 데이터 (db/seed.sql 과 같은 내용)
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
 }
];

export const RECIPES = [
 {
  "id": 1,
  "title": "감자계란볶음",
  "emoji": "🥔",
  "cookingTime": 20,
  "difficulty": "쉬움",
  "writer": "냉부요리사",
  "views": 1240,
  "averageRating": 4.8,
  "servings": 2,
  "intro": "",
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
    "ingredientId": 22,
    "quantity": 2,
    "unit": "큰술"
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "감자를 깨끗이 씻어 껍질을 벗긴 후 얇게 채 썹니다.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "계란을 풀어 소금을 약간 넣고 준비합니다.",
    "timerSeconds": null
   },
   {
    "stepNumber": 3,
    "description": "팬에 기름을 두르고 감자와 양파를 중불에서 볶습니다.",
    "timerSeconds": 300
   },
   {
    "stepNumber": 4,
    "description": "감자가 익으면 계란을 넣고 함께 볶은 뒤 대파를 올려 마무리합니다.",
    "timerSeconds": 120
   }
  ]
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
  "intro": "",
  "ingredients": [
   {
    "ingredientId": 1,
    "quantity": 3,
    "unit": "개"
   },
   {
    "ingredientId": 20,
    "quantity": 3,
    "unit": "큰술"
   },
   {
    "ingredientId": 21,
    "quantity": null,
    "unit": "약간"
   },
   {
    "ingredientId": 22,
    "quantity": 3,
    "unit": "큰술"
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "감자를 강판에 갈아 체에 받쳐 물기를 뺍니다.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "가라앉은 전분과 감자, 부침가루, 소금을 섞습니다.",
    "timerSeconds": null
   },
   {
    "stepNumber": 3,
    "description": "달군 팬에 기름을 넉넉히 두르고 한 국자씩 올려 부칩니다.",
    "timerSeconds": 240
   },
   {
    "stepNumber": 4,
    "description": "뒤집어서 노릇하게 한 번 더 부칩니다.",
    "timerSeconds": 180
   }
  ]
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
  "intro": "",
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
    "ingredientId": 28,
    "quantity": 150,
    "unit": "ml"
   },
   {
    "ingredientId": 27,
    "quantity": null,
    "unit": "약간"
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "계란을 풀고 물과 새우젓을 넣어 잘 섞습니다.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "뚝배기에 붓고 약불에서 저어가며 익힙니다.",
    "timerSeconds": 180
   },
   {
    "stepNumber": 3,
    "description": "몽글몽글해지면 대파를 올리고 뚜껑을 덮어 2분 더 익힙니다.",
    "timerSeconds": 120
   }
  ]
 },
 {
  "id": 4,
  "title": "김치볶음밥",
  "emoji": "🍳",
  "cookingTime": 15,
  "difficulty": "쉬움",
  "writer": "냉부요리사",
  "views": 3120,
  "averageRating": 4.9,
  "servings": 2,
  "intro": "",
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
    "quantity": 2,
    "unit": "큰술"
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "김치와 대파를 잘게 썹니다.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "기름에 대파를 볶아 파기름을 낸 뒤 김치를 볶습니다.",
    "timerSeconds": 180
   },
   {
    "stepNumber": 3,
    "description": "밥을 넣고 고루 섞으며 볶습니다.",
    "timerSeconds": 120
   },
   {
    "stepNumber": 4,
    "description": "계란 프라이를 올려 완성합니다.",
    "timerSeconds": null
   }
  ]
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
  "intro": "",
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
    "ingredientId": 25,
    "quantity": 2,
    "unit": "큰술"
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
    "description": "감자, 애호박, 양파, 두부를 한입 크기로 썹니다.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "물에 된장을 풀고 감자를 넣어 끓입니다.",
    "timerSeconds": 300
   },
   {
    "stepNumber": 3,
    "description": "애호박과 양파를 넣고 끓입니다.",
    "timerSeconds": 240
   },
   {
    "stepNumber": 4,
    "description": "두부와 대파를 넣고 한소끔 더 끓입니다.",
    "timerSeconds": 120
   }
  ]
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
  "intro": "",
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
    "ingredientId": 26,
    "quantity": 1,
    "unit": "큰술"
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "돼지고기에 고추장, 설탕, 마늘을 넣어 10분 재웁니다.",
    "timerSeconds": 600
   },
   {
    "stepNumber": 2,
    "description": "양파, 당근, 대파를 썹니다.",
    "timerSeconds": null
   },
   {
    "stepNumber": 3,
    "description": "달군 팬에 고기를 먼저 볶습니다.",
    "timerSeconds": 300
   },
   {
    "stepNumber": 4,
    "description": "채소를 넣고 숨이 죽을 때까지 볶습니다.",
    "timerSeconds": 180
   }
  ]
 },
 {
  "id": 7,
  "title": "감자조림",
  "emoji": "🥔",
  "cookingTime": 25,
  "difficulty": "쉬움",
  "writer": "자취9단",
  "views": 940,
  "averageRating": 4.5,
  "servings": 2,
  "intro": "",
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
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "감자와 당근, 양파를 깍둑 썹니다.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "감자를 물에 담가 전분을 뺍니다.",
    "timerSeconds": 300
   },
   {
    "stepNumber": 3,
    "description": "간장, 설탕, 물을 넣고 졸입니다.",
    "timerSeconds": 600
   }
  ]
 },
 {
  "id": 8,
  "title": "연어덮밥",
  "emoji": "🍣",
  "cookingTime": 15,
  "difficulty": "쉬움",
  "writer": "바다식탁",
  "views": 1310,
  "averageRating": 4.6,
  "servings": 2,
  "intro": "",
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
    "ingredientId": 23,
    "quantity": 2,
    "unit": "큰술"
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "양파를 얇게 썰어 찬물에 담급니다.",
    "timerSeconds": 300
   },
   {
    "stepNumber": 2,
    "description": "연어를 도톰하게 썹니다.",
    "timerSeconds": null
   },
   {
    "stepNumber": 3,
    "description": "밥 위에 양파와 연어를 올리고 간장 소스를 곁들입니다.",
    "timerSeconds": null
   }
  ]
 },
 {
  "id": 9,
  "title": "두부부침",
  "emoji": "🍢",
  "cookingTime": 15,
  "difficulty": "쉬움",
  "writer": "자취9단",
  "views": 680,
  "averageRating": 4.4,
  "servings": 2,
  "intro": "",
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
    "ingredientId": 21,
    "quantity": null,
    "unit": "약간"
   },
   {
    "ingredientId": 22,
    "quantity": 2,
    "unit": "큰술"
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "두부를 1cm 두께로 썰어 소금을 뿌립니다.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "풀어둔 계란물을 입힙니다.",
    "timerSeconds": null
   },
   {
    "stepNumber": 3,
    "description": "기름 두른 팬에 앞뒤로 노릇하게 부칩니다.",
    "timerSeconds": 300
   }
  ]
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
  "intro": "",
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
    "ingredientId": 24,
    "quantity": 2,
    "unit": "큰술"
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "오징어를 손질해 먹기 좋게 썹니다.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "채소를 썹니다.",
    "timerSeconds": null
   },
   {
    "stepNumber": 3,
    "description": "채소를 먼저 볶다가 오징어와 양념을 넣고 센불에 빠르게 볶습니다.",
    "timerSeconds": 240
   }
  ]
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
  "intro": "",
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
    "ingredientId": 21,
    "quantity": null,
    "unit": "약간"
   },
   {
    "ingredientId": 26,
    "quantity": 0.5,
    "unit": "큰술"
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "계란을 스크램블로 반쯤 익혀 덜어 둡니다.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 2,
    "description": "대파를 볶다가 토마토를 넣고 볶습니다.",
    "timerSeconds": 180
   },
   {
    "stepNumber": 3,
    "description": "계란을 다시 넣고 소금, 설탕으로 간합니다.",
    "timerSeconds": 60
   }
  ]
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
  "intro": "",
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
    "quantity": null,
    "unit": "약간"
   }
  ],
  "steps": [
   {
    "stepNumber": 1,
    "description": "계란에 다진 당근과 대파, 소금을 넣고 풉니다.",
    "timerSeconds": null
   },
   {
    "stepNumber": 2,
    "description": "약불에 계란물을 얇게 붓고 치즈를 올립니다.",
    "timerSeconds": 60
   },
   {
    "stepNumber": 3,
    "description": "돌돌 말아가며 나머지 계란물을 부어 익힙니다.",
    "timerSeconds": 180
   }
  ]
 }
];
