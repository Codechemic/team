// 재료·음식 3D 일러스트 (Microsoft Fluent Emoji 3D, MIT 라이선스) — public/img 에 포함
// 이름이 목록에 있으면 이미지, 없으면 DB의 이모지로 표시
const ING = new Set(["간장", "감자", "계란", "고구마", "고추장", "고춧가루", "굴소스", "김치", "다시마", "닭고기", "당근", "대파", "돼지고기", "된장", "두부", "마늘", "맛술", "물", "밥", "버터", "부침가루", "새우", "새우젓", "설탕", "소고기", "소금", "식용유", "애호박", "양파", "연어", "오징어", "올리고당", "참기름", "치즈", "토마토", "통깨", "후추"]);
const FOOD = new Set(["감자계란볶음", "감자전", "감자조림", "계란찜", "김치볶음밥", "된장찌개", "두부부침", "연어덮밥", "오징어볶음", "제육볶음", "치즈계란말이", "토마토달걀볶음"]);
export const ingSrc = (name) => (ING.has(name) ? `/img/ing/${encodeURIComponent(name)}.webp` : null);
export const foodSrc = (title) => (FOOD.has(title) ? `/img/food/${encodeURIComponent(title)}.webp` : null);
export const DEFAULT_FOOD = '/img/food/_default.webp';
