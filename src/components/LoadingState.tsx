export function LoadingState({ message = "Loading live data…" }: { message?: string }) {
  return (
    <div className="flex min-h-28 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm text-slate-300">
      <span className="mr-3 size-3 animate-pulse rounded-full bg-emerald-400" />
      {message}
    </div>
  );
}
