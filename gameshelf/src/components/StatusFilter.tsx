import Link from "next/link";

const statuses = [
  { label: "All", value: undefined },
  { label: "Backlog", value: "BACKLOG" },
  { label: "Playing", value: "PLAYING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Dropped", value: "DROPPED" },
];

export default function StatusFilter({ activeFilter }: { activeFilter?: string }) {
  return (
    <div className="flex gap-2 mt-4 flex-wrap font-mono text-xs">
      {statuses.map((s) => (
        <Link
          key={s.label}
          href={s.value ? `/library?status=${s.value}` : "/library"}
          className={`px-3 py-1 rounded-full border transition-colors ${
            activeFilter === s.value
              ? "bg-shelf-amber text-shelf-bg border-shelf-amber"
              : "border-shelf-border text-shelf-muted hover:border-shelf-amber hover:text-shelf-amber"
          }`}
        >
          {s.label}
        </Link>
      ))}
    </div>
  );
}