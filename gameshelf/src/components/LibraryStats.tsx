type Game = { status: string };

export default function LibraryStats({ games }: { games: Game[] }) {
  const counts = {
    PLAYING: games.filter((g) => g.status === "PLAYING").length,
    BACKLOG: games.filter((g) => g.status === "BACKLOG").length,
    COMPLETED: games.filter((g) => g.status === "COMPLETED").length,
    DROPPED: games.filter((g) => g.status === "DROPPED").length,
  };

  return (
    <div className="flex flex-wrap gap-4 mt-4 font-mono text-xs text-shelf-muted">
      <span>{games.length} total</span>
      <span className="text-shelf-amber">{counts.PLAYING} playing</span>
      <span>{counts.BACKLOG} backlog</span>
      <span className="text-shelf-teal">{counts.COMPLETED} completed</span>
      <span className="text-shelf-red">{counts.DROPPED} dropped</span>
    </div>
  );
}