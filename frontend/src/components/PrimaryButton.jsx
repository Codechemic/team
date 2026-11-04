// 공통 컴포넌트 ⑤ 파란 큰 버튼 (ghost = 회색 보조 버튼)
export default function PrimaryButton({ children, ghost, ...props }) {
  return <button className={`btn${ghost ? ' ghost' : ''}`} {...props}>{children}</button>;
}
