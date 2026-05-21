interface Props {
  config: {
    title?: string; name?: string; role?: string; bio: string; photoUrl: string;
    photoPosition?: "left" | "right"; highlights?: { label: string; value: string }[];
    ctaLabel?: string; ctaHref?: string;
  };
}
export function AboutSection({ config }: Props) {
  const photoEl = config.photoUrl
    ? <img src={config.photoUrl} alt="Profile" className="w-40 h-40 rounded-full object-cover shrink-0 ring-4 ring-neutral-700" />
    : <div className="w-40 h-40 rounded-full bg-neutral-700 shrink-0 flex items-center justify-center text-neutral-500 text-sm">Photo</div>;

  const textEl = (
    <div className="flex-1 min-w-0">
      <h2 className="text-2xl font-bold text-white mb-4">{config.title || "About me"}</h2>
      {config.name && <p className="text-xl font-semibold text-white mb-0.5">{config.name}</p>}
      {config.role && <p className="text-sm text-indigo-400 font-medium mb-4">{config.role}</p>}
      <p className="text-neutral-300 leading-relaxed mb-5">{config.bio || "Your bio here."}</p>
      {config.highlights && config.highlights.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {config.highlights.map((h, i) => (
            <span key={i} className="text-xs px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-full text-neutral-300">
              <span className="text-neutral-500">{h.label}</span> · {h.value}
            </span>
          ))}
        </div>
      )}
      {config.ctaLabel && (
        <a href={config.ctaHref} className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
          {config.ctaLabel} →
        </a>
      )}
    </div>
  );

  const isRight = config.photoPosition === "right";
  return (
    <section className="px-12 py-16 bg-neutral-900">
      <div className={`flex gap-12 items-start max-w-4xl mx-auto ${isRight ? "flex-row-reverse" : "flex-row"}`}>
        {photoEl}
        {textEl}
      </div>
    </section>
  );
}
