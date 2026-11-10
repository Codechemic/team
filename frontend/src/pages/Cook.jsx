import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../store.jsx';
import { api } from '../api/index.js';
import Header from '../components/Header.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';

const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

// 타이머 종료 알림: 진동 + 짧은 알림음
function ring() {
  try { navigator.vibrate?.([300, 150, 300]); } catch { /* 미지원 */ }
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.35, 0.7].forEach((t) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = 880; o.connect(g); g.connect(ctx.destination);
      g.gain.setValueAtTime(0.25, ctx.currentTime + t); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.3);
      o.start(ctx.currentTime + t); o.stop(ctx.currentTime + t + 0.3);
    });
  } catch { /* 미지원 */ }
}

// 화면 꺼짐 방지 (Screen Wake Lock). 다른 앱에 갔다 오면 다시 요청
function useWakeLock() {
  const [state, setState] = useState('none');   // on | off | none(미지원)
  useEffect(() => {
    if (!('wakeLock' in navigator)) { setState('none'); return; }
    let lock = null, alive = true;
    const get = async () => {
      try { lock = await navigator.wakeLock.request('screen'); if (alive) setState('on'); lock.addEventListener('release', () => alive && setState('off')); }
      catch { if (alive) setState('off'); }
    };
    const onVis = () => document.visibilityState === 'visible' && get();
    get(); document.addEventListener('visibilitychange', onVis);
    return () => { alive = false; document.removeEventListener('visibilitychange', onVis); lock?.release().catch(() => {}); };
  }, []);
  return state;
}

// UC-D03 조리 모드: 한 단계씩 크게, 단계별 타이머, 화면 꺼짐 방지
export default function Cook() {
  const { id } = useParams();
  const nav = useNavigate();
  const { toast } = useApp();
  const [r, setR] = useState(null);
  const [i, setI] = useState(0);
  const [overview, setOverview] = useState(false);
  const [timers, setTimers] = useState({});      // { 단계번호: { left, run } }
  const wake = useWakeLock();
  const touch = useRef(null);
  useEffect(() => { api.getRecipe(id).then(setR).catch((e) => toast(e.message)); }, [id]);

  // 타이머는 단계를 넘겨도 계속 돌아감
  const anyRun = Object.values(timers).some((t) => t.run);
  useEffect(() => {
    if (!anyRun) return;
    const h = setInterval(() => setTimers((ts) => {
      const n = { ...ts };
      for (const [k, t] of Object.entries(ts)) {
        if (!t.run) continue;
        if (t.left <= 1) { n[k] = { left: 0, run: false, done: true }; ring(); toast(`${k}단계 타이머가 끝났어요!`); }
        else n[k] = { ...t, left: t.left - 1 };
      }
      return n;
    }), 1000);
    return () => clearInterval(h);
  }, [anyRun]);

  if (!r) return <><Header title="조리 모드" /><main className="page"><div className="sk" style={{ height: 320 }} /></main></>;
  const total = r.steps.length, s = r.steps[i], last = i === total - 1;
  const t = s.timerSeconds ? (timers[s.stepNumber] || { left: s.timerSeconds, run: false }) : null;
  const setT = (v) => setTimers((ts) => ({ ...ts, [s.stepNumber]: v }));
  const go = (n) => { if (n >= 0 && n < total) { setI(n); window.scrollTo(0, 0); } };
  const onTouchStart = (e) => { touch.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touch.current == null) return;
    const dx = e.changedTouches[0].clientX - touch.current; touch.current = null;
    if (Math.abs(dx) > 60) go(dx < 0 ? i + 1 : i - 1);
  };
  const running = Object.entries(timers).filter(([k, v]) => v.run && Number(k) !== s.stepNumber);

  return (
    <div className="cook">
      <Header title={r.title} right={<button className="link" onClick={() => setOverview((v) => !v)}>{overview ? '한 단계씩' : '전체 보기'}</button>} />
      <div className="cook-top">
        <div className="segbar">{r.steps.map((_, k) => <i key={k} className={k < i ? 'done' : k === i ? 'now' : ''} onClick={() => go(k)} />)}</div>
        <div className="cook-meta">
          <span>{i + 1} / {total} 단계</span>
          <span className={`wake ${wake}`}>{wake === 'on' ? '☀️ 화면 켜짐 유지 중' : wake === 'none' ? '화면 꺼짐 방지를 지원하지 않는 브라우저예요' : '화면 꺼짐 방지 꺼짐'}</span>
        </div>
      </div>

      {overview ? (
        <main className="page">
          <ol className="preview">
            {r.steps.map((x, k) => (
              <li key={k} className={k === i ? 'cur' : ''} onClick={() => { go(k); setOverview(false); }}>
                <span className="num">{x.stepNumber}</span><p>{x.description}{x.timerSeconds && <em className="tm"> ⏱ {mmss(x.timerSeconds)}</em>}</p>
              </li>
            ))}
          </ol>
        </main>
      ) : (
        <main className="page cook-main" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="cook-card" key={i}>
            <div className="cook-step">STEP {s.stepNumber}</div>
            {s.stepPhoto && <img className="cook-photo" src={s.stepPhoto} alt={`${s.stepNumber}단계 사진`} />}
            <p className="cook-text">{s.description}</p>
            {t && (
              <div className={`big-timer${t.run ? ' run' : ''}${t.done ? ' end' : ''}`}>
                <output>{t.done ? '완료!' : mmss(t.left)}</output>
                <div className="bt-btns">
                  <button onClick={() => setT({ left: t.done ? s.timerSeconds : t.left, run: !t.run })}>{t.run ? '⏸ 일시정지' : t.done ? '↻ 다시' : '▶ 타이머 시작'}</button>
                  {(t.run || t.left !== s.timerSeconds) && <button className="ghost" onClick={() => setT({ left: s.timerSeconds, run: false })}>초기화</button>}
                </div>
              </div>
            )}
          </div>
          {running.length > 0 && <div className="other-timers">{running.map(([k, v]) => <button key={k} onClick={() => go(r.steps.findIndex((x) => String(x.stepNumber) === k))}>⏱ {k}단계 {mmss(v.left)}</button>)}</div>}
          {last && r.tip && <div className="tipbox"><b>💡 요리 팁</b><p>{r.tip}</p></div>}
          <p className="muted small center">좌우로 밀어서 단계를 넘길 수 있어요</p>
        </main>
      )}

      <div className="cook-nav">
        <PrimaryButton ghost disabled={i === 0} onClick={() => go(i - 1)}>이전</PrimaryButton>
        {last
          ? <PrimaryButton onClick={() => { toast('완성! 맛있게 드세요 🍽️'); nav(-1); }}>요리 완성!</PrimaryButton>
          : <PrimaryButton onClick={() => go(i + 1)}>다음 단계</PrimaryButton>}
      </div>
    </div>
  );
}
