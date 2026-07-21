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
    <div className="flex gap-2 mt-4 flex-wrap">
      {statuses.map((s) => (
        <Link
          key={s.label}
          href={s.value ? `/library?status=${s.value}` : "/library"}
          className={`text-sm px-3 py-1 rounded-full border ${
            activeFilter === s.value
              ? "bg-black text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {s.label}
        </Link>
      ))}
    </div>
  );
}