import { useState } from 'react';
import { DEFAULT_FOOD, foodSrc, ingSrc } from '../lib/images.js';

// 재료 그림: 이미지가 있으면 3D 일러스트, 없으면 이모지
export function IngPic({ name, emoji, className = '' }) {
  const [err, setErr] = useState(false);
  const src = ingSrc(name);
  return (
    <span className={`pic ${className}`}>
      {src && !err ? <img src={src} alt="" loading="lazy" decoding="async" onError={() => setErr(true)} /> : <span className="pic-emo">{emoji || '🥣'}</span>}
    </span>
  );
}

// 요리 그림: 사용자가 올린 사진 > 요리 일러스트 > 기본 접시
export function FoodPic({ r, size = 'md', extras = [] }) {
  const [err, setErr] = useState(false);
  if (r.mainPhoto && !err) {
    return <div className={`dish dish-${size} photo-on`}><img className="cover" src={r.mainPhoto} alt="" loading="lazy" onError={() => setErr(true)} /></div>;
  }
  const src = foodSrc(r.title);
  return (
    <div className={`dish dish-${size}`}>
      <span className="glow" />
      {src ? <img className="main" src={src} alt="" loading="lazy" decoding="async" />
        : r.emoji && r.emoji !== '🍽️' ? <span className="main-emo">{r.emoji}</span>
        : <img className="main" src={DEFAULT_FOOD} alt="" />}
      {extras.slice(0, 3).map((x, i) => <IngPic key={x.name} name={x.name} emoji={x.emoji} className={`float f${i}`} />)}
    </div>
  );
}
