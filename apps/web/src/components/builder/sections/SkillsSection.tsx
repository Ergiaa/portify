interface Props {
  config: {
    title: string; description?: string; layout?: "tags" | "bars";
    skills: { name: string; level: number }[];
  };
}
function levelColor(level: number) {
  if (level >= 70) return "from-violet-600 to-indigo-500";
  if (level >= 40) return "from-indigo-600 to-blue-500";
  return "from-neutral-600 to-neutral-500";
}
export function SkillsSection({ config }: Props) {
  const skills = config.skills.length ? config.skills : [{ name: "Skill", level: 80 }];
  const isBars = config.layout === "bars";
  return (
    <section className="px-12 py-14 bg-neutral-950">
      <h2 className="text-2xl font-bold text-white mb-2 text-center">{config.title || "Skills"}</h2>
      {config.description && <p className="text-neutral-400 text-sm text-center mb-8 max-w-xl mx-auto">{config.description}</p>}
      {!config.description && <div className="mb-8" />}
      {isBars ? (
        <div className="max-w-2xl mx-auto grid grid-cols-1 gap-4">
          {skills.map((s) => (
            <div key={s.name}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-neutral-200 font-medium">{s.name}</span>
                <span className="text-neutral-500">{s.level}%</span>
              </div>
              <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r ${levelColor(s.level)}`} style={{ width: `${s.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-3 justify-center">
          {skills.map((s) => (
            <span key={s.name} className={`px-4 py-2 rounded-full text-sm border font-medium ${
              s.level >= 70 ? "bg-violet-900/40 border-violet-700/50 text-violet-200"
              : s.level >= 40 ? "bg-indigo-900/40 border-indigo-700/50 text-indigo-200"
              : "bg-neutral-800 border-neutral-700 text-neutral-300"
            }`}>
              {s.name}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
