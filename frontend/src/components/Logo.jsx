// 앱 로고: 몽글몽글 요리사 모자 (시안 1)
export default function Logo({ size = 120 }) {
  return (
    <svg className="logo" width={size} height={size} viewBox="20 14 120 132" role="img" aria-label="냉장고를 부탁해 로고">
      <defs>
        <linearGradient id="lgTop" gradientUnits="userSpaceOnUse" x1="0" y1="20" x2="0" y2="112"><stop offset="0" stopColor="#ff9a4d" /><stop offset="1" stopColor="#e8590c" /></linearGradient>
        <linearGradient id="lgBand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c2410c" /><stop offset="1" stopColor="#9a3412" /></linearGradient>
        <filter id="lgShadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#c2410c" floodOpacity=".25" /></filter>
      </defs>
      <g filter="url(#lgShadow)">
        <circle cx="52" cy="72" r="28" fill="url(#lgTop)" /><circle cx="108" cy="72" r="28" fill="url(#lgTop)" /><circle cx="80" cy="54" r="34" fill="url(#lgTop)" />
        <rect x="46" y="72" width="68" height="40" fill="url(#lgTop)" />
        <rect x="44" y="108" width="72" height="26" rx="8" fill="url(#lgBand)" />
      </g>
      <ellipse cx="68" cy="42" rx="12" ry="7" fill="#fff" opacity=".35" transform="rotate(-25 68 42)" />
      <path d="M62 112v18M80 112v18M98 112v18" stroke="#fff" strokeOpacity=".28" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
