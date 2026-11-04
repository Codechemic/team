import { useEffect, useState } from 'react';
import { useApp } from '../store.jsx';
import { api } from '../api/index.js';
import RecipeCard from '../components/RecipeCard.jsx';

// 3 찜 목록
export default function Favorites() {
  const { favorites } = useApp();
  const [list, setList] = useState([]);
  useEffect(() => { api.getRecipes(favorites).then(setList); }, [favorites]);
  return (
    <>
      <header className="top"><h1 style={{ paddingLeft: 4 }}>찜 목록</h1></header>
      <main className="page">
        <div className="sec-h"><h2>찜한 레시피 ({list.length})</h2></div>
        {list.length ? list.map((r) => <RecipeCard key={r.recipeId} r={r} />) : <div className="empty">마음에 드는 레시피에 하트를 눌러 보세요</div>}
      </main>
    </>
  );
}
