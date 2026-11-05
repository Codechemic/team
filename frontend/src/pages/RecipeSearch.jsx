import { useEffect, useState } from 'react';
import { api } from '../api/index.js';
import RecipeCard from '../components/RecipeCard.jsx';
import { SearchI } from '../components/Icons.jsx';

// 레시피 검색: 요리 이름 또는 들어간 재료(별칭 포함)로 찾기
// 예) '김치볶음밥' → 이름 일치, '감자' · '파' → 그 재료가 들어간 레시피
export default function RecipeSearch() {
  const [q, setQ] = useState('');
  const [list, setList] = useState(null);
  const [popular, setPopular] = useState([]);

  useEffect(() => { api.popularRecipes().then(setPopular).catch(() => {}); }, []);
  useEffect(() => {
    let alive = true;
    const k = q.trim();
    if (!k) { setList(null); return; }
    const t = setTimeout(() => api.searchRecipes(k).then((r) => alive && setList(r)).catch(() => alive && setList([])), 200);
    return () => { alive = false; clearTimeout(t); };
  }, [q]);

  return (
    <>
      <label className="search"><SearchI /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="요리 이름이나 재료 (예: 김치볶음밥, 감자)" autoFocus /></label>
      {list === null ? (
        <section className="sec">
          <div className="sec-h"><h2>많이 본 레시피</h2></div>
          {popular.map((r) => <RecipeCard key={r.recipeId} r={r} />)}
        </section>
      ) : list.length ? (
        <section className="sec">
          <div className="sec-h"><h2>검색 결과 <span className="count">{list.length}</span></h2></div>
          {list.map((r) => <RecipeCard key={r.recipeId} r={r} />)}
        </section>
      ) : (
        <div className="empty">'{q.trim()}'에 맞는 레시피가 없어요.<br />다른 요리 이름이나 재료로 검색해 보세요.</div>
      )}
    </>
  );
}
