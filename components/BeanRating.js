import React from "react";

export function beanScore(rating, max = 100) {
  const raw = (Number(rating) || 0) / max * 5;
  return Math.max(0, Math.min(5, Math.round(raw * 10) / 10));
}

function Bean({ variant, size }) {
  // variant: "full" | "half" | "empty"
  const opacity = variant === "half" ? 0.55 : variant === "empty" ? 0.32 : 1;
  const fill = variant === "empty" ? "none" : "currentColor";
  const stroke = variant === "empty" ? "currentColor" : "none";
  return (
    <svg data-testid="bean" width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
      <g transform="rotate(24 8 8)">
        <ellipse cx="8" cy="8" rx="6.5" ry="9.5" fill={fill} stroke={stroke}
          strokeWidth="1.6" opacity={opacity} />
        {variant !== "empty" && (
          <path d="M8 -1 C6 4, 6 12, 8 17" stroke="#f3f2f2" strokeWidth="1" fill="none" opacity={opacity} />
        )}
      </g>
    </svg>
  );
}

export default function BeanRating({ rating, max = 100, size = 16, showValue = true, className = "" }) {
  const score = beanScore(rating, max);
  const full = Math.floor(score);
  const hasHalf = score - full >= 0.5;
  const beans = [];
  for (let i = 0; i < 5; i++) {
    if (i < full) beans.push("full");
    else if (i === full && hasHalf) beans.push("half");
    else beans.push("empty");
  }
  return (
    <span className={`inline-flex items-center gap-[3px] text-accent ${className}`}>
      {beans.map((v, i) => <Bean key={i} variant={v} size={size} />)}
      {showValue && (
        <span className="ml-[5px] font-archivo font-extrabold text-ink text-[13px]">
          {score.toFixed(1)}
        </span>
      )}
    </span>
  );
}

export function StampScore({ rating, max = 100, size = 88 }) {
  const score = beanScore(rating, max);
  return (
    <span
      className="inline-flex flex-col items-center justify-center bg-accent text-bg font-archivo font-extrabold"
      style={{ width: size, height: size, borderRadius: "50%" }}
    >
      <span style={{ fontSize: size * 0.34, lineHeight: 1 }}>{score.toFixed(1)}</span>
      <span style={{ fontSize: size * 0.11, letterSpacing: "0.12em" }}>BEAN SCORE</span>
    </span>
  );
}
