import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../store.jsx';
import { api } from '../api/index.js';
import Header from '../components/Header.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import { ClockI, FlagI, HeartI, ShareI } from '../components/Icons.jsx';

const FR = { 0.2: '1/5', 0.25: '1/4', 0.3: '1/3', 0.33: '1/3', 0.5: '1/2', 0.67: '2/3', 0.75: '3/4' };
const COUNT = ['개', '대', '모', '마리', '장', '컵', '공기'];
// 인분 환산: 재료 양 × (바꾼 인분 ÷ 기본 인분)
export function scaled(q, unit, serv, base) {
  if (q == null || unit === '약간') return '약간';
  const n = (q * serv) / base, w = Math.floor(n), f = +(n - w).toFixed(2);
  const num = f === 0 ? String(w) : FR[f] ? `${w ? w + ' ' : ''}${FR[f]}` : String(+n.toFixed(1));
  return num + (COUNT.includes(unit) ? unit : ' ' + unit);
}

// 1-⑤ 레시피 상세
export default function RecipeDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user, needLogin, selected, favorites, toggleFavorite, following, toggleFollow, toast } = useApp();
  const [r, setR] = useState(null);
  const [serv, setServ] = useState(2);
  const [reporting, setReporting] = useState(false);
  const [reason, setReason] = useState('부적절한 내용');
  useEffect(() => { api.getRecipe(id).then((d) => { setR(d); setServ(d.servings); }).catch((e) => toast(e.message)); }, [id]);
  if (!r) return <><Header title="" /><main className="page"><div className="empty">불러오는 중…</div></main></>;
  const fav = favorites.includes(r.recipeId), fol = following.includes(r.writerId || r.writer);
  const mine = r.writer === '나' || (user && user.id === r.writerId);
  const share = () => navigator.clipboard?.writeText(`${r.title} 레시피 · 냉장고를 부탁해`).then(() => toast('레시피 이름을 복사했어요')).catch(() => toast('복사할 수 없는 환경이에요'));
  const sendReport = async () => {
    try { await api.report('RECIPE', r.recipeId, reason); toast('신고가 접수됐어요. 관리자가 확인 후 처리해요'); }
    catch (e) { toast(e.message); }
    setReporting(false);
  };
  return (
    <>
      <Header title="" right={<button className="iconbtn" style={{ color: fav ? 'var(--heart)' : undefined }} onClick={() => toggleFavorite(r.recipeId)} aria-label="찜하기"><HeartI filled={fav} /></button>} />
      <main className="page">
        <div className="hero">{r.mainPhoto ? <img src={r.mainPhoto} alt="" /> : r.emoji}</div>
        <section className="sec">
          <h2 className="title-lg">{r.title}</h2>
          <div className="meta"><span><ClockI /> {r.cookingTime}분</span><span>{r.difficulty}</span><span>조회 {r.views.toLocaleString()}</span><span>★ {Number(r.averageRating).toFixed(1)}</span></div>
          {r.intro && <p className="muted">{r.intro}</p>}
        </section>
        <div className="author">
          <div className="avatar">👩‍🍳</div>
          <div className="who"><b>{r.writer}</b></div>
          {!mine && <button className={`follow${fol ? ' on' : ''}`} onClick={() => toggleFollow(r.writer, r.writerId)}>{fol ? '팔로잉' : '팔로우'}</button>}
        </div>
        <div className="actions">
          <button className={fav ? 'on' : ''} onClick={() => toggleFavorite(r.recipeId)}><HeartI filled={fav} />찜하기</button>
          <button onClick={share}><ShareI />공유하기</button>
          <button onClick={() => !needLogin('신고') && setReporting(true)}><FlagI />신고하기</button>
        </div>
        <section className="sec">
          <div className="sec-h">
            <h2>필요한 재료</h2>
            <div className="stepper">
              <button onClick={() => setServ((s) => Math.max(1, s - 1))} aria-label="인분 줄이기">−</button>
              <output>{serv}인분</output>
              <button onClick={() => setServ((s) => Math.min(10, s + 1))} aria-label="인분 늘리기">+</button>
            </div>
          </div>
          <div>
            {r.ingredients.map((x) => (
              <div key={x.ingredientId} className="ing">
                <span className="e">{x.emoji}</span>
                <span className="n">{x.name} {x.isSeasoning ? <span className="muted small">양념</span> : <span className={`tag ${selected.includes(x.ingredientId) ? 'have' : 'need'}`}>{selected.includes(x.ingredientId) ? '보유' : '부족'}</span>}</span>
                <span className="a">{scaled(x.quantity, x.unit, serv, r.servings)}</span>
              </div>
            ))}
          </div>
        </section>
        <PrimaryButton onClick={() => nav(`/recipes/${r.recipeId}/cook`)}>조리 방법 보기</PrimaryButton>
      </main>
      {reporting && (
        <div className="scrim" onClick={(e) => e.target === e.currentTarget && setReporting(false)}>
          <div className="sheet" role="dialog" aria-modal="true">
            <h3>이 레시피를 신고할까요?</h3>
            {['부적절한 내용', '저작권 침해', '광고 · 스팸', '기타'].map((x) => (
              <label key={x} className="radio"><input type="radio" name="rp" checked={reason === x} onChange={() => setReason(x)} />{x}</label>
            ))}
            <div className="btn-row"><PrimaryButton ghost onClick={() => setReporting(false)}>취소</PrimaryButton><PrimaryButton onClick={sendReport}>신고하기</PrimaryButton></div>
          </div>
        </div>
      )}
    </>
  );
}
