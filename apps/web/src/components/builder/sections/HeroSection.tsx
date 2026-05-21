interface Props {
  config: { heading: string; subheading: string; ctaLabel: string; ctaHref: string };
}
export function HeroSection({ config }: Props) {
  return (
    <section className="bg-gradient-to-br from-indigo-900 to-violet-900 px-12 py-20 text-center">
      <h1 className="text-4xl font-bold text-white mb-3">{config.heading || "Your Heading"}</h1>
      <p className="text-lg text-indigo-200 mb-8">{config.subheading || "Your subheading"}</p>
      {config.ctaLabel && (
        <a href={config.ctaHref} className="inline-block px-8 py-3 bg-white text-indigo-900 font-semibold rounded-full hover:bg-indigo-50 transition-colors">
          {config.ctaLabel}
        </a>
      )}
    </section>
  );
}
