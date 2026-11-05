// 불러오는 동안 보여 주는 회색 카드
export default function Skeleton({ n = 3 }) {
  return Array.from({ length: n }, (_, i) => (
    <div key={i} className="sk-card" aria-hidden="true">
      <div className="sk sk-thumb" />
      <div className="sk-lines"><div className="sk" style={{ width: '60%' }} /><div className="sk" style={{ width: '40%' }} /><div className="sk" style={{ width: '80%' }} /></div>
    </div>
  ));
}
