import { eventIcons } from "../lib/eventIcons";
import type { MatchEvent } from "../types/football";

function minuteLabel(event: MatchEvent) {
  if (!event.minute) return "—";
  return event.addedTime ? `${event.minute}+${event.addedTime}'` : `${event.minute}'`;
}

export function MatchEventTimeline({ events }: { events: MatchEvent[] }) {
  if (events.length === 0) {
    return <p className="rounded-2xl bg-white/[0.04] p-4 text-sm text-slate-400">No major events have been reported yet.</p>;
  }

  return (
    <ol className="space-y-2">
      {events.map((event) => (
        <li className="grid grid-cols-[3rem_2rem_1fr] items-start gap-2 rounded-xl bg-white/[0.04] px-3 py-2 text-sm" key={event.id}>
          <span className="font-semibold tabular-nums text-emerald-200">{minuteLabel(event)}</span>
          <span aria-hidden>{eventIcons[event.type]}</span>
          <span className="text-slate-200">{event.description}</span>
        </li>
      ))}
    </ol>
  );
}
