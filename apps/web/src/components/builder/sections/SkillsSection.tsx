interface Props {
  config: { title: string; skills: string[] };
}
export function SkillsSection({ config }: Props) {
  return (
    <section className="px-12 py-14 bg-neutral-950">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">{config.title || "Skills"}</h2>
      <div className="flex flex-wrap gap-3 justify-center">
        {(config.skills.length ? config.skills : ["Skill 1", "Skill 2"]).map((skill) => (
          <span key={skill} className="px-4 py-2 bg-neutral-800 text-neutral-200 rounded-full text-sm border border-neutral-700">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
