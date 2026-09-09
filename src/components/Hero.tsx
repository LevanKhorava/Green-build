import heroBg from "../assets/greenBuildDay.jpg";

const Hero = () => {
  return (
    <section
      className="relative text-white pt-20 overflow-hidden border-b border-[#1f3f3a]/15 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Darkening overlay for text contrast */}
      <div className="absolute inset-0 bg-[#1f3f3a]/60" />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-40">
        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-5 tracking-tight text-white">
          GreenBuild
        </h1>

        {/* Subtitle */}
        <h2 className="text-xl font-bold leading-tight tracking-tight mb-6 text-center text-white">
          შენი ახალი სახლი იწყება აქ —{" "}
          <span className="whitespace-nowrap text-[#26b462]">
            „სახლი ალუბლებზე"
          </span>
        </h2>

        {/* Divider */}
        <div className="flex justify-center">
          <div className="h-0.5 w-24 rounded-full bg-linear-to-r from-transparent via-white to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
