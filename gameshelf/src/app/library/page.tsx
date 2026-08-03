import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LogoutButton from "@/components/LogoutButton";
import GameSearch from "@/components/GameSearch";
import GameCard from "@/components/GameCard";
import StatusFilter from "@/components/StatusFilter";
import LibraryStats from "@/components/LibraryStats";
import LibrarySortControl from "@/components/LibrarySortControl";
import RawgAttribution from "@/components/RawgAttribution";

type Status = "BACKLOG" | "PLAYING" | "COMPLETED" | "DROPPED";

const sortMap: Record<string, object> = {
  title: { title: "asc" },
  rating: { rating: "desc" },
  year: { releaseYear: "desc" },
};

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; sort?: string }>;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const { status, sort } = await searchParams;
  const validStatuses: Status[] = ["BACKLOG", "PLAYING", "COMPLETED", "DROPPED"];
  const activeFilter = validStatuses.includes(status as Status)
    ? (status as Status)
    : undefined;

  const games = await prisma.gameEntry.findMany({
    where: {
      userId: session.user.id,
      ...(activeFilter ? { status: activeFilter } : {}),
    },
    orderBy: sort && sortMap[sort] ? sortMap[sort] : { createdAt: "desc" },
  });

  const allGames = await prisma.gameEntry.findMany({
    where: { userId: session.user.id },
    select: { status: true },
  });

  return (
    <div className="max-w-6xl mx-auto mt-16 p-6 page-fade header-glow">
      <div className="flex justify-between items-end mb-2 pb-4 border-b border-shelf-border">
        <div>
          <h1 className="text-4xl font-logo">
            Respawn<span className="text-shelf-amber">List</span>
          </h1>
          <p className="text-shelf-muted text-sm mt-1.5 font-mono">
            {session.user.name || session.user.email}
          </p>
        </div>
        <LogoutButton />
      </div>

      <LibraryStats games={games} />

      <div className="mt-4">
        <GameSearch />
      </div>

      <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
        <StatusFilter activeFilter={activeFilter} allGames={allGames} />
        <LibrarySortControl />
      </div>

      {games.length === 0 ? (
        <div className="text-center mt-20">
          <div className="text-4xl mb-3 opacity-40">🎮</div>
          <p className="text-shelf-muted">
            {activeFilter ? (
              <>No games with status &quot;{activeFilter}&quot;.</>
            ) : (
              <>Your shelf is empty. Search above to add your first game.</>
            )}
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
          {games.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </ul>
      )}

      <RawgAttribution />
    </div>
  );
}