import Modal from './Modal.jsx';
import { useEffect, useRef, useState } from 'react';
import { useApp } from '../store.jsx';
import { api } from '../api/index.js';
import PrimaryButton from './PrimaryButton.jsx';
import { CamI } from './Icons.jsx';

export function Stars({ value, onChange, size = 'md' }) {
  return (
    <span className={`stars ${size}`} role={onChange ? 'radiogroup' : 'img'} aria-label={`별점 ${value}점`}>
      {[1, 2, 3, 4, 5].map((n) => onChange
        ? <button key={n} type="button" role="radio" aria-checked={value === n} aria-label={`${n}점`} className={n <= value ? 'on' : ''} onClick={() => onChange(n)}>★</button>
        : <i key={n} className={n <= Math.round(value) ? 'on' : ''}>★</i>)}
    </span>
  );
}
export const ago = (t) => { const m = Math.floor((Date.now() - new Date(t)) / 60000); return m < 1 ? '방금' : m < 60 ? `${m}분 전` : m < 1440 ? `${Math.floor(m / 60)}시간 전` : m < 10080 ? `${Math.floor(m / 1440)}일 전` : new Date(t).toLocaleDateString('ko-KR'); };
export const useMeId = () => { const { user } = useApp(); return api.usingSupabase ? user?.id : 'me'; };

// UC-F01 평점 및 후기(사진 포함): 작성·수정·삭제, 저장하면 레시피 평균 평점이 다시 계산됨
export default function Reviews({ recipeId, mineRecipe, onRating }) {
  const { needLogin, toast, isAdmin } = useApp();
  const meId = useMeId();
  const [list, setList] = useState(null);
  const [form, setForm] = useState(null);       // { reviewId?, rating, content, photo }
  const [busy, setBusy] = useState(false);
  const [zoom, setZoom] = useState(null);
  const fileRef = useRef();
  const load = () => api.reviews(recipeId).then(setList).catch(() => setList([]));
  useEffect(() => { load(); }, [recipeId]);
  const myReview = list?.find((r) => r.writerId === meId);
  const open = () => { if (needLogin('후기를 작성')) return; setForm(myReview ? { reviewId: myReview.reviewId, rating: myReview.rating, content: myReview.content || '', photo: myReview.photo || '' } : { rating: 5, content: '', photo: '' }); };
  const after = async (msg) => { await load(); onRating?.(await api.recipeRating(recipeId)); toast(msg); };
  const save = async () => {
    setBusy(true);
    try { await api.saveReview(recipeId, form); const edit = form.reviewId; setForm(null); await after(edit ? '후기를 수정했어요' : '후기를 남겼어요. 고마워요!'); }
    catch (e) { toast(e.message); } finally { setBusy(false); }
  };
  const remove = async (id) => { try { await api.deleteReview(id); setForm(null); await after('후기를 삭제했어요'); } catch (e) { toast(e.message); } };
  const onFile = (e) => { const f = e.target.files[0]; e.target.value = ''; if (!f) return; const rd = new FileReader(); rd.onload = () => setForm((x) => ({ ...x, photo: rd.result })); rd.readAsDataURL(f); };
  const avg = list?.length ? list.reduce((a, r) => a + r.rating, 0) / list.length : 0;
  const dist = [5, 4, 3, 2, 1].map((n) => [n, list?.filter((r) => Math.round(r.rating) === n).length || 0]);
  return (
    <section className="sec">
      <div className="sec-h">
        <h2>후기 <span className="count">{list?.length ?? 0}</span></h2>
        {!mineRecipe && !form && <button className="link" onClick={open}>{myReview ? '내 후기 수정' : '후기 쓰기'}</button>}
      </div>
      {list?.length > 0 && (
        <div className="rv-sum">
          <div className="rv-avg"><b>{avg.toFixed(1)}</b><Stars value={avg} size="sm" /><span className="muted small">후기 {list.length}개</span></div>
          <div className="rv-dist">{dist.map(([n, c]) => <div key={n}><span>{n}</span><i><b style={{ width: `${list.length ? (c / list.length) * 100 : 0}%` }} /></i></div>)}</div>
        </div>
      )}
      {form && (
        <div className="rv-form">
          <div className="rv-label">이 레시피 어땠나요?</div>
          <Stars value={form.rating} onChange={(n) => setForm({ ...form, rating: n })} size="lg" />
          <textarea rows={3} maxLength={300} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="맛, 난이도, 나만의 팁을 남겨 주세요 (선택)" />
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />
          {form.photo
            ? <span className="se-thumb big"><img src={form.photo} alt="후기 사진" /><button onClick={() => setForm({ ...form, photo: '' })} aria-label="사진 삭제">×</button></span>
            : <button className="se-add" onClick={() => fileRef.current.click()}><CamI /> 완성 사진 추가 (선택)</button>}
          <div className="btn-row"><PrimaryButton ghost onClick={() => setForm(null)}>취소</PrimaryButton><PrimaryButton disabled={busy} onClick={save}>{busy ? '저장 중…' : form.reviewId ? '수정하기' : '등록하기'}</PrimaryButton></div>
        </div>
      )}
      {list === null ? <div className="sk" style={{ height: 60 }} /> : list.length ? (
        <div className="rv-list">
          {list.map((r) => (
            <div key={r.reviewId} className="rv">
              <div className="rv-top"><b>{r.writer}</b><Stars value={r.rating} size="sm" /><span className="muted small">{ago(r.createdAt)}</span>
                {(r.writerId === meId || isAdmin) && <button className="link rv-del" onClick={() => (r.writerId === meId ? remove(r.reviewId) : api.adminDeleteReview(r.reviewId).then(() => after('후기를 삭제했어요')).catch((e) => toast(e.message)))}>{r.writerId === meId ? '삭제' : '관리자 삭제'}</button>}</div>
              {r.content && <p>{r.content}</p>}
              {r.photo && <button className="rv-photo" onClick={() => setZoom(r.photo)}><img src={r.photo} alt={`${r.writer}님의 후기 사진`} loading="lazy" /></button>}
            </div>
          ))}
        </div>
      ) : !form && <div className="empty">{mineRecipe ? '아직 후기가 없어요' : '첫 후기를 남겨 주세요'}</div>}
      {zoom && <Modal zoom onClose={() => setZoom(null)}><img src={zoom} alt="후기 사진 크게 보기" /></Modal>}
    </section>
  );
}
