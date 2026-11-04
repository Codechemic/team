# 냉장고를 부탁해 · 데이터 API (Supabase)

화면(`frontend/src/api/index.js`)이 Supabase를 부르는 방법입니다. 클래스 다이어그램의 서비스와 같게 나눴습니다.
DB 함수는 `supabase/02_functions.sql`, 권한은 `supabase/03_security.sql`에 있습니다.

| 서비스 (클래스 다이어그램) | 화면 함수 | Supabase 호출 | 유스케이스 | 로그인 |
|---|---|---|---|---|
| IngredientService.searchIngredients | `api.searchIngredients(q, category)` | `rpc('search_ingredients', { q, cat })` | B01, E04 | |
| RecipeService.recommendRecipes | `api.recommend(ids, sort)` | `rpc('recommend_recipes', { ingredient_ids, sort })` | C01, C02 | |
| RecipeService.getRecipe | `api.getRecipe(id)` | `rpc('get_recipe', { p_recipe_id })` · 조회수 +1 | D | |
| RecipeService.registerRecipe | `api.createRecipe(body)` | Storage 업로드 → `rpc('create_recipe', { payload })` | E01, E04 | 필요 |
| RecipeService (내 레시피) | `api.myRecipes()` | `from('recipe').select().eq('writer_id', 나)` | 마이페이지 | 필요 |
| InteractionService 찜 | `api.setFavorite(id, on)` | `from('favorite').insert / delete` · 트리거가 saves ±1 | F | 필요 |
| InteractionService 팔로우 | `api.setFollow(writerId, on)` | `from('follow').insert / delete` | F03 | 필요 |
| ReportService | `api.report(type, id, reason)` | `from('report').insert` · 중복 신고는 막힘 | F04 | 필요 |
| UserService | `api.user.signUp / signIn / signOut` | Supabase Auth · 가입 시 트리거가 profiles 생성 | A01, A02 | |

## 추천 규칙 (recommend_recipes)
- **일치율 = 일치한 주재료 수 ÷ 레시피 주재료 수 × 100** (양념 `is_seasoning = true` 제외, 반올림)
- 일치 0개 레시피, `exclude_ids` 재료가 들어간 레시피는 뺌
- 정렬 `rec`: 일치율 → 일치 개수 → 평점 · `time`: 조리 시간 · `rating`: 평점

로컬 PostgreSQL에서 seed 데이터로 확인한 결과 (보유: 감자·계란·양파):
감자계란볶음 75% → 감자조림 67% → 계란찜·감자전·두부부침 50%

## 재료 검색 규칙 (search_ingredients)
표준 이름과 별칭을 같이 찾고 `완전 일치 > 이름 앞부분 > 별칭 앞부분 > 이름 포함 > 별칭 포함` 순으로 정렬.
`'파'` → 대파(별칭 일치, matched_alias = 파), 양파(이름 포함)
