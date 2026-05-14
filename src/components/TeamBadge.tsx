import type { TeamInfo } from "../types/football";

interface TeamBadgeProps {
  team: TeamInfo;
  align?: "left" | "right";
}

export function TeamBadge({ team, align = "left" }: TeamBadgeProps) {
  const initials = team.shortName?.slice(0, 3) ?? team.name.slice(0, 3);

  return (
    <div className={`flex min-w-0 items-center gap-2 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
      {team.logoUrl ? (
        <img className="size-7 rounded-full bg-white/10 object-contain p-1" src={team.logoUrl} alt="" loading="lazy" />
      ) : (
        <div className="grid size-7 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-[10px] font-bold uppercase text-emerald-200">
          {initials}
        </div>
      )}
      <span className="truncate text-sm font-semibold text-white">{team.shortName ?? team.name}</span>
    </div>
  );
}
