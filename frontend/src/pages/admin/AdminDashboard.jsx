import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/index.js';
import { useApp } from '../../store.jsx';

// 관리자 대시보드: 회원·레시피·신고 현황
export default function AdminDashboard({ go }) {
  const nav = useNavigate();
  const { toast } = useApp();
  const [s, setS] = useState(null);
  const [err, setErr] = useState('');
  useEffect(() => { api.adminStats().then(setS).catch((e) => { setErr(e.message); toast(e.message); }); }, []);
  if (err) return <div className="notice warn">{err}</div>;
  if (!s) return <div className="sk" style={{ height: 220 }} />;
  const Card = ({ v, l, sub, tab, warn }) => (
    <button className={`kpi${warn ? ' warn' : ''}`} onClick={() => tab && go(tab)} disabled={!tab}>
      <b>{Number(v).toLocaleString()}</b><span>{l}</span>{sub && <small>{sub}</small>}
    </button>
  );
  return (
    <>
      {s.pendingReports > 0 && (
        <button className="warn-card" onClick={() => go('reports')}>
          <span className="wc-ic">🚨</span><span className="wc-tx"><b>처리 대기 신고 {s.pendingReports}건</b><span>눌러서 바로 처리하기</span></span><span className="link">처리</span>
        </button>
      )}
      <div className="kpis">
        <Card v={s.users} l="전체 회원" sub={`최근 7일 +${s.newUsers7d}`} tab="users" />
        <Card v={s.recipes} l="전체 레시피" sub={`최근 7일 +${s.newRecipes7d}`} tab="recipes" />
        <Card v={s.pendingReports} l="대기 신고" tab="reports" warn={s.pendingReports > 0} />
        <Card v={s.hiddenRecipes} l="숨긴 레시피" tab="recipes" />
        <Card v={s.reviews} l="후기" />
        <Card v={s.comments} l="질문 댓글" />
        <Card v={s.ingredients} l="표준 재료" tab="ingredients" />
      </div>
      <section className="sec">
        <div className="sec-h"><h2>조회수 많은 레시피</h2></div>
        <ol className="rank">
          {s.topRecipes.map((r, k) => (
            <li key={r.recipeId}><button onClick={() => nav(`/recipes/${r.recipeId}`)}><span className="rk">{k + 1}</span><b>{r.title}</b><span className="muted small">👀 {Number(r.views).toLocaleString()} · ❤️ {r.saves}</span></button></li>
          ))}
        </ol>
      </section>
      <div className="adm-quick">
        <button onClick={() => go('notices')}>📢 점검·공지 등록</button>
        <button onClick={() => go('ingredients')}>🥕 재료 추가</button>
      </div>
    </>
  );
}
