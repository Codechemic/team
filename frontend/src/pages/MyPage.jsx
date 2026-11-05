import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store.jsx';
import { api } from '../api/index.js';
import RecipeCard from '../components/RecipeCard.jsx';
import { findFridge } from '../data/fridges.js';
import { FridgeI, PlusI, SearchI, UserI } from '../components/Icons.jsx';

// 4 마이페이지
export default function MyPage() {
  const nav = useNavigate();
  const { user, favorites, following, recent, removeRecent, toast, fridge } = useApp();
  const myFridge = findFridge(fridge);
  const [profile, setProfile] = useState(null);
  const [mine, setMine] = useState([]);
  const [open, setOpen] = useState('');
  useEffect(() => { api.myRecipes().then(setMine); if (user) api.user.profile().then(setProfile).catch(() => {}); else setProfile(null); }, [user]);
  return (
    <>
      <header className="top"><h1 style={{ paddingLeft: 4 }}>마이페이지</h1></header>
      <main className="page">
        <div className="profile">
          <div className="avatar">🧑‍🍳</div>
          {api.usingSupabase && !user ? (
            <div><b>로그인이 필요해요</b><div className="muted small">찜 · 레시피 등록 · 팔로우는 로그인 후 사용할 수 있어요</div></div>
          ) : (
            <div><b>{profile?.nickname || '체험 사용자'}</b><div className="muted small">{profile?.email || '로그인 없이 체험 중'}</div></div>
          )}
        </div>
        {api.usingSupabase && !user && <button className="btn" onClick={() => nav('/login')}>로그인 · 회원가입</button>}
        <div className="stats"><div><b>{mine.length}</b><span>내 레시피</span></div><div><b>{following.length}</b><span>팔로잉</span></div><button onClick={() => nav('/favorites')}><b>{favorites.length}</b><span>찜</span></button></div>
        <p className="tile-cap">내 활동과 설정을 한 번에 관리하세요</p>
        <div className="tiles">
          <button className={`tile${open === 'mine' ? ' on' : ''}`} onClick={() => setOpen(open === 'mine' ? '' : 'mine')}><PlusI /><b>내 레시피</b><span>등록한 레시피 {mine.length}개</span></button>
          <button className={`tile${open === 'recent' ? ' on' : ''}`} onClick={() => setOpen(open === 'recent' ? '' : 'recent')}><SearchI /><b>최근 검색어</b><span>{recent.length ? `재료 ${recent.length}개` : '아직 없어요'}</span></button>
          <button className="tile" onClick={() => nav('/settings')}><FridgeI /><b>냉장고 설정</b><span>{myFridge ? `${myFridge.brand} · ${myFridge.size}` : '모델 선택하기'}</span></button>
          <button className="tile" onClick={() => (api.usingSupabase && !user ? nav('/login') : nav('/account'))}><UserI /><b>계정 설정</b><span>닉네임·비밀번호</span></button>
        </div>
        {open === 'mine' && (mine.length ? mine.map((r) => <RecipeCard key={r.recipeId} r={r} />) : <div className="empty">아직 등록한 레시피가 없어요</div>)}
        {open === 'recent' && (
          <div className="sec">
            <div className="chips">{recent.map((id) => <span key={id} className="chip">{api.ingredient(id).name}</span>)}</div>
            {recent.length > 0 && <button className="link" onClick={() => removeRecent(null)}>최근 검색어 전체 삭제</button>}
          </div>
        )}
      </main>
    </>
  );
}
