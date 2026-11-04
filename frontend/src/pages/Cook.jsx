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
  if (!r) return null;
  const toggle = (i) => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
  return (
    <>
      <Header title="조리 방법" />
      <main className="page">
        <div className="sec-h"><h2>{r.title} · {r.steps.length}단계</h2><span className="muted small">{done.length}/{r.steps.length} 완료</span></div>
        <div className="steps">
          {r.steps.map((s, i) => (
            <div key={i} className={`step${done.includes(i) ? ' done' : ''}`}>
              <span className="num">{s.stepNumber}</span>
              <div className="tx">
                <p>{s.description}</p>
                {s.timerSeconds && <Timer seconds={s.timerSeconds} label={s.stepNumber} onDone={(n) => toast(`${n}단계 타이머가 끝났어요`)} />}
                <button className="check" onClick={() => toggle(i)}>{done.includes(i) ? '다시 하기' : '이 단계 완료'}</button>
              </div>
            </div>
          ))}
        </div>
        <PrimaryButton onClick={() => { toast('맛있게 드세요!'); nav(-1); }}>완료</PrimaryButton>
      </main>
    </>
  );
}
