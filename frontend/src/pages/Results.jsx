import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store.jsx';
import { api } from '../api/index.js';
import Header from '../components/Header.jsx';
import RecipeCard from '../components/RecipeCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';

// 1-④ 추천 요리 목록 (일치율 = 일치 주재료 ÷ 레시피 주재료, 양념 제외)
export default function Results() {
  const nav = useNavigate();
  const { selected } = useApp();
  const [sort, setSort] = useState('rec');
  const [list, setList] = useState(null);
  useEffect(() => { api.recommend(selected, sort).then(setList); }, [selected, sort]);
  const right = (
    <select className="sortsel" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="정렬">
      <option value="rec">추천순</option><option value="time">조리시간순</option><option value="rating">평점순</option>
    </select>
  );
  return (
    <>
      <Header title="추천 요리" right={right} />
      <main className="page">
        {list === null ? <div className="empty">불러오는 중…</div> : (
          <>
            <div className="sec-h"><h2>추천 요리 ({list.length})</h2><span className="muted small">양념 제외 일치율</span></div>
            {list.length ? list.map((r) => <RecipeCard key={r.recipeId} r={r} />) : (
              <>
                <div className="empty">만들 수 있는 요리를 찾지 못했어요.<br />재료를 더 추가해 보세요.</div>
                <PrimaryButton ghost onClick={() => nav('/search')}>재료 추가하기</PrimaryButton>
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}
