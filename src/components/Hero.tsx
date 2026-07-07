import buildingImg from "../assets/greenBuild.png";

const Hero = () => {
  return (
    <section className="relative bg-white text-[#1f3f3a] pt-20 overflow-hidden border-b border-[#1f3f3a]/15">
      {/* Blueprint grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(31,63,58,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(31,63,58,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 pb-16 md:pb-24">
        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-5 tracking-tight text-[#1f3f3a]">
          GreenBuild
        </h1>

        {/* Subtitle */}
        <h2 className="text-xl font-bold leading-tight tracking-tight mb-6 text-center text-[#1f3f3a]">
          შენი ახალი სახლი იწყება აქ —{" "}
          <span className="whitespace-nowrap text-[#26b462]">
            „სახლი ალუბლებზე"
          </span>
        </h2>

        {/* Divider */}
        <div className="flex justify-center mb-10">
          <div className="h-0.5 w-24 rounded-full bg-linear-to-r from-transparent via-[#1f3f3a] to-transparent" />
        </div>

        {/* Building (static image) */}
        <div className="max-w-2xl mx-auto">
          <img
            src={buildingImg}
            alt="სახლი ალუბლებზე"
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
