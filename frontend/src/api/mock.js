// 서버 없이 화면을 개발할 때 쓰는 가짜 API. 실제 서버도 같은 규칙으로 동작해야 합니다 (docs/API.md).
import { INGREDIENTS, RECIPES } from './mockData.js';

const wait = (v) => new Promise((r) => setTimeout(() => r(structuredClone(v)), 120));
const byId = Object.fromEntries(INGREDIENTS.map((i) => [i.id, i]));
const myRecipes = () => { try { return JSON.parse(localStorage.getItem('fridge_myRecipes') || '[]'); } catch { return []; } };
const allRecipes = () => [...myRecipes(), ...RECIPES];

// 재료 검색: 표준명·별칭 모두 검색. 정렬 = 완전 일치 > 이름 앞부분 > 별칭 앞부분 > 포함
export function searchIngredientsSync(q, category) {
  const k = (q || '').trim().replace(/\s+/g, '');
  const pool = INGREDIENTS.filter((i) => !i.isSeasoning && (!category || category === '전체' || i.category === category));
  if (!k) return pool.map((i) => ({ ...i, matchedAlias: null }));
  const out = [];
  for (const i of pool) {
    let score = -1, alias = null;
    if (i.name === k) score = 0;
    else if (i.aliases.includes(k)) { score = 0; alias = k; }
    else if (i.name.startsWith(k)) score = 2;
    else { const a = i.aliases.find((x) => x.startsWith(k)); if (a) { score = 3; alias = a; } }
    if (score < 0 && i.name.includes(k)) score = 4;
    if (score < 0) { const a = i.aliases.find((x) => x.includes(k)); if (a) { score = 5; alias = a; } }
    if (score >= 0) out.push({ ...i, matchedAlias: alias, score });
  }
  return out.sort((a, b) => a.score - b.score || a.name.length - b.name.length);
}

// 추천: 일치율 = 일치한 주재료 ÷ 레시피 주재료 (양념 제외)
function recommendSync(ingredientIds, sort = 'rec') {
  const have = new Set(ingredientIds);
  const list = allRecipes().map((r) => {
    const main = r.ingredients.filter((x) => !byId[x.ingredientId]?.isSeasoning);
    const matched = main.filter((x) => have.has(x.ingredientId));
    const missing = main.filter((x) => !have.has(x.ingredientId)).map((x) => byId[x.ingredientId].name);
    return {
      recipeId: r.id, title: r.title, emoji: r.emoji, mainPhoto: r.mainPhoto || null, cookingTime: r.cookingTime,
      difficulty: r.difficulty, averageRating: r.averageRating,
      matchRate: main.length ? Math.round((matched.length / main.length) * 100) : 0, matchedCount: matched.length, missing,
    };
  }).filter((x) => x.matchedCount > 0);
  const cmp = {
    rec: (a, b) => b.matchRate - a.matchRate || b.matchedCount - a.matchedCount || b.averageRating - a.averageRating,
    time: (a, b) => a.cookingTime - b.cookingTime || b.matchRate - a.matchRate,
    rating: (a, b) => b.averageRating - a.averageRating,
  };
  return list.sort(cmp[sort] || cmp.rec);
}

function detail(r) {
  return {
    recipeId: r.id, title: r.title, intro: r.intro, emoji: r.emoji, mainPhoto: r.mainPhoto || null, cookingTime: r.cookingTime,
    difficulty: r.difficulty, servings: r.servings, views: r.views, averageRating: r.averageRating, writer: r.writer,
    ingredients: r.ingredients.map((x) => ({ ...x, name: byId[x.ingredientId].name, emoji: byId[x.ingredientId].emoji, isSeasoning: byId[x.ingredientId].isSeasoning })),
    steps: r.steps,
  };
}

export const mock = {
  ingredient: (id) => byId[id],
  searchIngredients: (q, category) => wait(searchIngredientsSync(q, category)),
  recommend: (ingredientIds, sort) => wait(recommendSync(ingredientIds, sort)),
  getRecipe: (id) => { const r = allRecipes().find((x) => String(x.id) === String(id)); return r ? wait(detail(r)) : Promise.reject(new Error('레시피를 찾을 수 없어요')); },
  getRecipes: (ids) => wait(ids.map((id) => allRecipes().find((x) => x.id === id)).filter(Boolean).map(detail)),
  myRecipes: () => wait(myRecipes().map(detail)),
  createRecipe: (body) => {
    const r = { id: Date.now(), writer: '나', views: 0, averageRating: 0, emoji: '🍽️', ...body };
    localStorage.setItem('fridge_myRecipes', JSON.stringify([r, ...myRecipes()]));
    return wait({ recipeId: r.id });
  },
  report: () => wait({ status: '대기' }),
};
