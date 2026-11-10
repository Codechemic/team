import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/index.js';
import { useApp } from '../../store.jsx';
import Modal from '../../components/Modal.jsx';
import PrimaryButton from '../../components/PrimaryButton.jsx';
import { FoodPic } from '../../components/Pic.jsx';
import { SearchI } from '../../components/Icons.jsx';

// UC-G01 레시피 관리: 전체 레시피 검색, 숨김·해제·삭제
export default function AdminRecipes() {
  const nav = useNavigate();
  const { toast } = useApp();
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const [list, setList] = useState(null);
  const [act, setAct] = useState(null);
  const [busy, setBusy] = useState(false);
  const load = () => api.adminRecipes(q, filter).then(setList).catch((e) => { toast(e.message); setList([]); });
  useEffect(() => { const h = setTimeout(load, 250); return () => clearTimeout(h); }, [q, filter]);
  const run = async () => {
    setBusy(true);
    try { await api.adminResolve('RECIPE', act.r.recipeId, act.action, act.action === 'restore' ? null : '관리자 판단'); toast(act.action === 'hide' ? '숨겼어요' : act.action === 'restore' ? '숨김을 해제했어요' : '삭제했어요'); setAct(null); load(); }
    catch (e) { toast(e.message); } finally { setBusy(false); }
  };
  return (
    <>
      <div className="adm-head"><h2>레시피 관리</h2></div>
      <label className="search"><SearchI /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="레시피 이름 검색" /></label>
      <div className="pills">{[['all', '전체'], ['hidden', '숨긴 레시피']].map(([k, l]) => <button key={k} aria-selected={filter === k} onClick={() => setFilter(k)}>{l}</button>)}</div>
      {list === null ? <div className="sk" style={{ height: 160 }} /> : list.length ? list.map((r) => (
        <div key={r.recipeId} className={`my-rc${r.isHidden ? ' is-hid' : ''}`}>
          <button className="my-rc-main" onClick={() => nav(`/recipes/${r.recipeId}`)}>
            <span className="my-rc-pic"><FoodPic r={r} size="sm" /></span>
            <span className="my-rc-tx"><b>{r.title}{r.isHidden && <em className="cat-tag hid">숨김</em>}</b>
              <span className="my-rc-stats"><span>{r.writer || '알 수 없음'}</span><span>👀 {Number(r.views || 0).toLocaleString()}</span><span>★ {Number(r.averageRating || 0).toFixed(1)}</span></span>
            </span>
          </button>
          <span className="my-rc-btns">
            {r.isHidden ? <button className="my-rc-edit" onClick={() => setAct({ r, action: 'restore' })}>해제</button> : <button className="my-rc-edit" onClick={() => setAct({ r, action: 'hide' })}>숨김</button>}
            <button className="my-rc-del" onClick={() => setAct({ r, action: 'delete' })}>삭제</button>
          </span>
        </div>
      )) : <div className="empty">레시피가 없어요</div>}
      {act && (
        <Modal onClose={() => setAct(null)}>
          <h3>'{act.r.title}' {act.action === 'hide' ? '숨기기' : act.action === 'restore' ? '숨김 해제' : '삭제'}</h3>
          <p className="muted">{act.action === 'hide' ? '다른 사용자의 추천·검색·상세에서 보이지 않게 돼요. 작성자에게 알림이 가요.' : act.action === 'restore' ? '다시 모든 사용자에게 보여요.' : '단계·재료·찜·후기·댓글까지 모두 지워지고 되돌릴 수 없어요.'}</p>
          <div className="btn-row"><PrimaryButton ghost onClick={() => setAct(null)}>취소</PrimaryButton><button className={`btn${act.action === 'delete' ? ' danger-btn' : ''}`} disabled={busy} onClick={run}>{busy ? '처리 중…' : '확인'}</button></div>
        </Modal>
      )}
    </>
  );
}
