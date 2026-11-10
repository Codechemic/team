import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import { IngPic } from '../components/Pic.jsx';
import { useApp } from '../store.jsx';
import { api } from '../api/index.js';
import { SearchI } from '../components/Icons.jsx';

const CATS = ['채소', '육류', '수산물', '기타', '양념'];
const blank = () => ({ name: '', category: '채소', emoji: '', isSeasoning: false, aliases: '', substituteInfo: '' });

// UC-G02 관리자 재료 DB 관리: 재료명·카테고리·별칭·대체 재료 추가/수정/삭제
export default function Admin() {
  const nav = useNavigate();
  const { user, toast } = useApp();
  const [ok, setOk] = useState(null);
  const [list, setList] = useState(null);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('전체');
  const [form, setForm] = useState(null);
  const [busy, setBusy] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const load = () => api.adminIngredients().then(setList).catch((e) => { toast(e.message); setList([]); });
  useEffect(() => { api.isAdmin().then((a) => { setOk(a); if (a) load(); }); }, [user]);

  if (ok === null) return <><Header title="재료 관리" /><main className="page"><div className="sk" style={{ height: 200 }} /></main></>;
  if (!ok) return (
    <><Header title="재료 관리" /><main className="page">
      <div className="empty">관리자만 들어올 수 있는 화면이에요.</div>
      <PrimaryButton ghost onClick={() => nav('/my')}>마이페이지로</PrimaryButton>
    </main></>
  );

  const k = q.trim();
  const shown = (list || []).filter((i) => (cat === '전체' || i.category === cat) && (!k || i.name.includes(k) || i.aliases.some((a) => a.includes(k))));
  const edit = (i) => { setConfirmDel(false); setForm({ ...i, aliases: i.aliases.join(', ') }); };
  const save = async () => {
    setBusy(true);
    try { await api.saveIngredient({ ...form, aliases: form.aliases.split(',') }); toast(form.id ? '재료를 수정했어요' : '재료를 추가했어요'); setForm(null); await load(); }
    catch (e) { toast(e.message); } finally { setBusy(false); }
  };
  const del = async () => {
    setBusy(true);
    try { await api.deleteIngredient(form.id); toast('재료를 삭제했어요'); setForm(null); await load(); }
    catch (e) { toast(e.message); setConfirmDel(false); } finally { setBusy(false); }
  };
  return (
    <>
      <Header title="재료 관리" right={<button className="link" onClick={() => { setConfirmDel(false); setForm(blank()); }}>+ 추가</button>} />
      <main className="page">
        {!api.usingSupabase && <div className="notice">체험 모드에서는 바뀐 내용이 새로고침하면 사라져요.</div>}
        <div className="adm-sum"><b>{list?.length ?? 0}</b>개 재료 · 별칭 {list?.reduce((a, i) => a + i.aliases.length, 0) ?? 0}개 · 대체 정보 {list?.filter((i) => i.substituteInfo).length ?? 0}개</div>
        <label className="search"><SearchI /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="재료명·별칭 검색" /></label>
        <div className="tabs-cat" role="tablist">{['전체', ...CATS].map((c) => <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}>{c}</button>)}</div>
        {list === null ? <div className="sk" style={{ height: 200 }} /> : (
          <div className="adm-list">
            {shown.map((i) => (
              <button key={i.id} className="adm-row" onClick={() => edit(i)}>
                <IngPic name={i.name} emoji={i.emoji} className="adm-pic" />
                <span className="adm-tx">
                  <b>{i.name} <em className={`cat-tag c-${i.category}`}>{i.category}</em>{i.isSeasoning && <em className="cat-tag">일치율 제외</em>}</b>
                  <span>{i.aliases.length ? `별칭: ${i.aliases.join(', ')}` : '별칭 없음'}</span>
                  {i.substituteInfo && <span className="subst">대체: {i.substituteInfo}</span>}
                </span>
                <span className="adm-used">{i.usedIn ? `레시피 ${i.usedIn}` : '미사용'}</span>
              </button>
            ))}
            {!shown.length && <div className="empty">조건에 맞는 재료가 없어요</div>}
          </div>
        )}
      </main>
      {form && (
        <div className="scrim" onClick={(e) => e.target === e.currentTarget && setForm(null)}>
          <div className="sheet" role="dialog" aria-modal="true">
            <h3>{form.id ? '재료 수정' : '새 재료 추가'}</h3>
            <div className="two">
              <div className="field"><label htmlFor="an">재료명</label><input id="an" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="예: 대파" /></div>
              <div className="field" style={{ maxWidth: 90 }}><label htmlFor="ae">이모지</label><input id="ae" value={form.emoji} maxLength={4} onChange={(e) => setForm({ ...form, emoji: e.target.value })} placeholder="🥬" /></div>
            </div>
            <div className="field"><label htmlFor="ac">카테고리</label>
              <select id="ac" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value, isSeasoning: e.target.value === '양념' ? true : form.isSeasoning })}>{CATS.map((c) => <option key={c}>{c}</option>)}</select>
            </div>
            <label className="chk"><input type="checkbox" checked={form.isSeasoning} onChange={(e) => setForm({ ...form, isSeasoning: e.target.checked })} />양념류 (추천 일치율 계산에서 제외)</label>
            <div className="field"><label htmlFor="aa">별칭 <span className="muted small">쉼표로 구분 · 검색에 사용</span></label><input id="aa" value={form.aliases} onChange={(e) => setForm({ ...form, aliases: e.target.value })} placeholder="예: 파, 대파채" /></div>
            <div className="field"><label htmlFor="as">대체 재료 <span className="muted small">없을 때 대신 쓸 재료</span></label><input id="as" value={form.substituteInfo} maxLength={255} onChange={(e) => setForm({ ...form, substituteInfo: e.target.value })} placeholder="예: 쪽파, 양파" /></div>
            {form.id && (confirmDel ? (
              <div className="notice warn">{form.usedIn ? `레시피 ${form.usedIn}개에서 쓰는 재료라 삭제할 수 없어요.` : '정말 삭제할까요? 사용자 냉장고·최근 검색어에서도 빠져요.'}
                {!form.usedIn && <div className="btn-row" style={{ marginTop: 8 }}><PrimaryButton ghost onClick={() => setConfirmDel(false)}>취소</PrimaryButton><button className="btn danger-btn" disabled={busy} onClick={del}>삭제</button></div>}
              </div>
            ) : <button className="link danger-link" onClick={() => setConfirmDel(true)}>이 재료 삭제</button>)}
            <div className="btn-row"><PrimaryButton ghost onClick={() => setForm(null)}>닫기</PrimaryButton><PrimaryButton disabled={busy || !form.name.trim()} onClick={save}>{busy ? '저장 중…' : '저장'}</PrimaryButton></div>
          </div>
        </div>
      )}
    </>
  );
}
