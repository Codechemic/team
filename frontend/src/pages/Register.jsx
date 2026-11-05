import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/index.js';
import { IngPic } from '../components/Pic.jsx';
import { useApp } from '../store.jsx';
import Header from '../components/Header.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import { CamI, CheckI, SearchI } from '../components/Icons.jsx';

const UNITS = ['개', 'g', 'ml', '컵', '공기', '큰술', '장', '대', '모', '마리', '약간'];
const empty = () => ({ mainPhoto: '', title: '', intro: '', cookingTime: 20, difficulty: '쉬움', servings: 2, ingredients: [], steps: ['', ''] });

// 2 레시피 등록: ① 기본 정보 → ② 재료 입력(표준 재료 선택) → ③ 조리 단계 → ④ 완료
export default function Register() {
  const nav = useNavigate();
  const { user } = useApp();
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [f, setF] = useState(empty);
  const [hint, setHint] = useState('');
  const [q, setQ] = useState('');
  const [sugg, setSugg] = useState([]);
  const [savedId, setSavedId] = useState(null);
  const fileRef = useRef();
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));

  useEffect(() => { if (q.trim()) api.searchIngredients(q, '').then((r) => setSugg(r.slice(0, 5))); else setSugg([]); }, [q]);

  const next = async () => {
    setHint('');
    if (step === 1 && !f.title.trim()) return setHint('요리 이름을 입력해 주세요');
    if (step === 2 && !f.ingredients.length) return setHint('재료를 1개 이상 추가해 주세요');
    if (step === 3) {
      const steps = f.steps.map((s) => s.trim()).filter(Boolean);
      if (!steps.length) return setHint('조리 단계를 1개 이상 적어 주세요');
      setBusy(true);
      let recipeId;
      try {
        ({ recipeId } = await api.createRecipe({
        ...f, title: f.title.trim(),
        ingredients: f.ingredients.map(({ ingredientId, quantity, unit }) => ({ ingredientId, quantity: unit === '약간' ? null : quantity, unit })),
        steps: steps.map((d, i) => ({ stepNumber: i + 1, description: d, timerSeconds: null })),
        }));
      } catch (e) { setBusy(false); return setHint(e.message); }
      setBusy(false);
      setSavedId(recipeId);
    }
    setStep((s) => s + 1); window.scrollTo(0, 0);
  };
  const addIng = (i) => {
    if (f.ingredients.some((x) => x.ingredientId === i.id)) setHint('이미 추가한 재료예요. 분량만 수정해 주세요');
    else set('ingredients', [...f.ingredients, { ingredientId: i.id, name: i.name, emoji: i.emoji, quantity: 1, unit: '개' }]);
    setQ('');
  };
  const updIng = (k, key, v) => set('ingredients', f.ingredients.map((x, j) => (j === k ? { ...x, [key]: v } : x)));
  const onPhoto = (e) => { const file = e.target.files[0]; if (!file) return; const rd = new FileReader(); rd.onload = () => set('mainPhoto', rd.result); rd.readAsDataURL(file); };

  const progress = <div className="progress">{[1, 2, 3, 4].map((i) => <i key={i} className={i <= step ? 'on' : ''} />)}</div>;
  const back = step > 1 && step < 4 ? () => setStep((s) => s - 1) : undefined;

  if (api.usingSupabase && !user) {
    return (
      <>
        <Header title="레시피 등록" />
        <main className="page">
          <div className="empty">레시피를 등록하려면 로그인이 필요해요</div>
          <PrimaryButton onClick={() => nav('/login')}>로그인하기</PrimaryButton>
        </main>
      </>
    );
  }

  return (
    <>
      <Header title="레시피 등록" onBack={back} />
      <main className="page">
        {step < 4 && progress}
        {step === 1 && (
          <>
            <h2 className="step-title">1. 기본 정보</h2>
            <button className="photo" onClick={() => fileRef.current.click()}>
              {f.mainPhoto ? <img src={f.mainPhoto} alt="대표 사진" /> : <span><CamI /><br />대표 사진 추가 (선택)</span>}
            </button>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPhoto} />
            <div className="field"><label htmlFor="title">요리 이름</label><input id="title" value={f.title} onChange={(e) => set('title', e.target.value)} placeholder="예: 감자계란볶음" /></div>
            <div className="field"><label htmlFor="intro">한 줄 소개</label><input id="intro" value={f.intro} onChange={(e) => set('intro', e.target.value)} placeholder="예: 냉장고에 있는 재료로 간단하게!" /></div>
            <div className="two">
              <div className="field"><label htmlFor="time">조리 시간(분)</label><input id="time" type="number" min="1" value={f.cookingTime} onChange={(e) => set('cookingTime', Math.max(1, +e.target.value || 1))} /></div>
              <div className="field"><label htmlFor="diff">난이도</label><select id="diff" value={f.difficulty} onChange={(e) => set('difficulty', e.target.value)}>{['쉬움', '보통', '어려움'].map((d) => <option key={d}>{d}</option>)}</select></div>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="step-title">2. 재료 입력 ({f.servings}인분)</h2>
            <div className="notice small">재료는 표준 재료 목록에서 골라야 추천에 연결돼요. '파'를 검색하면 '대파'로 등록돼요.</div>
            <label className="search"><SearchI /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="재료 이름 검색" /></label>
            {q.trim() && (sugg.length ? (
              <div className="sugg">{sugg.map((i) => <button key={i.id} onClick={() => addIng(i)}><IngPic name={i.name} emoji={i.emoji} className="e" /><span>{i.matchedAlias && `${i.matchedAlias} → `}<b>{i.name}</b></span></button>)}</div>
            ) : <div className="notice warn">등록되지 않은 재료예요. 관리자에게 추가를 요청할 수 있어요.</div>)}
            {f.ingredients.length ? f.ingredients.map((x, k) => (
              <div key={x.ingredientId} className="ing">
                <IngPic name={x.name} emoji={x.emoji} className="e" /><span className="n">{x.name}</span>
                <span className="qty">
                  <input type="number" min="0" step="0.5" value={x.quantity} onChange={(e) => updIng(k, 'quantity', +e.target.value)} aria-label={`${x.name} 분량`} />
                  <select value={x.unit} onChange={(e) => updIng(k, 'unit', e.target.value)} aria-label="단위">{UNITS.map((u) => <option key={u}>{u}</option>)}</select>
                </span>
                <button className="del" onClick={() => set('ingredients', f.ingredients.filter((_, j) => j !== k))} aria-label="삭제">×</button>
              </div>
            )) : <div className="empty">재료를 검색해서 추가해 주세요</div>}
          </>
        )}
        {step === 3 && (
          <>
            <h2 className="step-title">3. 조리 방법 입력</h2>
            {f.steps.map((s, k) => (
              <div key={k} className="stepedit">
                <span className="num">{k + 1}</span>
                <textarea value={s} onChange={(e) => set('steps', f.steps.map((x, j) => (j === k ? e.target.value : x)))} placeholder={`${k + 1}단계 설명을 적어 주세요`} aria-label={`${k + 1}단계`} />
                <button className="del" onClick={() => f.steps.length > 1 && set('steps', f.steps.filter((_, j) => j !== k))} aria-label="삭제">×</button>
              </div>
            ))}
            <PrimaryButton ghost onClick={() => set('steps', [...f.steps, ''])}>+ 단계 추가</PrimaryButton>
          </>
        )}
        {step === 4 ? (
          <>
            <div className="done-wrap"><div className="ok"><CheckI /></div><h2>레시피가 등록되었어요!</h2><p className="muted">다른 사용자들과 맛있는 레시피를 공유해 주세요.</p></div>
            <PrimaryButton onClick={() => nav(`/recipes/${savedId}`)}>등록한 레시피 보기</PrimaryButton>
            <PrimaryButton ghost onClick={() => { setF(empty()); setStep(1); }}>새 레시피 등록</PrimaryButton>
          </>
        ) : (
          <>
            {hint && <p className="hint">{hint}</p>}
            {step === 1 ? <PrimaryButton onClick={next}>다음</PrimaryButton> : (
              <div className="btn-row"><PrimaryButton ghost onClick={() => setStep((s) => s - 1)}>이전</PrimaryButton><PrimaryButton onClick={next} disabled={busy}>{step === 3 ? (busy ? '등록 중…' : '등록하기') : '다음'}</PrimaryButton></div>
            )}
          </>
        )}
      </main>
    </>
  );
}
