import { useEffect, useState } from 'react';
import { api } from '../../api/index.js';
import { useApp } from '../../store.jsx';
import PrimaryButton from '../../components/PrimaryButton.jsx';

const toLocal = (iso) => { if (!iso) return ''; const d = new Date(iso); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 16); };
const fromLocal = (v) => (v ? new Date(v).toISOString() : null);
const fmt = (iso) => (iso ? new Date(iso).toLocaleString('ko-KR', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '');
const state = (n) => { const now = new Date(); if (new Date(n.startsAt) > now) return ['예정', 'soon']; if (n.endsAt && new Date(n.endsAt) <= now) return ['종료', 'end']; return ['게시 중', 'on']; };

// UC-N06 점검·공지: 등록하면 모든 사용자 화면 위에 배너로 표시
export default function AdminNotices() {
  const { toast } = useApp();
  const [list, setList] = useState(null);
  const [f, setF] = useState({ message: '', level: 'warn', startsAt: '', endsAt: '' });
  const [busy, setBusy] = useState(false);
  const load = () => api.notices().then(setList).catch((e) => { toast(e.message); setList([]); });
  useEffect(() => { load(); }, []);
  const save = async () => {
    setBusy(true);
    try { await api.saveNotice({ ...f, startsAt: fromLocal(f.startsAt), endsAt: fromLocal(f.endsAt) }); toast(f.id ? '공지를 수정했어요' : '공지를 올렸어요'); setF({ message: '', level: 'warn', startsAt: '', endsAt: '' }); load(); }
    catch (e) { toast(e.message); } finally { setBusy(false); }
  };
  const del = async (id) => { try { await api.deleteNotice(id); toast('공지를 삭제했어요'); load(); } catch (e) { toast(e.message); } };
  return (
    <>
      <div className="adm-head"><h2>점검·공지</h2></div>
      <div className="card-sec">
        <div className="field"><label htmlFor="nm">공지 내용</label><textarea id="nm" rows={3} maxLength={300} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} placeholder="예: 11월 20일(목) 새벽 2시~4시 서버 점검으로 로그인이 잠시 안 될 수 있어요." /></div>
        <div className="field"><label>종류</label>
          <div className="pills">{[['info', '안내'], ['warn', '점검'], ['error', '장애']].map(([k, l]) => <button key={k} aria-selected={f.level === k} onClick={() => setF({ ...f, level: k })}>{l}</button>)}</div>
        </div>
        <div className="two">
          <div className="field"><label htmlFor="ns">표시 시작</label><input id="ns" type="datetime-local" value={f.startsAt} onChange={(e) => setF({ ...f, startsAt: e.target.value })} /></div>
          <div className="field"><label htmlFor="ne">표시 끝</label><input id="ne" type="datetime-local" value={f.endsAt} onChange={(e) => setF({ ...f, endsAt: e.target.value })} /></div>
        </div>
        <p className="muted small" style={{ margin: 0 }}>시작을 비우면 지금부터, 끝을 비우면 직접 내릴 때까지 보여요.</p>
        {f.message.trim() && <div className={`sys-banner ${f.level} preview-banner`}><b>📢</b><span>{f.message}</span></div>}
        <div className="btn-row">{f.id && <PrimaryButton ghost onClick={() => setF({ message: '', level: 'warn', startsAt: '', endsAt: '' })}>취소</PrimaryButton>}<PrimaryButton disabled={busy || !f.message.trim()} onClick={save}>{busy ? '저장 중…' : f.id ? '수정하기' : '공지 올리기'}</PrimaryButton></div>
      </div>
      <section className="sec">
        <div className="sec-h"><h2>공지 목록</h2></div>
        {list === null ? <div className="sk" style={{ height: 80 }} /> : list.length ? list.map((n) => { const [st, cls] = state(n); return (
          <div key={n.id} className="nt">
            <div className="nt-main" style={{ cursor: 'default' }}>
              <span className={`nt-state ${cls}`}>{st}</span>
              <span className="nt-tx"><span>{n.message}</span><span className="muted small">{fmt(n.startsAt)} ~ {n.endsAt ? fmt(n.endsAt) : '직접 내릴 때까지'}</span></span>
            </div>
            <span className="my-rc-btns">
              <button className="my-rc-edit" onClick={() => setF({ id: n.id, message: n.message, level: n.level, startsAt: toLocal(n.startsAt), endsAt: toLocal(n.endsAt) })}>수정</button>
              {cls === 'on' && <button className="my-rc-edit" onClick={() => api.saveNotice({ ...n, endsAt: new Date().toISOString() }).then(load).then(() => toast('공지를 내렸어요'))}>내리기</button>}
              <button className="my-rc-del" onClick={() => del(n.id)}>삭제</button>
            </span>
          </div>
        ); }) : <div className="empty">올린 공지가 없어요</div>}
      </section>
    </>
  );
}
