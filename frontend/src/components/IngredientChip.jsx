// 공통 컴포넌트 ④ 재료 칩 (onRemove 가 있으면 × 버튼 표시)
export default function IngredientChip({ label, selected, onClick, onRemove }) {
  return (
    <span className={`chip${selected ? ' sel' : ''}`}>
      <button className="chip-label" onClick={onClick} disabled={!onClick}>{label}</button>
      {onRemove && <button className="x" onClick={onRemove} aria-label={`${label} 빼기`}>×</button>}
    </span>
  );
}
