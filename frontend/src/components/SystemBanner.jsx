import { useEffect, useState } from 'react';

// UC-N06 가용성: ① 점검 사전 공지 (public/notice.json) ② 인터넷 연결 끊김 안내
// 공지 방법: GitHub에서 frontend/public/notice.json 의 active 를 true 로, message·until 을 바꿔 저장하면 자동 배포 후 모든 사용자에게 표시
export default function SystemBanner() {
  const [notice, setNotice] = useState(null);
  const [online, setOnline] = useState(navigator.onLine);
  const [hidden, setHidden] = useState(() => { try { return sessionStorage.getItem('notice_hidden') || ''; } catch { return ''; } });
  useEffect(() => {
    fetch('/notice.json', { cache: 'no-store' }).then((r) => (r.ok ? r.json() : null)).then((n) => {
      if (n?.active && n.message && (!n.until || new Date(n.until) > new Date())) setNotice(n);
    }).catch(() => {});
    const on = () => setOnline(true), off = () => setOnline(false);
    window.addEventListener('online', on); window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);
  const hide = () => { setHidden(notice.message); try { sessionStorage.setItem('notice_hidden', notice.message); } catch { /* 무시 */ } };
  return (
    <>
      {!online && <div className="sys-banner error" role="alert"><b>📡</b><span>인터넷 연결이 끊겼어요. 연결되면 자동으로 다시 불러와요.</span></div>}
      {notice && hidden !== notice.message && (
        <div className={`sys-banner ${notice.level || 'warn'}`} role="status"><b>📢</b><span>{notice.message}</span><button onClick={hide} aria-label="공지 닫기">×</button></div>
      )}
    </>
  );
}
