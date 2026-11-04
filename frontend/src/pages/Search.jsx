import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store.jsx';
import { api } from '../api/index.js';
import Header from '../components/Header.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import { SearchI } from '../components/Icons.jsx';

const CATS = ['전체', '채소', '육류', '수산물', '기타'];

// 1-② 재료 검색 (표준 재료 + 별칭 검색, 띄어쓰기로 여러 재료 한 번에 입력)
export default function Search() {
  const nav = useNavigate();
  const { selected, setSelected, toggleSelected, toast } = useApp();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('전체');
  const [list, setList] = useState([]);
  const multi = q.trim().split(/\s+/).filter(Boolean).length > 1;

  useEffect(() => {
    let alive = true;
    if (!multi) api.searchIngredients(q, q.trim() ? '' : cat).then((r) => alive && setList(r));
    return () => { alive = false; };
  }, [q, cat, multi]);

  const onEnter = async (e) => {
    if (e.key !== 'Enter' || e.nativeEvent.isComposing) return;
    const words = q.trim().split(/\s+/).filter(Boolean);
    if (!words.length) return;
    const added = [], miss = [];
    for (const w of words) {
      const [top] = await api.searchIngredients(w, '');
      const exact = top && (top.name === w || top.matchedAlias === w || words.length === 1);
      if (exact) added.push(top); else miss.push(w);
    }
    setSelected((s) => [...s, ...added.map((a) => a.id).filter((id) => !s.includes(id))]);
    setQ('');
    toast(miss.length ? `${miss.join(', ')}: 등록되지 않은 재료예요` : `${added.map((a) => a.name).join(', ')} 추가했어요`);
  };

  return (
    <>
      <Header title="재료 검색" />
      <main className="page">
        <label className="search"><SearchI /><input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onEnter} placeholder="예: 감자 계란 파" autoFocus /></label>
        {multi ? (
          <div className="notice">띄어쓰기로 여러 재료를 한 번에 넣을 수 있어요. <b>Enter</b>를 누르면 추가돼요.</div>
        ) : (
          <>
            {!q.trim() && (
              <div className="tabs-cat" role="tablist">
                {CATS.map((c) => <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}>{c}</button>)}
              </div>
            )}
            {list.length ? (
              <div className="list">
                {list.map((i) => { const on = selected.includes(i.id); return (
                  <div key={i.id} className="irow">
                    <div className="ico">{i.emoji}</div>
                    <div className="nm">{i.matchedAlias && <small>{i.matchedAlias} →</small>}<b>{i.name}</b>{!i.matchedAlias && <small>{i.category}</small>}</div>
                    <button className={`plus${on ? ' on' : ''}`} onClick={() => toggleSelected(i.id)} aria-label={`${i.name} ${on ? '빼기' : '추가'}`}>{on ? '✓' : '+'}</button>
                  </div>
                ); })}
              </div>
            ) : <div className="notice warn">'{q}'은(는) 등록되지 않은 재료예요. 다른 이름으로 검색해 보세요.</div>}
          </>
        )}
        <div className="sticky-cta"><PrimaryButton onClick={() => nav('/selected')}>선택 완료 · {selected.length}개</PrimaryButton></div>
      </main>
    </>
  );
}
