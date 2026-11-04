import { useNavigate } from 'react-router-dom';
import { Back } from './Icons.jsx';

// 공통 컴포넌트 ② 뒤로가기 헤더
export default function Header({ title, onBack, right }) {
  const nav = useNavigate();
  return (
    <header className="top">
      <button className="iconbtn" onClick={onBack || (() => nav(-1))} aria-label="뒤로">
        <Back />
      </button>
      <h1>{title}</h1>
      {right}
    </header>
  );
}
