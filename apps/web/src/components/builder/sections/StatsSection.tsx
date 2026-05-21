interface Props {
  config: { title: string; stats: { number: string; label: string }[] };
}
export function StatsSection({ config }: Props) {
  return (
    <section className="px-12 py-14 bg-neutral-900">
      {config.title && <h2 className="text-2xl font-bold text-white mb-8 text-center">{config.title}</h2>}
      <div className="flex flex-wrap gap-8 justify-center">
        {(config.stats.length ? config.stats : [{ number: "0", label: "Label" }]).map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-5xl font-bold text-white">{stat.number}</p>
            <p className="text-neutral-400 mt-1 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
