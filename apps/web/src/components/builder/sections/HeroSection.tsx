interface Props {
  config: {
    heading: string; subheading: string; tagline?: string; avatarUrl?: string;
    layout?: "centered" | "split"; ctaLabel: string; ctaHref: string;
    cta2Label?: string; cta2Href?: string;
  };
}
export function HeroSection({ config }: Props) {
  const isSplit = config.layout === "split";
  return (
    <section className="bg-gradient-to-br from-indigo-900 to-violet-900 px-12 py-20 min-h-[360px] flex items-center">
      <div className={`w-full max-w-5xl mx-auto flex ${isSplit ? "flex-row items-center gap-16" : "flex-col items-center text-center"}`}>
        {/* Text side */}
        <div className={isSplit ? "flex-1" : ""}>
          {config.tagline && (
            <p className="text-indigo-300 text-sm font-medium tracking-widest uppercase mb-3">{config.tagline}</p>
          )}
          {/* centered layout: avatar above heading */}
          {!isSplit && config.avatarUrl && (
            <img src={config.avatarUrl} alt="" className="w-24 h-24 rounded-full object-cover mx-auto mb-6 ring-4 ring-white/20" />
          )}
          <h1 className="text-5xl font-bold text-white leading-tight mb-4">{config.heading || "Your Name"}</h1>
          <p className="text-lg text-indigo-200 mb-8 max-w-xl">{config.subheading || "Your tagline here"}</p>
          <div className="flex flex-wrap gap-4 justify-center" style={isSplit ? {justifyContent:"flex-start"} : {}}>
            {config.ctaLabel && (
              <a href={config.ctaHref} className="px-7 py-3 bg-white text-indigo-900 font-semibold rounded-full text-sm hover:bg-indigo-50 transition-colors">
                {config.ctaLabel}
              </a>
            )}
            {config.cta2Label && (
              <a href={config.cta2Href} className="px-7 py-3 border-2 border-white text-white font-semibold rounded-full text-sm hover:bg-white/10 transition-colors">
                {config.cta2Label}
              </a>
            )}
          </div>
        </div>
        {/* Split layout: avatar on right */}
        {isSplit && config.avatarUrl && (
          <div className="shrink-0">
            <img src={config.avatarUrl} alt="" className="w-56 h-56 rounded-full object-cover ring-4 ring-white/20" />
          </div>
        )}
        {isSplit && !config.avatarUrl && (
          <div className="w-56 h-56 rounded-full bg-white/10 shrink-0 flex items-center justify-center text-white/30 text-sm">Photo</div>
        )}
      </div>
    </section>
  );
}
