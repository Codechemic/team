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
};

export const api = {
  ...IngredientService, ...RecipeService, ...InteractionService, ...ReportService,
  user: UserService, usingSupabase: USE_SUPABASE,
};
