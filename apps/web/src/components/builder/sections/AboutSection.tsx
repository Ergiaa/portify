interface Props {
  config: { bio: string; photoUrl: string };
}
export function AboutSection({ config }: Props) {
  return (
    <section className="px-12 py-16 bg-neutral-900">
      <div className="flex gap-10 items-center max-w-3xl mx-auto">
        {config.photoUrl ? (
          <img src={config.photoUrl} alt="Profile" className="w-32 h-32 rounded-full object-cover shrink-0" />
        ) : (
          <div className="w-32 h-32 rounded-full bg-neutral-700 shrink-0 flex items-center justify-center text-neutral-500 text-sm">Photo</div>
        )}
        <p className="text-neutral-300 leading-relaxed">{config.bio || "Your bio here."}</p>
      </div>
    </section>
  );
}
