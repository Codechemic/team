import { Component } from 'react';

// 화면에서 예기치 못한 오류가 나도 흰 화면 대신 안내와 복구 버튼을 보여 줌 (UC-N06)
export default class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error('[화면 오류]', error, info?.componentStack); }
  componentDidUpdate(prev) { if (prev.resetKey !== this.props.resetKey && this.state.error) this.setState({ error: null }); }
  render() {
    if (!this.state.error) return this.props.children;
    const chunk = /Loading chunk|dynamically imported module|Importing a module script failed/i.test(String(this.state.error?.message));
    return (
      <div className="crash" role="alert">
        <div className="ic">{chunk ? '🔄' : '😵'}</div>
        <h2>{chunk ? '새 버전이 배포됐어요' : '화면을 불러오지 못했어요'}</h2>
        <p>{chunk ? '새로고침하면 최신 버전으로 열려요.' : '잠시 후 다시 시도해 주세요. 계속되면 새로고침해 주세요.'}</p>
        <button className="btn" onClick={() => window.location.reload()}>새로고침</button>
        {!chunk && <button className="link" onClick={() => { this.setState({ error: null }); window.location.assign('/'); }}>홈으로</button>}
      </div>
    );
  }
}
