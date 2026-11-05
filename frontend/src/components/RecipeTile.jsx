import { useNavigate } from 'react-router-dom';
import { useApp } from '../store.jsx';
import { FoodPic } from './Pic.jsx';
import { HeartI } from './Icons.jsx';

// 2칸 그리드용 레시피 타일 (검색 화면)
export default function RecipeTile({ r }) {
  const nav = useNavigate();
  const { favorites, toggleFavorite } = useApp();
  const on = favorites.includes(r.recipeId);
  return (
    <div className="rtile-wrap">
      <button className="tile rtile" onClick={() => nav(`/recipes/${r.recipeId}`)}>
        <FoodPic r={r} size="md" />
        <b>{r.title}</b>
        <span>{r.cookingTime}분 · {r.difficulty} · <em className="star">★ {Number(r.averageRating).toFixed(1)}</em></span>
        {r.matchReason && <span className="reason">{r.matchReason}</span>}
      </button>
      <button className={`heart${on ? ' on' : ''}`} onClick={() => toggleFavorite(r.recipeId)} aria-label={on ? '찜 해제' : '찜하기'}><HeartI filled={on} /></button>
    </div>
  );
}
