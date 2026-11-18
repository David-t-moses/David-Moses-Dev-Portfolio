// A small picture of the finished thing, shown beside the code: code on one side, the result on the other.
// Decorative only. Static, so it costs nothing while the canvas runs.
export default function HeroPreview({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`select-none ${className}`}>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 shadow-[0_24px_60px_-20px_rgba(99,102,241,0.45)]">
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5">
          <span className="h-2 w-2 rounded-full bg-slate-600" />
          <span className="h-2 w-2 rounded-full bg-slate-600" />
          <span className="h-2 w-2 rounded-full bg-slate-600" />
          <span className="ml-2 flex h-4 flex-1 items-center rounded bg-white/[0.06] px-2 text-[9px] text-slate-400">yourbusiness.com</span>
          <span className="flex items-center gap-1 text-[9px] text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Live
          </span>
        </div>
        <div className="p-3.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded bg-indigo-400" />
              <span className="h-2 w-9 rounded-full bg-white/60" />
            </span>
            <span className="flex gap-2">
              <span className="h-1.5 w-6 rounded-full bg-white/15" />
              <span className="h-1.5 w-6 rounded-full bg-white/15" />
            </span>
          </div>
          <div className="mt-3.5 grid grid-cols-[1.2fr_1fr] items-center gap-3">
            <div className="space-y-2">
              <span className="block h-2.5 w-full rounded-full bg-white/85" />
              <span className="block h-2.5 w-3/4 rounded-full bg-white/85" />
              <span className="block h-1.5 w-5/6 rounded-full bg-white/15" />
              <span className="mt-1 block h-5 w-14 rounded-full bg-indigo-400 ring-4 ring-indigo-300/20" />
            </div>
            <div className="relative h-[68px] overflow-hidden rounded-lg bg-gradient-to-br from-indigo-400/50 via-violet-400/30 to-sky-400/20">
              <span className="absolute right-2.5 top-2.5 h-4 w-4 rounded-full bg-white/60" />
              <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-9 w-full">
                <path d="M0 60 L25 20 L45 42 L68 10 L100 60 Z" fill="rgba(15,23,42,0.55)" />
              </svg>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["from-indigo-400/45", "from-violet-400/45", "from-sky-400/40"].map((c, i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-white/[0.03] p-1.5">
                <div className={`h-7 rounded bg-gradient-to-br ${c} to-transparent`} />
                <span className="mt-1.5 block h-1.5 w-1/2 rounded-full bg-white/40" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
