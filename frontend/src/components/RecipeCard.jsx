import { useNavigate } from 'react-router-dom';
import { useApp } from '../store.jsx';
import { FoodPic } from './Pic.jsx';
import { ClockI, HeartI } from './Icons.jsx';

const rateTone = (p) => (p >= 80 ? 'good' : p >= 50 ? 'warn' : 'low');

// 공통 컴포넌트 ③ 레시피 카드 (추천 목록: 일치도 표시 / 검색: 이유·재료 / 찜·내 레시피: 작성자)
export default function RecipeCard({ r }) {
  const nav = useNavigate();
  const { favorites, toggleFavorite } = useApp();
  const on = favorites.includes(r.recipeId);
  const tone = r.matchRate !== undefined ? rateTone(r.matchRate) : '';
  return (
    <div className="rcard-wrap">
      <button className="rcard" onClick={() => nav(`/recipes/${r.recipeId}`)}>
        <div className="thumb">
          <FoodPic r={r} size="sm" />
          {r.matchRate !== undefined && <span className={`badge ${tone}`}>{r.matchRate}%</span>}
        </div>
        <div className="body">
          <h3>{r.title}</h3>
          <div className="meta">
            <span><ClockI /> {r.cookingTime}분</span>
            <span className={`diff d-${r.difficulty}`}>{r.difficulty}</span>
            <span className="star">★ {Number(r.averageRating).toFixed(1)}</span>
          </div>
          {r.matchRate !== undefined ? (
            <>
              <div className="meter"><i className={tone} style={{ width: `${Math.max(r.matchRate, 4)}%` }} /></div>
              <div className="lack">{r.missing.length ? <>부족 <b>{r.missing.join(', ')}</b></> : <span className="okline">모든 재료가 있어요</span>}</div>
            </>
          ) : r.ingredientNames ? (
            <>
              {r.matchReason && <div className="reason">{r.matchReason}</div>}
              <div className="lack">{r.ingredientNames.join(' · ')}</div>
            </>
          ) : (
            r.writer && <div className="lack">by {r.writer}</div>
          )}
        </div>
      </button>
      <button className={`heart${on ? ' on' : ''}`} onClick={() => toggleFavorite(r.recipeId)} aria-label={on ? '찜 해제' : '찜하기'}>
        <HeartI filled={on} />
      </button>
    </div>
  );
}
