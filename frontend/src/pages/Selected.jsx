import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store.jsx';
import { api } from '../api/index.js';
import Header from '../components/Header.jsx';
import IngredientChip from '../components/IngredientChip.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import { SearchI } from '../components/Icons.jsx';

// 1-③ 재료 선택 완료
export default function Selected() {
  const nav = useNavigate();
  const { selected, toggleSelected, recent, addRecent } = useApp();
  const [hint, setHint] = useState('');
  const go = () => { if (!selected.length) return setHint('재료를 1개 이상 선택해 주세요'); addRecent(selected); nav('/results'); };
  return (
    <>
      <Header title="냉장고를 부탁해" />
      <main className="page">
        <button className="search" onClick={() => nav('/search')}><SearchI /><span>어떤 재료가 있나요?</span></button>
        <section className="sec">
          <div className="sec-h"><h2>선택한 재료 ({selected.length})</h2></div>
          {selected.length ? (
            <div className="chips">{selected.map((id) => <IngredientChip key={id} label={api.ingredient(id).name} selected onRemove={() => toggleSelected(id)} />)}</div>
          ) : <div className="empty">재료를 검색해서 골라 주세요</div>}
        </section>
        <section className="sec">
          <div className="sec-h"><h2>최근 검색어</h2></div>
          <div className="chips">{recent.map((id) => <IngredientChip key={id} label={api.ingredient(id).name} selected={selected.includes(id)} onClick={() => toggleSelected(id)} />)}</div>
        </section>
        {hint && <p className="hint">{hint}</p>}
        <PrimaryButton onClick={go}>요리 추천받기</PrimaryButton>
      </main>
    </>
  );
}
