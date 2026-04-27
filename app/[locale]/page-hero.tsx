type Props = {
  eyebrow: string;
  title: string;
  copy: string;
  highlights?: string[];
};

export function PageHero({ eyebrow, title, copy, highlights = [] }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#060608] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(255,121,8,0.22),transparent_28%),radial-gradient(circle_at_18%_78%,rgba(91,72,220,0.22),transparent_26%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,8,0.95)_0%,rgba(6,6,8,0.78)_48%,rgba(6,6,8,0.54)_100%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-24 sm:px-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-10 lg:py-28">
        <div
          data-section-reveal
          data-reveal-from="left"
          className="max-w-4xl"
        >
          <div className="mb-6 flex items-center gap-4 text-xs font-semibold uppercase text-white/68">
            <span className="h-px w-12 bg-[#ff7908]" />
            <span>{eyebrow}</span>
          </div>
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1] text-white sm:text-5xl lg:text-[4.9rem]">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-white/74 sm:text-lg">
            {copy}
          </p>
        </div>

        <aside
          data-section-reveal
          data-reveal-from="right"
          className="border border-white/12 bg-white/[0.045] p-6 text-sm text-white/74 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md"
        >
          <div className="mb-6 h-20 w-px bg-gradient-to-b from-[#ff7908] to-[#5b48dc]" />
          <div className="grid gap-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="border border-white/10 bg-black/20 px-4 py-3"
              >
                {item}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
