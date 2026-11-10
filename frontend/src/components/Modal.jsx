import { useEffect, useRef } from 'react';

// 안드로이드 뒤로 가기 버튼으로 창을 닫을 수 있게: 열릴 때 기록을 하나 쌓고, 뒤로 가기가 오면 닫음
export function useBackClose(onClose) {
  const ref = useRef(onClose); ref.current = onClose;
  useEffect(() => {
    window.history.pushState({ ...window.history.state, modal: true }, '');
    const onPop = () => ref.current();
    window.addEventListener('popstate', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
      if (window.history.state?.modal) window.history.back();   // 버튼으로 닫았으면 쌓아 둔 기록 정리
    };
  }, []);
}

// 공통 아래 시트 / 사진 확대 창
export default function Modal({ onClose, zoom, children }) {
  useBackClose(onClose);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  if (zoom) return <div className="scrim zoom" onClick={onClose}>{children}</div>;
  return (
    <div className="scrim" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sheet" role="dialog" aria-modal="true">{children}</div>
    </div>
  );
}
