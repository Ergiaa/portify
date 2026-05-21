interface Props {
  config: { title: string; email: string; socials: { platform: string; url: string }[] };
}
export function ContactSection({ config }: Props) {
  return (
    <section className="px-12 py-16 bg-neutral-900 text-center">
      <h2 className="text-2xl font-bold text-white mb-6">{config.title || "Get in Touch"}</h2>
      {config.email && (
        <a href={`mailto:${config.email}`} className="text-indigo-400 hover:text-indigo-300 text-lg mb-6 block">
          {config.email}
        </a>
      )}
      {config.socials.length > 0 && (
        <div className="flex gap-4 justify-center flex-wrap">
          {config.socials.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 bg-neutral-800 rounded-lg text-sm text-neutral-300 hover:text-white border border-neutral-700 hover:border-neutral-500 transition-colors capitalize">
              {s.platform}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
