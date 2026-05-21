const PLATFORM_COLORS: Record<string, string> = {
  github: "hover:border-neutral-400", twitter: "hover:border-sky-500",
  x: "hover:border-neutral-300", linkedin: "hover:border-blue-500",
  instagram: "hover:border-pink-500", youtube: "hover:border-red-500",
  tiktok: "hover:border-neutral-200", dribbble: "hover:border-pink-400",
  behance: "hover:border-blue-400",
};

interface Props {
  config: {
    title: string; description?: string; availability?: string;
    email: string; phone?: string;
    socials: { platform: string; url: string }[];
  };
}
export function ContactSection({ config }: Props) {
  return (
    <section className="px-12 py-16 bg-neutral-900 text-center">
      <h2 className="text-2xl font-bold text-white mb-4">{config.title || "Get in Touch"}</h2>
      {config.description && <p className="text-neutral-400 max-w-md mx-auto mb-6 text-sm leading-relaxed">{config.description}</p>}
      {config.availability && (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/30 border border-green-800/50 rounded-full text-green-400 text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          {config.availability}
        </div>
      )}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
        {config.email && (
          <a href={`mailto:${config.email}`} className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">{config.email}</a>
        )}
        {config.phone && (
          <a href={`tel:${config.phone}`} className="text-neutral-400 hover:text-white transition-colors">{config.phone}</a>
        )}
      </div>
      {config.socials.length > 0 && (
        <div className="flex gap-3 justify-center flex-wrap">
          {config.socials.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
              className={`px-4 py-2 bg-neutral-800 rounded-lg text-sm text-neutral-300 hover:text-white border border-neutral-700 transition-all capitalize ${PLATFORM_COLORS[s.platform.toLowerCase()] ?? "hover:border-neutral-500"}`}>
              {s.platform}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
