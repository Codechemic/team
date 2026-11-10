import { useEffect, useState } from 'react';
import { api } from '../../api/index.js';
import { useApp } from '../../store.jsx';
import { SearchI } from '../../components/Icons.jsx';

// 회원 관리: 회원 목록·활동, 관리자 지정/해제
export default function AdminUsers() {
  const { user, toast } = useApp();
  const [q, setQ] = useState('');
  const [list, setList] = useState(null);
  const load = () => api.adminUsers(q.trim()).then(setList).catch((e) => { toast(e.message); setList([]); });
  useEffect(() => { const h = setTimeout(load, 250); return () => clearTimeout(h); }, [q]);
  const toggle = async (u) => {
    try { await api.adminSetAdmin(u.id, !u.isAdmin); toast(u.isAdmin ? `${u.nickname}님의 관리자 권한을 해제했어요` : `${u.nickname}님을 관리자로 지정했어요`); load(); }
    catch (e) { toast(e.message); }
  };
  return (
    <>
      <div className="adm-head"><h2>회원 관리</h2><span className="muted small">{list?.length ?? 0}명</span></div>
      <label className="search"><SearchI /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="닉네임·이메일 검색" /></label>
      {list === null ? <div className="sk" style={{ height: 160 }} /> : list.length ? list.map((u) => (
        <div key={u.id} className="adm-row" style={{ cursor: 'default' }}>
          <span className="adm-pic" style={{ display: 'grid', placeItems: 'center' }}>{u.isAdmin ? '🛠️' : '🧑‍🍳'}</span>
          <span className="adm-tx">
            <b>{u.nickname}{u.isAdmin && <em className="cat-tag c-r">관리자</em>}</b>
            <span>{u.email}</span>
            <span>가입 {new Date(u.createdAt).toLocaleDateString('ko-KR')} · 레시피 {u.recipes} · 신고 {u.reports}</span>
          </span>
          {u.id !== (user?.id || 'me') && <button className={u.isAdmin ? 'my-rc-del' : 'my-rc-edit'} onClick={() => toggle(u)}>{u.isAdmin ? '관리자 해제' : '관리자 지정'}</button>}
        </div>
      )) : <div className="empty">회원이 없어요</div>}
    </>
  );
}
