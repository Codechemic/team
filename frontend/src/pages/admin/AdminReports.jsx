import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/index.js';
import { useApp } from '../../store.jsx';
import Modal from '../../components/Modal.jsx';
import PrimaryButton from '../../components/PrimaryButton.jsx';
import { ago } from '../../components/Reviews.jsx';

const ACTIONS = { hide: '숨기기', delete: '삭제', reject: '반려', restore: '숨김 해제' };

// UC-G01 신고 처리: 신고된 레시피·댓글을 확인하고 숨김·삭제·반려
export default function AdminReports() {
  const nav = useNavigate();
  const { toast } = useApp();
  const [status, setStatus] = useState('대기');
  const [list, setList] = useState(null);
  const [act, setAct] = useState(null);   // { g, action }
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const load = () => { setList(null); api.adminReports(status).then(setList).catch((e) => { toast(e.message); setList([]); }); };
  useEffect(load, [status]);
  const run = async () => {
    setBusy(true);
    try {
      await api.adminResolve(act.g.targetType, act.g.targetId, act.action, reason.trim() || act.g.reports[0]?.reason);
      toast(`${ACTIONS[act.action]} 처리했어요`); setAct(null); load();
    } catch (e) { toast(e.message); } finally { setBusy(false); }
  };
  return (
    <>
      <div className="adm-head"><h2>신고 처리</h2></div>
      <div className="pills">{['대기', '처리 완료', '반려', '전체'].map((s) => <button key={s} aria-selected={status === s} onClick={() => setStatus(s)}>{s}</button>)}</div>
      {list === null ? <div className="sk" style={{ height: 160 }} /> : list.length ? list.map((g) => {
        const t = g.target, recipe = g.targetType === 'RECIPE';
        return (
          <div key={g.targetType + g.targetId} className="rp-card">
            <div className="rp-top">
              <span className={`cat-tag ${recipe ? 'c-r' : 'c-c'}`}>{recipe ? '레시피' : '댓글'}</span>
              <span className="rp-n">신고 {g.count}건</span>
              {t?.isHidden && <span className="cat-tag hid">숨김 중</span>}
              <span className="muted small rp-at">{ago(g.lastAt)}</span>
            </div>
            {t ? (
              <button className="rp-target" onClick={() => nav(`/recipes/${t.recipeId}`)}>
                {recipe ? <b>{t.emoji} {t.title}</b> : <><span className="muted small">「{t.title}」의 댓글</span><b>“{t.content}”</b></>}
                <span className="muted small">작성자 {t.writer} ›</span>
              </button>
            ) : <div className="muted small">이미 삭제된 {recipe ? '레시피' : '댓글'}이에요</div>}
            <ul className="rp-reasons">{g.reports.slice(0, 3).map((r) => <li key={r.reportId}><b>{r.reason}</b> <span className="muted small">· {r.reporter} · {r.status}</span></li>)}{g.reports.length > 3 && <li className="muted small">외 {g.reports.length - 3}건</li>}</ul>
            {t && (
              <div className="rp-btns">
                {status === '대기' || g.reports.some((r) => r.status === '대기') ? (
                  <>
                    {!t.isHidden && <button className="b-hide" onClick={() => { setReason(''); setAct({ g, action: 'hide' }); }}>숨기기</button>}
                    <button className="b-del" onClick={() => { setReason(''); setAct({ g, action: 'delete' }); }}>삭제</button>
                    <button className="b-rej" onClick={() => { setReason(''); setAct({ g, action: 'reject' }); }}>반려</button>
                  </>
                ) : t.isHidden && <button className="b-rej" onClick={() => setAct({ g, action: 'restore' })}>숨김 해제</button>}
              </div>
            )}
          </div>
        );
      }) : <div className="empty">{status === '대기' ? '처리할 신고가 없어요 👍' : '내역이 없어요'}</div>}
      {act && (
        <Modal onClose={() => setAct(null)}>
          <h3>{act.g.targetType === 'RECIPE' ? '레시피' : '댓글'}를 {ACTIONS[act.action]}할까요?</h3>
          <p className="muted">
            {act.action === 'hide' && '다른 사용자에게 보이지 않게 돼요. 작성자에게 알림이 가고, 나중에 숨김을 해제할 수 있어요.'}
            {act.action === 'delete' && '완전히 지워지고 되돌릴 수 없어요. 작성자에게 알림이 가요.'}
            {act.action === 'reject' && '문제가 없다고 보고 신고를 반려해요. 게시물은 그대로 보여요.'}
            {act.action === 'restore' && '다시 모든 사용자에게 보여요.'}
          </p>
          {(act.action === 'hide' || act.action === 'delete') && (
            <div className="field"><label htmlFor="rr">처리 사유 (작성자 알림에 표시)</label><input id="rr" value={reason} maxLength={100} onChange={(e) => setReason(e.target.value)} placeholder={act.g.reports[0]?.reason || '예: 광고성 게시물'} /></div>
          )}
          <div className="btn-row"><PrimaryButton ghost onClick={() => setAct(null)}>취소</PrimaryButton>
            <button className={`btn${act.action === 'delete' ? ' danger-btn' : ''}`} disabled={busy} onClick={run}>{busy ? '처리 중…' : ACTIONS[act.action]}</button></div>
        </Modal>
      )}
    </>
  );
}
