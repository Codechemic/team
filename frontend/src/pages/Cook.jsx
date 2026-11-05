import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../store.jsx';
import { api } from '../api/index.js';
import Header from '../components/Header.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';

const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

function Timer({ seconds, label, onDone }) {
  const [left, setLeft] = useState(seconds);
  const [run, setRun] = useState(false);
  const h = useRef();
  useEffect(() => {
    if (!run) return;
    h.current = setInterval(() => setLeft((l) => {
      if (l <= 1) { clearInterval(h.current); setRun(false); onDone(label); return seconds; }
      return l - 1;
    }), 1000);
    return () => clearInterval(h.current);
  }, [run]);
  return <button className={`timer${run ? ' run' : ''}`} onClick={() => setRun((x) => !x)}>{run ? '⏸' : '⏱'} {mmss(left)}</button>;
}

// 1-⑥ 조리 방법
export default function Cook() {
  const { id } = useParams();
  const nav = useNavigate();
  const { toast } = useApp();
  const [r, setR] = useState(null);
  const [done, setDone] = useState([]);
  useEffect(() => { api.getRecipe(id).then(setR); }, [id]);
  if (!r) return <><Header title="조리 방법" /><main className="page"><div className="sk" style={{ height: 120 }} /><div className="sk" style={{ height: 120 }} /></main></>;
  const toggle = (i) => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
  const pct = Math.round((done.length / r.steps.length) * 100);
  const cur = r.steps.findIndex((_, i) => !done.includes(i));
  return (
    <>
      <Header title={r.title} />
      <div className="cook-bar"><div className="cook-prog"><i style={{ width: `${pct}%` }} /></div><span>{done.length}/{r.steps.length} 단계</span></div>
      <main className="page">
        <div className="steps">
          {r.steps.map((s, i) => (
            <div key={i} className={`step${done.includes(i) ? ' done' : ''}${i === cur ? ' now' : ''}`}>
              <button className="num" onClick={() => toggle(i)} aria-label={`${s.stepNumber}단계 ${done.includes(i) ? '완료 취소' : '완료'}`}>{done.includes(i) ? '✓' : s.stepNumber}</button>
              <div className="tx">
                {i === cur && <span className="now-tag">지금 할 단계</span>}
                <p>{s.description}</p>
                <div className="step-act">
                  {s.timerSeconds && <Timer seconds={s.timerSeconds} label={s.stepNumber} onDone={(n) => toast(`${n}단계 타이머가 끝났어요`)} />}
                  <button className="check" onClick={() => toggle(i)}>{done.includes(i) ? '다시 하기' : '완료'}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {r.tip && <div className="tipbox"><b>💡 요리 팁</b><p>{r.tip}</p></div>}
        <PrimaryButton onClick={() => { toast(pct === 100 ? '완성! 맛있게 드세요 🍽️' : '맛있게 드세요!'); nav(-1); }}>{pct === 100 ? '요리 완성!' : '요리 마치기'}</PrimaryButton>
      </main>
    </>
  );
}
