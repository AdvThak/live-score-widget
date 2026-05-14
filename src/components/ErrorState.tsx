interface ErrorStateProps {
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function ErrorState({ title = "Something went wrong", message, actionLabel, onAction }: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-4 text-sm text-rose-100">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-rose-100/80">{message}</p>
      {actionLabel && onAction ? (
        <button className="mt-3 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20" onClick={onAction} type="button">
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
