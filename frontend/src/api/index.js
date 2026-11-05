// 화면은 이 파일의 api 객체만 호출합니다.
// 구조는 클래스 다이어그램의 서비스와 같게 나눴습니다:
//   IngredientService · RecipeService · InteractionService · ReportService · UserService
// Supabase 설정(.env)이 없으면 mock 데이터로 동작합니다.
import { supabase, USE_SUPABASE } from '../lib/supabase.js';
import { mock } from './mock.js';
import { INGREDIENTS } from './mockData.js';

const sb = supabase;
const must = ({ data, error }) => { if (error) throw new Error(friendly(error)); return data; };
function friendly(e) {
  if (e.code === '23505') return '이미 처리된 요청이에요';
  if (e.code === '42501' || /row-level security/.test(e.message)) return '권한이 없어요. 로그인했는지 확인해 주세요';
  return e.message || '요청에 실패했어요';
}
const toCard = (r) => ({
  recipeId: r.recipe_id, title: r.title, emoji: r.emoji, mainPhoto: r.main_photo, cookingTime: r.cooking_time,
  difficulty: r.difficulty, averageRating: Number(r.average_rating), writer: r.profiles?.nickname,
});

// 재료 이름·이모지 표시용 캐시 (앱 시작 때 한 번 불러옴)
let ingredientCache = Object.fromEntries(INGREDIENTS.map((i) => [i.id, i]));

/* ---------------- IngredientService ---------------- */
const IngredientService = {
  async preload() {
    if (!USE_SUPABASE) return;
    const rows = must(await sb.from('ingredient').select('ingredient_id, name, category, emoji, is_seasoning'));
    ingredientCache = Object.fromEntries(rows.map((r) => [r.ingredient_id, { id: r.ingredient_id, name: r.name, category: r.category, emoji: r.emoji, isSeasoning: r.is_seasoning }]));
  },
  ingredient: (id) => ingredientCache[id] || { id, name: '알 수 없는 재료', emoji: '❔' },
  async searchIngredients(q, category) {
    if (!USE_SUPABASE) return mock.searchIngredients(q, category);
    const rows = must(await sb.rpc('search_ingredients', { q: q || '', cat: category || '' }));
    return rows.map((r) => ({ id: r.id, name: r.name, category: r.category, emoji: r.emoji, matchedAlias: r.matched_alias }));
  },
};

/* ---------------- RecipeService ---------------- */
const RecipeService = {
  async recommend(ingredientIds, sort = 'rec') {
    if (!USE_SUPABASE) return mock.recommend(ingredientIds, sort);
    const rows = must(await sb.rpc('recommend_recipes', { ingredient_ids: ingredientIds, sort }));
    return rows.map((r) => ({ ...toCard(r), matchRate: r.match_rate, matchedCount: r.matched_count, missing: r.missing }));
  },
  // 레시피 검색: 이름 일치 + 재료(별칭 포함) 일치
  async searchRecipes(q) {
    if (!USE_SUPABASE) return mock.searchRecipes(q);
    const k = q.trim();
    const sel = 'recipe_id, title, emoji, main_photo, cooking_time, difficulty, average_rating, views, profiles(nickname), recipe_ingredient(ingredient_id, ingredient(name, is_seasoning))';
    // 재료는 이름·별칭이 검색어로 시작하는 것만 (예: '파' → 대파 O, 양파 X)
    const kk = k.replace(/\s+/g, '');
    const ings = (await IngredientService.searchIngredients(kk, '')).filter((i) => i.name.startsWith(kk) || i.matchedAlias?.startsWith(kk)).slice(0, 5);
    const ingIds = ings.map((i) => i.id);
    const [byName, byIngRows] = await Promise.all([
      sb.from('recipe').select(sel).ilike('title', `%${k.replace(/[%_]/g, '')}%`).limit(30).then(must),
      ingIds.length ? sb.from('recipe_ingredient').select('recipe_id').in('ingredient_id', ingIds).limit(200).then(must) : [],
    ]);
    const nameIds = new Set(byName.map((r) => r.recipe_id));
    const extraIds = [...new Set(byIngRows.map((r) => r.recipe_id))].filter((id) => !nameIds.has(id));
    const byIng = extraIds.length ? must(await sb.from('recipe').select(sel).in('recipe_id', extraIds)) : [];
    const names = Object.fromEntries(ings.map((i) => [i.id, i.name]));
    const toResult = (r, nameHit) => ({
      ...toCard(r), views: r.views,
      ingredientNames: r.recipe_ingredient.filter((x) => !x.ingredient.is_seasoning).map((x) => x.ingredient.name),
      matchReason: nameHit ? '이름 일치' : `재료 포함: ${r.recipe_ingredient.filter((x) => names[x.ingredient_id]).map((x) => x.ingredient.name).join(', ')}`,
      rank: nameHit ? 0 : 1,
    });
    return [...byName.map((r) => toResult(r, true)), ...byIng.map((r) => toResult(r, false))]
      .sort((a, b) => a.rank - b.rank || b.averageRating - a.averageRating || b.views - a.views);
  },
  async popularRecipes() {
    if (!USE_SUPABASE) return mock.popularRecipes();
    const rows = must(await sb.from('recipe')
      .select('recipe_id, title, emoji, main_photo, cooking_time, difficulty, average_rating, views, profiles(nickname), recipe_ingredient(ingredient_id, ingredient(name, is_seasoning))')
      .order('views', { ascending: false }).limit(6));
    return rows.map((r) => ({ ...toCard(r), ingredientNames: r.recipe_ingredient.filter((x) => !x.ingredient.is_seasoning).map((x) => x.ingredient.name) }));
  },
  async getRecipe(id) {
    if (!USE_SUPABASE) return mock.getRecipe(id);
    return must(await sb.rpc('get_recipe', { p_recipe_id: Number(id) }));
  },
  async getRecipes(ids) {
    if (!USE_SUPABASE) return mock.getRecipes(ids);
    if (!ids.length) return [];
    const rows = must(await sb.from('recipe').select('*, profiles(nickname)').in('recipe_id', ids));
    return ids.map((id) => rows.find((r) => r.recipe_id === id)).filter(Boolean).map(toCard);
  },
  async myRecipes() {
    if (!USE_SUPABASE) return mock.myRecipes();
    const user = await UserService.currentUser();
    if (!user) return [];
    const rows = must(await sb.from('recipe').select('*, profiles(nickname)').eq('writer_id', user.id).order('created_at', { ascending: false }));
    return rows.map(toCard);
  },
  async uploadPhoto(dataUrl) {
    const user = await UserService.currentUser();
    const blob = await (await fetch(dataUrl)).blob();
    const path = `${user.id}/${Date.now()}.${(blob.type.split('/')[1] || 'jpg').replace('jpeg', 'jpg')}`;
    must(await sb.storage.from('recipe-photos').upload(path, blob, { contentType: blob.type }));
    return sb.storage.from('recipe-photos').getPublicUrl(path).data.publicUrl;
  },
  async createRecipe(body) {
    if (!USE_SUPABASE) return mock.createRecipe(body);
    const mainPhoto = body.mainPhoto?.startsWith('data:') ? await RecipeService.uploadPhoto(body.mainPhoto) : body.mainPhoto;
    const recipeId = must(await sb.rpc('create_recipe', { payload: { ...body, mainPhoto } }));
    return { recipeId };
  },
};

/* ---------------- InteractionService (찜 · 팔로우) ---------------- */
const InteractionService = {
  async favoriteIds() {
    const user = await UserService.currentUser();
    if (!USE_SUPABASE || !user) return null;
    return must(await sb.from('favorite').select('recipe_id').order('created_at', { ascending: false })).map((r) => r.recipe_id);
  },
  async setFavorite(recipeId, on) {
    if (!USE_SUPABASE) return;
    const user = await UserService.currentUser();
    if (!user) throw new Error('로그인하면 찜할 수 있어요');
    if (on) must(await sb.from('favorite').insert({ user_id: user.id, recipe_id: recipeId }));
    else must(await sb.from('favorite').delete().eq('user_id', user.id).eq('recipe_id', recipeId));
  },
  async setFollow(writerId, on) {
    if (!USE_SUPABASE || !writerId) return;
    const user = await UserService.currentUser();
    if (!user) throw new Error('로그인하면 팔로우할 수 있어요');
    if (on) must(await sb.from('follow').insert({ follower_id: user.id, following_id: writerId }));
    else must(await sb.from('follow').delete().eq('follower_id', user.id).eq('following_id', writerId));
  },
};

/* ---------------- ReportService ---------------- */
const ReportService = {
  async report(targetType, targetId, reason) {
    if (!USE_SUPABASE) return mock.report();
    const user = await UserService.currentUser();
    if (!user) throw new Error('로그인하면 신고할 수 있어요');
    const { error } = await sb.from('report').insert({ reporter_id: user.id, target_type: targetType, target_id: targetId, reason });
    if (error?.code === '23505') throw new Error('이미 신고한 게시물이에요');
    if (error) throw new Error(friendly(error));
    return { status: '대기' };
  },
};

/* ---------------- RecentSearchService (UC-B03 최근 검색어) ---------------- */
// 로그인 상태면 recent_search 테이블에 재료 ID로 저장, 아니면 이 기기에만 저장(store.jsx)
const RECENT_MAX = 8;
const RecentSearchService = {
  async recentIds() {
    const user = await UserService.currentUser();
    if (!USE_SUPABASE || !user) return null;
    const rows = must(await sb.from('recent_search').select('ingredient_id').order('searched_at', { ascending: false }).limit(40));
    return [...new Set(rows.map((r) => r.ingredient_id))].slice(0, RECENT_MAX);
  },
  async addRecent(ids) {
    const user = await UserService.currentUser();
    if (!USE_SUPABASE || !user || !ids.length) return;
    must(await sb.from('recent_search').delete().eq('user_id', user.id).in('ingredient_id', ids));   // 같은 재료는 최신 1개만
    must(await sb.from('recent_search').insert(ids.map((id) => ({ user_id: user.id, ingredient_id: id }))));
  },
  async removeRecent(id) {
    const user = await UserService.currentUser();
    if (!USE_SUPABASE || !user) return;
    let q = sb.from('recent_search').delete().eq('user_id', user.id);
    if (id != null) q = q.eq('ingredient_id', id);   // id 없으면 전체 삭제
    must(await q);
  },
};

/* ---------------- UserService (Supabase Auth) ---------------- */
const UserService = {
  async currentUser() {
    if (!USE_SUPABASE) return null;
    return (await sb.auth.getSession()).data.session?.user ?? null;
  },
  async profile() {
    const user = await UserService.currentUser();
    if (!user) return null;
    return must(await sb.from('profiles').select('id, nickname, email').eq('id', user.id).single());
  },
  onAuthChange(cb) {
    if (!USE_SUPABASE) return () => {};
    const { data } = sb.auth.onAuthStateChange((_e, session) => cb(session?.user ?? null));
    return () => data.subscription.unsubscribe();
  },
  async signUp({ email, password, nickname }) {
    const { data, error } = await sb.auth.signUp({ email, password, options: { data: { nickname } } });
    if (error) throw new Error(/registered/.test(error.message) ? '이미 가입된 이메일이에요' : error.message);
    return data;
  },
  async signIn({ email, password }) {
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw new Error('이메일 또는 비밀번호가 맞지 않아요');
  },
  async signOut() { await sb.auth.signOut(); },
  // 계정 설정
  async updateNickname(nickname) {
    const n = nickname.trim();
    if (n.length < 2 || n.length > 12) throw new Error('닉네임은 2~12자로 정해 주세요');
    const user = await UserService.currentUser();
    if (!user) throw new Error('로그인이 필요해요');
    const { error } = await sb.from('profiles').update({ nickname: n }).eq('id', user.id);
    if (error?.code === '23505') throw new Error('이미 사용 중인 닉네임이에요');
    if (error) throw new Error(friendly(error));
    return n;
  },
  async changePassword(current, next) {
    if (next.length < 6) throw new Error('새 비밀번호는 6자 이상이어야 해요');
    const user = await UserService.currentUser();
    if (!user) throw new Error('로그인이 필요해요');
    const { error: e1 } = await sb.auth.signInWithPassword({ email: user.email, password: current });
    if (e1) throw new Error('현재 비밀번호가 맞지 않아요');
    const { error } = await sb.auth.updateUser({ password: next });
    if (error) throw new Error(/different/.test(error.message) ? '지금과 다른 비밀번호를 입력해 주세요' : error.message);
  },
  async deleteAccount() {
    must(await sb.rpc('delete_my_account'));
    await sb.auth.signOut();
  },
};

/* ---------------- PreferenceService (설정 > 내 냉장고) ---------------- */
const PreferenceService = {
  async fridgeModel() {
    const user = await UserService.currentUser();
    if (!USE_SUPABASE || !user) return undefined;
    const { data, error } = await sb.from('user_preference').select('fridge_model').eq('user_id', user.id).maybeSingle();
    if (error) return undefined;   // 05 SQL 실행 전이면 이 기기 값만 사용
    return data?.fridge_model ?? null;
  },
  async saveFridgeModel(model) {
    const user = await UserService.currentUser();
    if (!USE_SUPABASE || !user) return;
    await sb.from('user_preference').upsert({ user_id: user.id, fridge_model: model, updated_at: new Date().toISOString() });
  },
};

export const api = {
  ...IngredientService, ...RecipeService, ...InteractionService, ...ReportService, ...RecentSearchService, ...PreferenceService,
  user: UserService, usingSupabase: USE_SUPABASE,
};
