import React from "react";

export default function AnalyzerMascot() {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <svg
        width="260"
        height="260"
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="face" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#2563eb" />
          </radialGradient>

          <radialGradient id="body" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#bbf7d0" />
            <stop offset="100%" stopColor="#16a34a" />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Floating animation */}
        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 0 -12; 0 0"
            dur="3s"
            repeatCount="indefinite"
          />

          {/* Body */}
          <rect
            x="90"
            y="160"
            width="120"
            height="90"
            rx="28"
            fill="url(#body)"
          />

          {/* Face */}
          <circle cx="150" cy="120" r="70" fill="url(#face)" filter="url(#glow)" />

          {/* Eyes */}
          <circle cx="125" cy="120" r="18" fill="#0f172a" opacity="0.9" />
          <circle cx="175" cy="120" r="18" fill="#0f172a" opacity="0.9" />

          <circle cx="125" cy="120" r="8" fill="#22c55e" filter="url(#glow)" />
          <circle cx="175" cy="120" r="8" fill="#22c55e" filter="url(#glow)" />

          {/* Smile */}
          <path
            d="M125 150 Q150 170 175 150"
            stroke="#0f172a"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />

          {/* Head antenna */}
          <line
            x1="150"
            y1="45"
            x2="150"
            y2="20"
            stroke="#22c55e"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="150" cy="18" r="10" fill="#22c55e" filter="url(#glow)" />

          {/* Mini chart on body */}
          <rect
            x="110"
            y="185"
            width="80"
            height="40"
            rx="12"
            fill="rgba(15,23,42,0.4)"
          />
          <polyline
            points="120,215 135,205 150,212 165,195 180,202"
            fill="none"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}