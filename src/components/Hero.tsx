import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BuildingInteractive from "./BuildingInteractive";

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
