export default function HeroMascot() {
  return (
    <div style={{ width: "100%", maxWidth: "520px" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 680 580"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bodyGrad" cx="45%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#B5D4F4" />
            <stop offset="100%" stopColor="#0C447C" />
          </radialGradient>
          <radialGradient id="faceGrad" cx="45%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#E6F1FB" />
            <stop offset="100%" stopColor="#85B7EB" />
          </radialGradient>
          <radialGradient id="glowRing" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#378ADD" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#185FA5" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#042C53" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lensGrad" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#E6F1FB" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#378ADD" stopOpacity="0.5" />
          </radialGradient>
          <radialGradient id="goldGrad" cx="40%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#FAC775" />
            <stop offset="100%" stopColor="#BA7517" />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="softGlow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <style>{`
          .float {
            animation: floating 3.5s ease-in-out infinite;
            transform-origin: 340px 300px;
          }
          @keyframes floating {
            0%   { transform: translateY(0px); }
            50%  { transform: translateY(-16px); }
            100% { transform: translateY(0px); }
          }
          .glowring {
            animation: glowPulse 3.5s ease-in-out infinite;
          }
          @keyframes glowPulse {
            0%,100% { opacity: 0.4; }
            50%      { opacity: 0.9; }
          }
          .scanline {
            animation: scan 2.5s ease-in-out infinite;
          }
          @keyframes scan {
            0%   { transform: translateY(0px); opacity: 0.8; }
            50%  { transform: translateY(28px); opacity: 0.4; }
            100% { transform: translateY(0px); opacity: 0.8; }
          }
          .spark1 { animation: twinkle 2s ease-in-out infinite; }
          .spark2 { animation: twinkle 2.6s ease-in-out infinite 0.5s; }
          .spark3 { animation: twinkle 1.9s ease-in-out infinite 1s; }
          .spark4 { animation: twinkle 2.3s ease-in-out infinite 0.3s; }
          @keyframes twinkle {
            0%,100% { opacity: 0.15; transform: scale(0.6); }
            50%      { opacity: 1;    transform: scale(1.2); }
          }
          .blink-l, .blink-r {
            animation: blink 5s ease-in-out infinite;
            transform-box: fill-box;
            transform-origin: center;
          }
          @keyframes blink {
            0%,90%,100% { transform: scaleY(0); }
            94%          { transform: scaleY(1); }
          }
          .circuitPulse {
            animation: cpulse 3s ease-in-out infinite;
          }
          @keyframes cpulse {
            0%,100% { stroke-opacity: 0.2; }
            50%      { stroke-opacity: 0.7; }
          }
          .tieFloat {
            animation: tietilt 3.5s ease-in-out infinite;
            transform-origin: 340px 370px;
          }
          @keyframes tietilt {
            0%,100% { transform: rotate(0deg); }
            50%      { transform: rotate(2deg); }
          }
          .magnify {
            animation: magnifyBob 3.5s ease-in-out infinite;
            transform-origin: 460px 340px;
          }
          @keyframes magnifyBob {
            0%,100% { transform: translateY(0px) rotate(0deg); }
            50%      { transform: translateY(-16px) rotate(-4deg); }
          }
        `}</style>

        {/* Ground shadow */}
        <ellipse cx="340" cy="530" rx="100" ry="18" fill="#042C53" opacity="0.13">
          <animate attributeName="rx" values="100;82;100" dur="3.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.13;0.07;0.13" dur="3.5s" repeatCount="indefinite" />
        </ellipse>

        {/* Glow ring */}
        <circle className="glowring" cx="340" cy="420" r="130" fill="url(#glowRing)" />

        {/* Circuit lines */}
        <g className="circuitPulse" fill="none" stroke="#378ADD" strokeWidth="1">
          <polyline points="120,200 120,240 150,240" />
          <circle cx="150" cy="240" r="3" fill="#378ADD" />
          <polyline points="120,260 120,300 100,300" />
          <circle cx="100" cy="300" r="3" fill="#378ADD" />
          <polyline points="560,220 560,260 530,260" />
          <circle cx="530" cy="260" r="3" fill="#378ADD" />
          <polyline points="560,280 560,320 580,320" />
          <circle cx="580" cy="320" r="3" fill="#378ADD" />
          <polyline points="140,380 110,380 110,420" />
          <circle cx="110" cy="420" r="3" fill="#378ADD" />
          <polyline points="540,370 570,370 570,410" />
          <circle cx="570" cy="410" r="3" fill="#378ADD" />
        </g>

        {/* Magnifying glass */}
        <g className="magnify">
          <rect x="468" y="355" width="12" height="55" rx="6" fill="url(#goldGrad)" transform="rotate(35,474,380)" />
          <circle cx="446" cy="320" r="42" fill="none" stroke="url(#goldGrad)" strokeWidth="7" />
          <circle cx="446" cy="320" r="35" fill="url(#lensGrad)" opacity="0.7" />

          <g transform="translate(420,305)">
            <line x1="0" y1="30" x2="50" y2="30" stroke="#185FA5" strokeWidth="1.5" opacity="0.8" />
            <polyline points="5,28 15,18 25,22 35,10 45,14" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
            <circle cx="45" cy="14" r="2.5" fill="#185FA5" />
          </g>

          <g className="scanline">
            <line x1="412" y1="308" x2="480" y2="308" stroke="#378ADD" strokeWidth="1.5" opacity="0.7" strokeDasharray="4,3" />
          </g>

          <ellipse cx="432" cy="308" rx="10" ry="7" fill="white" opacity="0.25" transform="rotate(-20,432,308)" />
        </g>

        {/* Main Character */}
        <g className="float">
          <ellipse cx="340" cy="430" rx="80" ry="30" fill="#0C447C" />
          <rect x="270" y="330" width="140" height="110" rx="30" fill="url(#bodyGrad)" />
          <rect x="318" y="335" width="44" height="90" rx="10" fill="#E6F1FB" />

          <g className="tieFloat">
            <polygon points="340,348 333,365 340,430 347,365" fill="#BA7517" />
            <polygon points="335,348 345,348 347,365 333,365" fill="#EF9F27" />
          </g>

          <polygon points="270,330 318,360 290,330" fill="#185FA5" />
          <polygon points="410,330 362,360 390,330" fill="#185FA5" />

          <circle cx="340" cy="360" r="3" fill="#185FA5" />
          <circle cx="340" cy="376" r="3" fill="#185FA5" />

          <rect x="188" y="320" width="88" height="32" rx="16" fill="url(#bodyGrad)" transform="rotate(-15,232,336)" />
          <ellipse cx="196" cy="360" rx="20" ry="14" fill="#E6F1FB" />
          <rect x="184" y="344" width="24" height="10" rx="5" fill="#E6F1FB" />
          <circle cx="196" cy="344" r="4" fill="url(#goldGrad)" filter="url(#softGlow)" />

          <rect x="404" y="300" width="88" height="32" rx="16" fill="url(#bodyGrad)" transform="rotate(25,448,316)" />
          <rect x="452" y="296" width="24" height="10" rx="5" fill="#E6F1FB" />
          <circle cx="464" cy="296" r="4" fill="url(#goldGrad)" filter="url(#softGlow)" />

          <rect x="320" y="270" width="40" height="28" rx="10" fill="url(#faceGrad)" />
          <ellipse cx="340" cy="248" rx="70" ry="65" fill="url(#faceGrad)" filter="url(#softGlow)" />

          <rect x="268" y="235" width="16" height="30" rx="8" fill="#0C447C" />
          <rect x="396" y="235" width="16" height="30" rx="8" fill="#0C447C" />

          <circle cx="276" cy="235" r="4" fill="#378ADD" filter="url(#glow)">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="404" cy="235" r="4" fill="#EF9F27" filter="url(#glow)">
            <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
          </circle>

          <rect x="308" y="196" width="64" height="20" rx="6" fill="#0C447C" opacity="0.7" />

          <circle cx="322" cy="206" r="3" fill="#378ADD">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="334" cy="206" r="3" fill="#EF9F27">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="346" cy="206" r="3" fill="#378ADD">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="358" cy="206" r="3" fill="#5DCAA5">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
          </circle>

          <ellipse cx="314" cy="252" rx="22" ry="22" fill="#0C447C" opacity="0.9" />
          <ellipse cx="366" cy="252" rx="22" ry="22" fill="#0C447C" opacity="0.9" />

          <circle cx="314" cy="252" r="17" fill="url(#lensGrad)" />
          <circle cx="366" cy="252" r="17" fill="url(#lensGrad)" />

          <circle cx="314" cy="252" r="11" fill="#185FA5" />
          <circle cx="366" cy="252" r="11" fill="#185FA5" />

          <circle cx="314" cy="252" r="6" fill="#042C53" />
          <circle cx="366" cy="252" r="6" fill="#042C53" />

          <circle cx="314" cy="252" r="6" fill="#378ADD" opacity="0.5" filter="url(#glow)">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="366" cy="252" r="6" fill="#378ADD" opacity="0.5" filter="url(#glow)">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
          </circle>

          <circle cx="319" cy="246" r="4" fill="white" opacity="0.8" />
          <circle cx="371" cy="246" r="4" fill="white" opacity="0.8" />

          <ellipse className="blink-l" cx="314" cy="252" rx="17" ry="17" fill="url(#faceGrad)" />
          <ellipse className="blink-r" cx="366" cy="252" rx="17" ry="17" fill="url(#faceGrad)" />

          <circle cx="314" cy="252" r="17" fill="none" stroke="url(#goldGrad)" strokeWidth="2.5" />
          <circle cx="366" cy="252" r="17" fill="none" stroke="url(#goldGrad)" strokeWidth="2.5" />

          <polygon points="340,268 332,280 348,280" fill="url(#goldGrad)" />
          <path d="M318 292 Q340 304 362 292" stroke="#0C447C" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />

          <line x1="288" y1="268" x2="304" y2="268" stroke="#378ADD" strokeWidth="1.2" opacity="0.5" />
          <line x1="288" y1="274" x2="300" y2="274" stroke="#378ADD" strokeWidth="1.2" opacity="0.3" />
          <line x1="376" y1="268" x2="392" y2="268" stroke="#378ADD" strokeWidth="1.2" opacity="0.5" />
          <line x1="380" y1="274" x2="392" y2="274" stroke="#378ADD" strokeWidth="1.2" opacity="0.3" />

          <rect x="296" y="158" width="88" height="40" rx="6" fill="#0C447C" />
          <rect x="278" y="194" width="124" height="12" rx="6" fill="#185FA5" />
          <rect x="296" y="188" width="88" height="8" rx="3" fill="url(#goldGrad)" />
          <rect x="304" y="162" width="20" height="30" rx="4" fill="white" opacity="0.07" />

          <text x="340" y="183" textAnchor="middle" fontFamily="monospace" fontSize="13" fontWeight="bold" fill="#378ADD" filter="url(#softGlow)">
            AI
          </text>
        </g>

        {/* Floating particles */}
        <text className="spark1" x="148" y="240" fontSize="18" fill="#EF9F27" fontFamily="monospace">$</text>
        <text className="spark2" x="510" y="260" fontSize="14" fill="#378ADD" fontFamily="monospace">%</text>
        <text className="spark3" x="135" y="380" fontSize="13" fill="#5DCAA5" fontFamily="monospace">✦</text>
        <text className="spark4" x="515" y="400" fontSize="16" fill="#EF9F27" fontFamily="monospace">✦</text>
        <text className="spark1" x="200" y="460" fontSize="11" fill="#378ADD" fontFamily="monospace">₹</text>
        <text className="spark3" x="490" y="460" fontSize="11" fill="#EF9F27" fontFamily="monospace">§</text>
      </svg>
    </div>
  );
}