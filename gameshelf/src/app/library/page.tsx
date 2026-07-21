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
    <div className="max-w-2xl mx-auto mt-20 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Welcome, {session.user.name || session.user.email}
        </h1>
        <LogoutButton />
      </div>

      <GameSearch />

      <StatusFilter activeFilter={activeFilter} />

      {games.length === 0 ? (
        <div className="text-center mt-10 text-gray-500">
          {activeFilter ? (
            <p>No games with status &quot;{activeFilter}&quot;.</p>
          ) : (
            <p>Your library is empty. Search above to add your first game.</p>
          )}
        </div>
      ) : (
        <ul className="flex flex-col gap-3 mt-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </ul>
      )}
    </div>
  );
}