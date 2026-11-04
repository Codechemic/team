import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/index.js';
import { useApp } from '../store.jsx';
import Header from '../components/Header.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// UC-A01 회원가입 · UC-A02 로그인 (Supabase Auth)
export default function Login() {
  const nav = useNavigate();
  const { toast } = useApp();
  const [mode, setMode] = useState('login');
  const [f, setF] = useState({ email: '', password: '', nickname: '' });
  const [hint, setHint] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));

  if (!api.usingSupabase) {
    return (<><Header title="로그인" /><main className="page"><div className="notice">지금은 Supabase 연결 전이라 로그인 없이 체험 모드로 동작해요. frontend/.env 를 설정하면 로그인이 켜져요.</div></main></>);
  }
  const submit = async (e) => {
    e.preventDefault(); setHint('');
    if (!f.email || !f.password || (mode === 'signup' && !f.nickname)) return setHint('빈 항목을 모두 입력해 주세요');
    if (!EMAIL.test(f.email)) return setHint('이메일 형식이 올바르지 않아요');
    if (f.password.length < 6) return setHint('비밀번호는 6자 이상이어야 해요');
    setBusy(true);
    try {
      if (mode === 'signup') {
        const { session } = await api.user.signUp(f);
        if (!session) { toast('가입 확인 메일을 보냈어요. 메일의 링크를 누른 뒤 로그인해 주세요'); setMode('login'); return; }
        toast('가입을 환영해요!');
      } else {
        await api.user.signIn(f);
        toast('로그인했어요');
      }
      nav('/', { replace: true });
    } catch (err) { setHint(err.message); } finally { setBusy(false); }
  };
  return (
    <>
      <Header title={mode === 'login' ? '로그인' : '회원가입'} />
      <main className="page">
        <form className="sec" onSubmit={submit} noValidate>
          <div className="field"><label htmlFor="email">이메일</label><input id="email" type="email" autoComplete="email" value={f.email} onChange={set('email')} /></div>
          <div className="field"><label htmlFor="pw">비밀번호</label><input id="pw" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={f.password} onChange={set('password')} placeholder="6자 이상" /></div>
          {mode === 'signup' && <div className="field"><label htmlFor="nick">닉네임</label><input id="nick" value={f.nickname} onChange={set('nickname')} /></div>}
          {hint && <p className="hint">{hint}</p>}
          <PrimaryButton type="submit" disabled={busy}>{mode === 'login' ? '로그인' : '가입하기'}</PrimaryButton>
        </form>
        <button className="link" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setHint(''); }}>
          {mode === 'login' ? '아직 계정이 없나요? 회원가입' : '이미 계정이 있나요? 로그인'}
        </button>
      </main>
    </>
  );
}
