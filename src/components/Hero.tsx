import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BuildingInteractive from "./BuildingInteractive";

const buildings = [
  { left: "3%", width: 48, height: 180, delay: 0.5, floors: 7 },
  { left: "10%", width: 36, height: 130, delay: 1.0, floors: 5 },
  { right: "3%", width: 44, height: 160, delay: 0.8, floors: 6 },
  { right: "11%", width: 32, height: 110, delay: 1.3, floors: 4 },
];

const bricks = [
  { left: "18%", bottom: "12%", w: 20, h: 10, delay: 1.8 },
  { left: "20%", bottom: "12%", w: 20, h: 10, delay: 2.1 },
  { left: "19%", bottom: "16%", w: 20, h: 10, delay: 2.5 },
  { right: "18%", bottom: "14%", w: 18, h: 9, delay: 2.0 },
  { right: "16%", bottom: "14%", w: 18, h: 9, delay: 2.3 },
  { right: "17%", bottom: "18%", w: 18, h: 9, delay: 2.7 },
];

const beams = [
  { left: "14%", top: "55%", width: 70, delay: 1.5 },
  { right: "13%", top: "50%", width: 55, delay: 2.0 },
  { left: "6%", top: "72%", width: 45, delay: 2.4 },
];

const sparks = [
  { x: "-12px", y: "-18px", delay: 0 },
  { x: "15px", y: "-14px", delay: 0.1 },
  { x: "-8px", y: "-22px", delay: 0.2 },
  { x: "10px", y: "-20px", delay: 0.15 },
  { x: "-18px", y: "-10px", delay: 0.25 },
  { x: "20px", y: "-8px", delay: 0.05 },
  { x: "-5px", y: "-25px", delay: 0.18 },
  { x: "8px", y: "-16px", delay: 0.3 },
];

const dustClouds = [
  { left: "5%", delay: 2.0, size: 20 },
  { left: "8%", delay: 2.4, size: 16 },
  { right: "5%", delay: 2.2, size: 18 },
  { right: "9%", delay: 2.6, size: 14 },
];

const Hero = () => {
  const navigate = useNavigate();
  const [gateOpen, setGateOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setGateOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative  bg-[#26b462] text-white pt-20 overflow-hidden">
      {/* ── Gate overlay ── */}
      <div className="fixed inset-0 z-40 pointer-events-none">
        <div
          className="absolute inset-y-0 left-0 w-1/2 bg-linear-to-r from-green-950 to-green-900"
          style={{
            animation: gateOpen
              ? "gate-left 1.2s cubic-bezier(0.76,0,0.24,1) forwards"
              : "none",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-1/2 bg-linear-to-l from-green-950 to-green-900"
          style={{
            animation: gateOpen
              ? "gate-right 1.2s cubic-bezier(0.76,0,0.24,1) forwards"
              : "none",
          }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            animation: gateOpen
              ? "gate-logo-fade 0.8s ease-out forwards"
              : "none",
          }}
        >
          <span className="text-4xl md:text-6xl font-bold text-green-400/80 tracking-tight">
            GreenBuild
          </span>
        </div>
      </div>

      {/* Blueprint grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating orbs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 md:w-96 md:h-96 bg-green-400/20 rounded-full blur-3xl animate-[pulse-glow_6s_ease-in-out_infinite]" />
      <div className="absolute top-1/3 -right-16 w-64 h-64 md:w-80 md:h-80 bg-emerald-300/15 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]" />
      <div className="absolute -bottom-24 left-1/4 w-56 h-56 md:w-72 md:h-72 bg-teal-400/10 rounded-full blur-3xl animate-[float-reverse_10s_ease-in-out_infinite]" />

      {/* ── Construction: Building silhouettes rising from bottom ── */}
      {buildings.map((b, i) => (
        <div
          key={i}
          className="absolute bottom-0 origin-bottom hidden md:block"
          style={{
            left: "left" in b ? b.left : undefined,
            right: "right" in b ? b.right : undefined,
            width: b.width,
            height: b.height,
            animation: `build-up 2s ease-out ${b.delay}s both`,
          }}
        >
          {/* Building body */}
          <div className="w-full h-full bg-green-300/[0.07] rounded-t-sm relative">
            {/* Floor lines */}
            {Array.from({ length: b.floors }, (_, fi) => (
              <div
                key={fi}
                className="absolute w-full border-t border-green-300/10"
                style={{
                  bottom: `${((fi + 1) / (b.floors + 1)) * 100}%`,
                  animation: `brick-place 0.4s ease-out ${b.delay + 0.3 + fi * 0.15}s both`,
                }}
              />
            ))}
            {/* Windows */}
            {Array.from({ length: b.floors }, (_, fi) =>
              Array.from({ length: 3 }, (_, wi) => (
                <div
                  key={`${fi}-${wi}`}
                  className="absolute w-1.5 h-2 bg-green-300/10 rounded-[1px]"
                  style={{
                    bottom: `${((fi + 0.5) / (b.floors + 1)) * 100}%`,
                    left: `${25 + wi * 25}%`,
                    animation: `brick-place 0.3s ease-out ${b.delay + 0.8 + fi * 0.12 + wi * 0.05}s both`,
                  }}
                />
              )),
            )}
          </div>
        </div>
      ))}

      {/* ── Construction: Crane (left side) ── */}
      <div className="absolute top-8 left-[6%] hidden md:block opacity-[0.09]">
        <svg
          width="120"
          height="280"
          viewBox="0 0 120 280"
          fill="none"
          className="text-green-200"
        >
          {/* Vertical mast */}
          <rect x="16" y="40" width="4" height="240" fill="currentColor" />
          {/* Mast cross-braces */}
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i}>
              <line
                x1="16"
                y1={70 + i * 28}
                x2="20"
                y2={42 + i * 28}
                stroke="currentColor"
                strokeWidth="1"
              />
              <line
                x1="16"
                y1={42 + i * 28}
                x2="20"
                y2={70 + i * 28}
                stroke="currentColor"
                strokeWidth="1"
              />
            </g>
          ))}
          {/* Horizontal jib */}
          <rect x="18" y="38" width="100" height="3" fill="currentColor" />
          {/* Counter-jib */}
          <rect x="0" y="38" width="18" height="3" fill="currentColor" />
          {/* Counter weight */}
          <rect x="0" y="42" width="10" height="8" fill="currentColor" rx="1" />
          {/* Cabin */}
          <rect
            x="12"
            y="42"
            width="12"
            height="10"
            fill="currentColor"
            rx="1"
          />
          {/* Top mast */}
          <line
            x1="18"
            y1="38"
            x2="18"
            y2="20"
            stroke="currentColor"
            strokeWidth="2"
          />
          {/* Top support cables */}
          <line
            x1="18"
            y1="20"
            x2="118"
            y2="38"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1="18"
            y1="20"
            x2="0"
            y2="38"
            stroke="currentColor"
            strokeWidth="1"
          />
          {/* Swinging hook cable + hook */}
          <g
            style={{
              transformOrigin: "90px 40px",
              animation: "crane-swing 4s ease-in-out infinite",
            }}
          >
            <line
              x1="90"
              y1="41"
              x2="90"
              y2="90"
              stroke="currentColor"
              strokeWidth="1.5"
              style={{ animation: "crane-cable 4s ease-in-out infinite" }}
            />
            {/* Hook */}
            <path
              d="M87 90 L90 90 L90 98 Q90 102 86 100 L85 99"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          </g>
        </svg>
      </div>

      {/* ── Construction: Crane (right side, smaller) ── */}
      <div className="absolute top-20 right-[5%] hidden lg:block opacity-[0.07] scale-x-[-1]">
        <svg
          width="80"
          height="200"
          viewBox="0 0 120 280"
          fill="none"
          className="text-green-200"
        >
          <rect x="16" y="60" width="4" height="220" fill="currentColor" />
          <rect x="18" y="58" width="95" height="3" fill="currentColor" />
          <rect x="0" y="58" width="18" height="3" fill="currentColor" />
          <rect x="0" y="62" width="10" height="8" fill="currentColor" rx="1" />
          <rect
            x="12"
            y="62"
            width="12"
            height="10"
            fill="currentColor"
            rx="1"
          />
          <line
            x1="18"
            y1="58"
            x2="18"
            y2="40"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="18"
            y1="40"
            x2="113"
            y2="58"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1="18"
            y1="40"
            x2="0"
            y2="58"
            stroke="currentColor"
            strokeWidth="1"
          />
          <g
            style={{
              transformOrigin: "75px 60px",
              animation: "crane-swing 5s ease-in-out 1s infinite",
            }}
          >
            <line
              x1="75"
              y1="61"
              x2="75"
              y2="110"
              stroke="currentColor"
              strokeWidth="1.5"
              style={{ animation: "crane-cable 5s ease-in-out 1s infinite" }}
            />
            <path
              d="M72 110 L75 110 L75 118 Q75 122 71 120 L70 119"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          </g>
        </svg>
      </div>

      {/* ── Construction: Scaffold lines on sides ── */}
      <svg className="absolute bottom-0 left-0 w-full h-full pointer-events-none hidden md:block">
        {/* Left scaffold */}
        {[0, 1, 2].map((i) => (
          <g key={`ls-${i}`}>
            <line
              x1={20 + i * 12}
              y1="100%"
              x2={20 + i * 12}
              y2="60%"
              stroke="rgba(134,239,172,0.08)"
              strokeWidth="1"
              strokeDasharray="200"
              style={{
                animation: `scaffold-draw 2s ease-out ${0.5 + i * 0.3}s both`,
              }}
            />
          </g>
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`lh-${i}`}
            x1="18"
            y1={`${65 + i * 8}%`}
            x2="46"
            y2={`${65 + i * 8}%`}
            stroke="rgba(134,239,172,0.06)"
            strokeWidth="1"
            strokeDasharray="200"
            style={{
              animation: `scaffold-draw 1.5s ease-out ${1 + i * 0.2}s both`,
            }}
          />
        ))}
        {/* Right scaffold */}
        {[0, 1, 2].map((i) => (
          <g key={`rs-${i}`}>
            <line
              x1={`calc(100% - ${20 + i * 12}px)`}
              y1="100%"
              x2={`calc(100% - ${20 + i * 12}px)`}
              y2="65%"
              stroke="rgba(134,239,172,0.08)"
              strokeWidth="1"
              strokeDasharray="200"
              style={{
                animation: `scaffold-draw 2s ease-out ${0.8 + i * 0.3}s both`,
              }}
            />
          </g>
        ))}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={`rh-${i}`}
            x1={`calc(100% - 18px)`}
            y1={`${70 + i * 8}%`}
            x2={`calc(100% - 46px)`}
            y2={`${70 + i * 8}%`}
            stroke="rgba(134,239,172,0.06)"
            strokeWidth="1"
            strokeDasharray="200"
            style={{
              animation: `scaffold-draw 1.5s ease-out ${1.2 + i * 0.2}s both`,
            }}
          />
        ))}
      </svg>

      {/* ── Construction: Falling bricks stacking ── */}
      {bricks.map((b, i) => (
        <div
          key={`brick-${i}`}
          className="absolute hidden md:block bg-green-300/[0.07] rounded-xs"
          style={{
            left: "left" in b ? b.left : undefined,
            right: "right" in b ? b.right : undefined,
            bottom: b.bottom,
            width: b.w,
            height: b.h,
            animation: `brick-fall 0.8s cubic-bezier(0.34,1.56,0.64,1) ${b.delay}s both`,
          }}
        />
      ))}

      {/* ── Construction: Steel beams being lifted ── */}
      {beams.map((b, i) => (
        <div
          key={`beam-${i}`}
          className="absolute hidden md:block rounded-full"
          style={{
            left: "left" in b ? b.left : undefined,
            right: "right" in b ? b.right : undefined,
            top: b.top,
            width: b.width,
            height: 3,
            background:
              "linear-gradient(90deg, transparent, rgba(134,239,172,0.12), transparent)",
            animation: `beam-lift 1.2s ease-out ${b.delay}s both`,
          }}
        />
      ))}

      {/* ── Construction: Measurement / dimension lines ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block">
        {/* Left vertical measurement */}
        <g>
          <line
            x1="58"
            y1="35%"
            x2="58"
            y2="80%"
            stroke="rgba(134,239,172,0.12)"
            strokeWidth="0.5"
            strokeDasharray="100"
            style={{ animation: "measure-line 2s ease-out 1.5s both" }}
          />
          <line
            x1="52"
            y1="35%"
            x2="64"
            y2="35%"
            stroke="rgba(134,239,172,0.1)"
            strokeWidth="0.5"
            style={{ animation: "measure-line 1s ease-out 2s both" }}
          />
          <line
            x1="52"
            y1="80%"
            x2="64"
            y2="80%"
            stroke="rgba(134,239,172,0.1)"
            strokeWidth="0.5"
            style={{ animation: "measure-line 1s ease-out 2s both" }}
          />
        </g>
        {/* Right vertical measurement */}
        <g>
          <line
            x1="calc(100% - 58px)"
            y1="40%"
            x2="calc(100% - 58px)"
            y2="75%"
            stroke="rgba(134,239,172,0.12)"
            strokeWidth="0.5"
            strokeDasharray="100"
            style={{ animation: "measure-line 2s ease-out 1.8s both" }}
          />
          <line
            x1="calc(100% - 52px)"
            y1="40%"
            x2="calc(100% - 64px)"
            y2="40%"
            stroke="rgba(134,239,172,0.1)"
            strokeWidth="0.5"
            style={{ animation: "measure-line 1s ease-out 2.3s both" }}
          />
          <line
            x1="calc(100% - 52px)"
            y1="75%"
            x2="calc(100% - 64px)"
            y2="75%"
            stroke="rgba(134,239,172,0.1)"
            strokeWidth="0.5"
            style={{ animation: "measure-line 1s ease-out 2.3s both" }}
          />
        </g>
      </svg>

      {/* ── Construction: Welding sparks (left building area) ── */}
      <div
        className="absolute hidden md:block"
        style={{ left: "7%", top: "52%" }}
      >
        <div
          className="w-3 h-3 rounded-full bg-yellow-300/60 blur-[2px]"
          style={{ animation: "weld-glow 3s ease-in-out 2s infinite" }}
        />
        {sparks.map((s, i) => (
          <div
            key={`spark-${i}`}
            className="absolute top-1 left-1 w-1 h-1 rounded-full bg-yellow-200"
            style={
              {
                "--spark-x": s.x,
                "--spark-y": s.y,
                animation: `weld-spark 0.6s ease-out ${2 + s.delay}s infinite`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* ── Construction: Welding sparks (right building area) ── */}
      <div
        className="absolute hidden lg:block"
        style={{ right: "8%", top: "45%" }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full bg-yellow-300/50 blur-[2px]"
          style={{ animation: "weld-glow 3.5s ease-in-out 3s infinite" }}
        />
        {sparks.slice(0, 5).map((s, i) => (
          <div
            key={`spark-r-${i}`}
            className="absolute top-1 left-1 w-1 h-1 rounded-full bg-yellow-200"
            style={
              {
                "--spark-x": s.x,
                "--spark-y": s.y,
                animation: `weld-spark 0.5s ease-out ${3 + s.delay}s infinite`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* ── Construction: Dust clouds at base ── */}
      {dustClouds.map((d, i) => (
        <div
          key={`dust-${i}`}
          className="absolute bottom-[2%] hidden md:block rounded-full bg-green-200/10 blur-sm"
          style={{
            left: "left" in d ? d.left : undefined,
            right: "right" in d ? d.right : undefined,
            width: d.size,
            height: d.size,
            animation: `dust-puff 2.5s ease-out ${d.delay}s infinite`,
          }}
        />
      ))}

      {/* ── Construction: Concrete mixer (bottom left) ── */}
      <div className="absolute bottom-[6%] left-[2%] hidden md:block opacity-[0.1]">
        <svg
          width="50"
          height="40"
          viewBox="0 0 50 40"
          fill="none"
          className="text-green-200"
        >
          {/* Wheels */}
          <circle
            cx="14"
            cy="36"
            r="4"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            cx="36"
            cy="36"
            r="4"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Chassis */}
          <rect x="8" y="30" width="34" height="4" fill="currentColor" rx="1" />
          {/* Drum */}
          <g
            style={{
              transformOrigin: "25px 20px",
              animation: "mixer-spin 2s linear infinite",
            }}
          >
            <ellipse
              cx="25"
              cy="20"
              rx="14"
              ry="10"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <line
              x1="15"
              y1="14"
              x2="35"
              y2="26"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <line
              x1="15"
              y1="26"
              x2="35"
              y2="14"
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </g>
          {/* Chute */}
          <line
            x1="38"
            y1="16"
            x2="48"
            y2="12"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* ── Construction: Elevator on left building ── */}
      <div className="absolute left-[4.5%] bottom-[22%] hidden md:block opacity-[0.08]">
        <svg
          width="16"
          height="100"
          viewBox="0 0 16 100"
          className="text-green-200"
        >
          {/* Rails */}
          <line
            x1="2"
            y1="0"
            x2="2"
            y2="100"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1="14"
            y1="0"
            x2="14"
            y2="100"
            stroke="currentColor"
            strokeWidth="1"
          />
          {/* Cross-braces */}
          {Array.from({ length: 6 }, (_, i) => (
            <g key={i}>
              <line
                x1="2"
                y1={i * 18}
                x2="14"
                y2={i * 18 + 9}
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <line
                x1="14"
                y1={i * 18}
                x2="2"
                y2={i * 18 + 9}
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </g>
          ))}
          {/* Moving platform */}
          <g style={{ animation: "elevator-move 4s ease-in-out infinite" }}>
            <rect
              x="0"
              y="70"
              width="16"
              height="10"
              fill="currentColor"
              rx="1"
            />
            <rect
              x="4"
              y="62"
              width="8"
              height="8"
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
            />
          </g>
        </svg>
      </div>

      {/* ── Construction: Hammering on right building ── */}
      <div
        className="absolute hidden md:block opacity-[0.1]"
        style={{ right: "12%", top: "38%" }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          className="text-green-200"
          style={{
            transformOrigin: "10px 18px",
            animation: "hammer-hit 1.5s ease-in-out infinite",
          }}
        >
          <rect
            x="9"
            y="6"
            width="2"
            height="14"
            fill="currentColor"
            rx="0.5"
          />
          <rect x="4" y="2" width="12" height="6" fill="currentColor" rx="1" />
        </svg>
      </div>

      {/* ── Construction: City skyline silhouette at bottom ── */}
      <div
        className="absolute bottom-0 left-0 w-full hidden md:block"
        style={{ animation: "skyline-reveal 2.5s ease-out 0.3s both" }}
      >
        <svg
          viewBox="0 0 1200 80"
          className="w-full h-auto"
          preserveAspectRatio="none"
          fill="rgba(134,239,172,0.04)"
        >
          <path d="M0 80 L0 55 L30 55 L30 40 L45 40 L45 55 L60 55 L60 30 L70 30 L70 20 L80 20 L80 30 L95 30 L95 55 L120 55 L120 45 L140 45 L140 55 L160 55 L160 35 L175 35 L175 55 L200 55 L200 80 Z" />
          <path d="M1200 80 L1200 50 L1170 50 L1170 35 L1155 35 L1155 50 L1130 50 L1130 25 L1120 25 L1120 15 L1110 15 L1110 25 L1095 25 L1095 50 L1070 50 L1070 40 L1050 40 L1050 50 L1030 50 L1030 30 L1015 30 L1015 50 L1000 50 L1000 80 Z" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 pb-0">
        {/* Badge */}
        <div
          className="flex justify-center mb-6 opacity-0"
          style={{
            animation: gateOpen
              ? "fadeSlideUp 0.6s ease-out 0.6s both"
              : "none",
          }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border border-green-400/30 bg-green-400/10 text-green-200 backdrop-blur-sm"
            style={{
              backgroundImage:
                "linear-gradient(110deg, transparent 30%, rgba(74,222,128,0.15) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
              animation: gateOpen
                ? "shimmer 3s ease-in-out infinite 1.2s"
                : "none",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            მწვანე მშენებლობა
          </span>
        </div>

        {/* Heading */}
        <h1
          className="text-5xl md:text-7xl font-bold text-center mb-5 opacity-0 tracking-tight"
          style={{
            animation: gateOpen
              ? "fadeSlideUp 0.6s ease-out 0.8s both"
              : "none",
          }}
        >
          <span className="bg-linear-to-r from-white via-green-100 to-emerald-200 bg-clip-text text-transparent">
            GreenBuild
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-base md:text-xl leading-relaxed max-w-2xl mx-auto text-green-100/80 text-center mb-8 opacity-0"
          style={{
            animation: gateOpen ? "fadeSlideUp 0.6s ease-out 1s both" : "none",
          }}
        >
          ჩვენ ვქმნით მდგრად და ეკოლოგიურად სუფთა სამშენებლო გადაწყვეტილებებს.
          Green Build — თქვენი საიმედო პარტნიორი მწვანე მშენებლობაში.
        </p>

        {/* Glowing divider */}
        <div
          className="flex justify-center mb-10 opacity-0"
          style={{
            animation: gateOpen
              ? "fadeSlideUp 0.6s ease-out 1.1s both"
              : "none",
          }}
        >
          <div
            className="h-0.5 rounded-full bg-linear-to-r from-transparent via-green-400 to-transparent"
            style={{
              animation: gateOpen
                ? "glow-line 3s ease-in-out infinite 1.7s"
                : "none",
            }}
          />
        </div>

        {/* Building */}
        <div
          className="max-w-2xl mx-auto opacity-0"
          style={{
            animation: gateOpen
              ? "fadeSlideUp 0.8s ease-out 1.2s both"
              : "none",
          }}
        >
          <div className="group relative rounded-2xl transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(74,222,128,0.15)]">
            <BuildingInteractive
              onFloorClick={(floor) =>
                navigate(`/projects/1/floor/${floor.id}`)
              }
            />
          </div>
          <p
            className="text-center text-green-200/50 text-sm mt-4 opacity-0"
            style={{
              animation: gateOpen
                ? "fadeSlideUp 0.6s ease-out 1.5s both"
                : "none",
            }}
          >
            აირჩიეთ სართული დეტალების სანახავად
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
