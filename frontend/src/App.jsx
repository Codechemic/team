import { Routes, Route, Navigate } from 'react-router-dom';
import BottomTab from './components/BottomTab.jsx';
import Toast from './components/Toast.jsx';
import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';
import Selected from './pages/Selected.jsx';
import Results from './pages/Results.jsx';
import RecipeDetail from './pages/RecipeDetail.jsx';
import Cook from './pages/Cook.jsx';
import Register from './pages/Register.jsx';
import Favorites from './pages/Favorites.jsx';
import MyPage from './pages/MyPage.jsx';
import Login from './pages/Login.jsx';
import Settings from './pages/Settings.jsx';
import Account from './pages/Account.jsx';

// 화면 번호는 UI/UX 화면 흐름도 기준
export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />                       {/* 1-① 홈 */}
        <Route path="/search" element={<Search />} />               {/* 1-② 재료 검색 */}
        <Route path="/selected" element={<Selected />} />           {/* 1-③ 재료 선택 완료 */}
        <Route path="/results" element={<Results />} />             {/* 1-④ 추천 요리 목록 */}
        <Route path="/recipes/:id" element={<RecipeDetail />} />    {/* 1-⑤ 레시피 상세 */}
        <Route path="/recipes/:id/cook" element={<Cook />} />       {/* 1-⑥ 조리 방법 */}
        <Route path="/register" element={<Register />} />           {/* 2 레시피 등록 1~4단계 */}
        <Route path="/favorites" element={<Favorites />} />         {/* 3 찜 목록 */}
        <Route path="/my" element={<MyPage />} />                   {/* 4 마이페이지 */}
        <Route path="/login" element={<Login />} />                {/* UC-A01·A02 회원가입·로그인 */}
        <Route path="/settings" element={<Settings />} />          {/* 설정: 내 냉장고 */}
        <Route path="/account" element={<Account />} />            {/* 계정 설정 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomTab />
      <Toast />
      <div className="rotate-lock" aria-hidden="true"><div>📱</div><b>세로 화면으로 돌려주세요</b><span>이 앱은 세로 모드에서만 사용할 수 있어요</span></div>
    </div>
  );
}
