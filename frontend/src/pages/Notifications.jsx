import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import { useApp } from '../store.jsx';
import { api } from '../api/index.js';
import { ago } from '../components/Reviews.jsx';

// UC-F05 레시피 알림: 팔로우한 업로더가 새 레시피를 올리면 도착
export default function Notifications() {
  const nav = useNavigate();
  const { user, setUnread } = useApp();
  const [list, setList] = useState(null);
  useEffect(() => {
    api.notifications().then((l) => { setList(l); if (l.some((n) => !n.isRead)) api.markAllRead().then(() => setUnread(0)); }).catch(() => setList([]));
  }, [user]);
  const remove = async (id) => { await api.deleteNotification(id).catch(() => {}); setList((l) => l.filter((n) => n.id !== id)); };
  return (
    <>
      <Header title="알림" />
      <main className="page">
        {api.usingSupabase && !user ? (
          <>
            <div className="empty">로그인하면 팔로우한 업로더의 새 레시피 알림을 받을 수 있어요</div>
            <PrimaryButton onClick={() => nav('/login')}>로그인하기</PrimaryButton>
          </>
        ) : list === null ? <div className="sk" style={{ height: 120 }} /> : list.length ? (
          <div className="nt-list">
            {list.map((n) => (
              <div key={n.id} className={`nt${n.isRead ? '' : ' new'}`}>
                <button className="nt-main" onClick={() => n.relatedType === 'RECIPE' && nav(`/recipes/${n.relatedId}`)}>
                  <span className="nt-ic">🍳</span>
                  <span className="nt-tx"><span>{n.message}</span><span className="muted small">{ago(n.createdAt)}</span></span>
                </button>
                <button className="nt-del" onClick={() => remove(n.id)} aria-label="알림 삭제">×</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty">아직 알림이 없어요.<br />마음에 드는 업로더를 팔로우하면 새 레시피를 알려 드려요.</div>
        )}
      </main>
    </>
  );
}
