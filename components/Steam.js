import React from "react";

export default function Steam({ className = "" }) {
  return (
    <svg className={className} width="20" height="22" viewBox="0 0 20 22" aria-hidden="true" fill="none">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path className="steam-path" d="M6 8 C4 6, 8 4, 6 2" />
        <path className="steam-path" d="M10 8 C8 6, 12 4, 10 2" />
        <path className="steam-path" d="M14 8 C12 6, 16 4, 14 2" />
      </g>
      <rect x="3" y="9" width="12" height="9" fill="currentColor" />
      <path d="M15 10 h2 a2 2 0 0 1 0 4 h-2" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </svg>
  );
}
