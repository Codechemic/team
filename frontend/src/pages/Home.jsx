import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store.jsx';
import { api } from '../api/index.js';
import IngredientChip from '../components/IngredientChip.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import { HatI, SearchI } from '../components/Icons.jsx';

// 1-① 홈 화면
export default function Home() {
  const nav = useNavigate();
  const { selected, toggleSelected, setSelected, recent, removeRecent, addRecent } = useApp();
  const [hint, setHint] = useState('');
  const recommend = () => {
    if (!selected.length) return setHint('재료를 1개 이상 선택해 주세요');
    addRecent(selected); nav('/results');
  };
  return (
    <main className="page">
      <div className="brand brand-home"><span className="hat"><HatI /></span><b>냉장고를 부탁해</b><p>냉장고 속 재료로 맛있는 요리를 찾아보세요!</p></div>
      <button className="search search-home" onClick={() => nav('/search')}><SearchI /><span>어떤 재료가 있나요?</span></button>
      <section className="sec">
        <div className="sec-h"><h2>최근 검색어</h2>{recent.length > 0 && <button className="link" onClick={() => removeRecent(null)}>전체 삭제</button>}</div>
        {recent.length ? (
          <div className="chips">{recent.map((id) => <IngredientChip key={id} label={api.ingredient(id).name} selected={selected.includes(id)} onClick={() => toggleSelected(id)} />)}</div>
        ) : <div className="empty">아직 검색한 재료가 없어요</div>}
      </section>
      <section className="sec">
        <div className="sec-h"><h2>내 냉장고 <span className="muted small">{selected.length}개</span></h2>{selected.length > 0 && <button className="link" onClick={() => setSelected([])}>모두 지우기</button>}</div>
        <div className="fridge">
          {selected.map((id) => { const i = api.ingredient(id); return (
            <div key={id} className="fitem"><div className="ico">{i.emoji}</div>{i.name}<button className="rm" onClick={() => toggleSelected(id)} aria-label={`${i.name} 빼기`}>×</button></div>
          ); })}
          <button className="fitem add" onClick={() => nav('/search')}><div className="ico">+</div>추가</button>
        </div>
      </section>
      {hint && <p className="hint">{hint}</p>}
      <PrimaryButton onClick={recommend}>요리 추천받기</PrimaryButton>
    </main>
  );
}
