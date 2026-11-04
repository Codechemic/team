import { useNavigate } from 'react-router-dom';
import { useApp } from '../store.jsx';
import { ClockI, HeartI } from './Icons.jsx';

const rateColor = (p) => (p >= 80 ? 'var(--good)' : p >= 50 ? 'var(--warn)' : 'var(--low)');

// 공통 컴포넌트 ③ 레시피 카드 (추천 목록: 일치도 표시 / 찜·내 레시피: 작성자 표시)
export default function RecipeCard({ r }) {
  const nav = useNavigate();
  const { favorites, toggleFavorite } = useApp();
  const on = favorites.includes(r.recipeId);
  return (
    <div className="rcard-wrap">
      <button className="rcard" onClick={() => nav(`/recipes/${r.recipeId}`)}>
        <div className="thumb">{r.mainPhoto ? <img src={r.mainPhoto} alt="" /> : r.emoji}</div>
        <div className="body">
          <h3>{r.title}</h3>
          <div className="meta">
            <span><ClockI /> {r.cookingTime}분</span>
            <span>{r.difficulty}</span>
            <span>★ {Number(r.averageRating).toFixed(1)}</span>
          </div>
          {r.matchRate !== undefined ? (
            <>
              <div className="rate" style={{ color: rateColor(r.matchRate) }}>재료 일치도 {r.matchRate}%</div>
              <div className="meter"><i style={{ width: `${r.matchRate}%`, background: rateColor(r.matchRate) }} /></div>
              <div className="lack">{r.missing.length ? `부족: ${r.missing.join(', ')}` : '모든 재료가 있어요'}</div>
            </>
          ) : (
            <div className="lack">{r.writer}</div>
          )}
        </div>
      </button>
      <button className={`heart${on ? ' on' : ''}`} onClick={() => toggleFavorite(r.recipeId)} aria-label="찜하기">
        <HeartI filled={on} />
      </button>
    </div>
  );
}
