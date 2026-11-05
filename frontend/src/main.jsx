import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AppProvider } from './store.jsx';
import './styles.css';

// 핀치 확대 방지 (iOS Safari는 user-scalable=no를 무시하므로 제스처를 직접 막음)
['gesturestart', 'gesturechange', 'gestureend'].forEach((t) =>
  document.addEventListener(t, (e) => e.preventDefault(), { passive: false })
);
document.addEventListener('touchmove', (e) => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });

// 세로 고정: 지원하는 브라우저(안드로이드 홈 화면 앱 등)에서는 화면 회전을 잠금
try { screen.orientation?.lock?.('portrait').catch(() => {}); } catch { /* 미지원 */ }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
