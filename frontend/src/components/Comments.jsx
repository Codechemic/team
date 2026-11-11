import { useEffect, useState } from 'react';
import { useApp } from '../store.jsx';
import { api } from '../api/index.js';
import { ago, useMeId } from './Reviews.jsx';
import Modal from './Modal.jsx';
import PrimaryButton from './PrimaryButton.jsx';

const REASONS = ['광고·홍보', '욕설·비방', '음란·불쾌한 내용', '도배', '기타'];

// UC-F02 질문 댓글: 누구나 질문, 레시피 업로더가 답변
export default function Comments({ recipeId, writerId, writer }) {
  const { needLogin, toast, isAdmin } = useApp();
  const [rep, setRep] = useState(null);
  const [why, setWhy] = useState(REASONS[0]);
  const meId = useMeId();
  const isUploader = meId && meId === (writerId || (writer === '나' ? 'me' : null));
  const [list, setList] = useState(null);
  const [text, setText] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [reply, setReply] = useState('');
  const [busy, setBusy] = useState(false);
  const load = () => api.comments(recipeId).then(setList).catch(() => setList([]));
  useEffect(() => { load(); }, [recipeId]);
  const send = async (content, parentId) => {
    if (needLogin(parentId ? '답변' : '질문')) return false;
    setBusy(true);
    try { await api.addComment(recipeId, content, parentId); await load(); toast(parentId ? '답변을 남겼어요' : '질문을 남겼어요. 업로더가 답변하면 여기에 보여요'); return true; }
    catch (e) { toast(e.message); return false; } finally { setBusy(false); }
  };
  const remove = async (id) => { try { await api.deleteComment(id); await load(); toast('삭제했어요'); } catch (e) { toast(e.message); } };
  const roots = (list || []).filter((c) => !c.parentId);
  const kids = (id) => (list || []).filter((c) => c.parentId === id);
  const Meta = ({ c }) => (
    <div className="cm-top">
      <b>{c.writer}</b>{(c.writerId === writerId || (writer === '나' && c.writerId === 'me')) && <span className="cm-badge">업로더</span>}
      <span className="muted small">{ago(c.createdAt)}</span>
      {c.isHidden && <span className="cat-tag hid">숨김</span>}
      {c.writerId === meId || isAdmin
        ? <button className="link rv-del" onClick={() => remove(c.commentId)}>{c.writerId === meId ? '삭제' : '관리자 삭제'}</button>
        : <button className="link rv-del" onClick={() => !needLogin('신고') && (setWhy(REASONS[0]), setRep(c))}>신고</button>}
    </div>
  );
  return (
    <section className="sec">
      <div className="sec-h"><h2>질문 <span className="count">{roots.length}</span></h2></div>
      <div className="cm-write">
        <textarea rows={2} maxLength={300} value={text} onChange={(e) => setText(e.target.value)} placeholder={isUploader ? '내 레시피에 공지나 추가 설명을 남길 수 있어요' : '궁금한 점을 업로더에게 물어보세요'} />
        <button className="mini" disabled={!text.trim() || busy} onClick={async () => { if (await send(text)) setText(''); }}>등록</button>
      </div>
      {list === null ? <div className="sk" style={{ height: 50 }} /> : roots.length ? (
        <div className="cm-list">
          {roots.map((c) => (
            <div key={c.commentId} className="cm">
              <Meta c={c} />
              <p><span className="q">Q.</span> {c.content}</p>
              {kids(c.commentId).map((a) => (
                <div key={a.commentId} className="cm-ans"><Meta c={a} /><p><span className="a">A.</span> {a.content}</p></div>
              ))}
              {isUploader && (replyTo === c.commentId ? (
                <div className="cm-write reply">
                  <textarea rows={2} maxLength={300} value={reply} onChange={(e) => setReply(e.target.value)} placeholder="답변을 적어 주세요" autoFocus />
                  <button className="mini" disabled={!reply.trim() || busy} onClick={async () => { if (await send(reply, c.commentId)) { setReply(''); setReplyTo(null); } }}>답변</button>
                </div>
              ) : <button className="link cm-reply" onClick={() => { setReplyTo(c.commentId); setReply(''); }}>답변하기</button>)}
              {!isUploader && !kids(c.commentId).length && <span className="muted small">답변을 기다리고 있어요</span>}
            </div>
          ))}
        </div>
      ) : <div className="empty">아직 질문이 없어요</div>}
      {rep && (
        <Modal onClose={() => setRep(null)}>
          <h3>댓글 신고</h3>
          <p className="muted small">“{rep.content.slice(0, 60)}”</p>
          {REASONS.map((r) => <label key={r} className="radio"><input type="radio" name="cr" checked={why === r} onChange={() => setWhy(r)} />{r}</label>)}
          <div className="btn-row"><PrimaryButton ghost onClick={() => setRep(null)}>취소</PrimaryButton>
            <PrimaryButton onClick={async () => { try { await api.report('COMMENT', rep.commentId, why); toast('신고가 접수됐어요. 관리자가 확인할게요'); } catch (e) { toast(e.message); } setRep(null); }}>신고하기</PrimaryButton></div>
        </Modal>
      )}
    </section>
  );
}
