import { lazy, Suspense, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import { useApp } from '../store.jsx';
import { api } from '../api/index.js';
import AdminDashboard from './admin/AdminDashboard.jsx';
const AdminReports = lazy(() => import('./admin/AdminReports.jsx'));
const AdminRecipes = lazy(() => import('./admin/AdminRecipes.jsx'));
const AdminIngredients = lazy(() => import('./admin/AdminIngredients.jsx'));
const AdminNotices = lazy(() => import('./admin/AdminNotices.jsx'));
const AdminUsers = lazy(() => import('./admin/AdminUsers.jsx'));

const TABS = [['home', '대시보드'], ['reports', '신고'], ['recipes', '레시피'], ['ingredients', '재료'], ['notices', '공지'], ['users', '회원']];

// 관리자 페이지 (UC-G01·G02, UC-N06): 관리자 계정만 들어올 수 있음
export default function Admin() {
  const nav = useNavigate();
  const { user } = useApp();
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') || 'home';
  const [ok, setOk] = useState(null);
  useEffect(() => { api.isAdmin().then(setOk).catch(() => setOk(false)); }, [user]);
  const go = (t) => setParams(t === 'home' ? {} : { tab: t }, { replace: true });

  if (ok === null) return <><Header title="관리자" /><main className="page"><div className="sk" style={{ height: 200 }} /></main></>;
  if (!ok) return (
    <><Header title="관리자" /><main className="page">
      <div className="empty">관리자 계정만 들어올 수 있는 화면이에요.{api.usingSupabase && !user && <><br />관리자 계정으로 로그인해 주세요.</>}</div>
      {api.usingSupabase && !user ? <PrimaryButton onClick={() => nav('/login')}>로그인하기</PrimaryButton> : <PrimaryButton ghost onClick={() => nav('/my')}>마이페이지로</PrimaryButton>}
    </main></>
  );
  return (
    <>
      <Header title="관리자" />
      <div className="adm-tabs" role="tablist">{TABS.map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} onClick={() => go(k)}>{l}</button>)}</div>
      <main className="page adm-page">
        {!api.usingSupabase && <div className="notice small">체험 모드 관리자 화면이에요. 바뀐 내용은 이 기기에만 저장돼요.</div>}
        <Suspense fallback={<div className="sk" style={{ height: 200 }} />}>
          {tab === 'home' && <AdminDashboard go={go} />}
          {tab === 'reports' && <AdminReports />}
          {tab === 'recipes' && <AdminRecipes />}
          {tab === 'ingredients' && <AdminIngredients />}
          {tab === 'notices' && <AdminNotices />}
          {tab === 'users' && <AdminUsers />}
        </Suspense>
      </main>
    </>
  );
}
