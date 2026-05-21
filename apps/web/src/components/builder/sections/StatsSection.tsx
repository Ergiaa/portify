interface Props {
  config: {
    title: string; description?: string; layout?: "inline" | "cards";
    stats: { number: string; label: string; icon?: string }[];
  };
}
export function StatsSection({ config }: Props) {
  const stats = config.stats.length ? config.stats : [{ number: "0", label: "Label", icon: "" }];
  const isCards = config.layout === "cards";
  return (
    <section className="px-12 py-14 bg-neutral-900">
      {config.title && <h2 className="text-2xl font-bold text-white mb-2 text-center">{config.title}</h2>}
      {config.description && <p className="text-neutral-400 text-sm text-center mb-10 max-w-xl mx-auto">{config.description}</p>}
      {!config.description && config.title && <div className="mb-10" />}
      <div className={`flex flex-wrap gap-6 justify-center ${isCards ? "max-w-3xl mx-auto" : ""}`}>
        {stats.map((stat, i) => isCards ? (
          <div key={i} className="flex-1 min-w-[140px] p-6 bg-neutral-800 border border-neutral-700 rounded-2xl text-center">
            {stat.icon && <p className="text-3xl mb-3">{stat.icon}</p>}
            <p className="text-4xl font-bold text-white mb-1">{stat.number}</p>
            <p className="text-neutral-400 text-sm">{stat.label}</p>
          </div>
        ) : (
          <div key={i} className="text-center px-4">
            {stat.icon && <p className="text-2xl mb-2">{stat.icon}</p>}
            <p className="text-6xl font-bold text-indigo-400">{stat.number}</p>
            <p className="text-neutral-400 mt-2 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
