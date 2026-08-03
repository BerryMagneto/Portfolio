import RawgAttribution from "@/components/RawgAttribution";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LogoutButton from "@/components/LogoutButton";
import GameSearch from "@/components/GameSearch";
import GameCard from "@/components/GameCard";
import StatusFilter from "@/components/StatusFilter";

type Status = "BACKLOG" | "PLAYING" | "COMPLETED" | "DROPPED";

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const { status } = await searchParams;
  const validStatuses: Status[] = ["BACKLOG", "PLAYING", "COMPLETED", "DROPPED"];
  const activeFilter = validStatuses.includes(status as Status)
    ? (status as Status)
    : undefined;

  const games = await prisma.gameEntry.findMany({
    where: {
      userId: session.user.id,
      ...(activeFilter ? { status: activeFilter } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-2xl mx-auto mt-16 p-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">RespawnList</h1>
          <p className="text-shelf-muted text-sm mt-1">
            {session.user.name || session.user.email}
          </p>
        </div>
        <LogoutButton />
      </div>

      <GameSearch />
      <StatusFilter activeFilter={activeFilter} />

      {games.length === 0 ? (
        <div className="text-center mt-16 text-shelf-muted">
          {activeFilter ? (
            <p>No games with status &quot;{activeFilter}&quot;.</p>
          ) : (
            <p>Your shelf is empty. Search above to add your first game.</p>
          )}
        </div>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </ul>
      )}
      <RawgAttribution />
    </div>
  );
}