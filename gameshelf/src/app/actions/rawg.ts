"use server";

type RawgGame = {
  id: number;
  name: string;
  background_image: string | null;
};

export async function searchGames(query: string) {
  if (!query || query.length < 2) return [];

  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${encodeURIComponent(
      query
    )}&page_size=8`
  );

  if (!res.ok) return [];

  const data = await res.json();

  return (data.results as RawgGame[]).map((game) => ({
    id: game.id,
    title: game.name,
    coverUrl: game.background_image,
  }));
}

export async function getGameDetails(rawgId: number) {
  const res = await fetch(
    `https://api.rawg.io/api/games/${rawgId}?key=${process.env.RAWG_API_KEY}`
  );

  if (!res.ok) return null;

  const data = await res.json();

  return {
    summary: data.description_raw as string | null,
    releaseYear: data.released ? new Date(data.released).getFullYear() : null,
    developer: data.developers?.[0]?.name ?? null,
  };
}