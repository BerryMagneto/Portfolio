"use server";

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.token;
  }

  const res = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
    { method: "POST" }
  );

  const data = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };
  return cachedToken.token;
}

function coverUrl(url: string | undefined, size: string) {
  if (!url) return null;
  return "https:" + url.replace("t_thumb", size);
}

async function igdbFetch(query: string) {
  const token = await getAccessToken();
  const res = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID as string,
      Authorization: `Bearer ${token}`,
      "Content-Type": "text/plain",
    },
    body: query,
  });
  if (!res.ok) return [];
  return res.json();
}

export async function searchGames(query: string) {
  if (!query || query.length < 2) return [];

  const results = await igdbFetch(
    `search "${query}"; fields name,cover.url; limit 8;`
  );

  return results.map((g: { id: number; name: string; cover?: { url: string } }) => ({
    id: g.id,
    title: g.name,
    coverUrl: coverUrl(g.cover?.url, "t_cover_big"),
  }));
}

export async function getGameDetails(igdbId: number) {
  const results = await igdbFetch(
    `fields summary,first_release_date,involved_companies.company.name,involved_companies.developer; where id = ${igdbId};`
  );

  const game = results[0];
  if (!game) return null;

  const developerEntry = game.involved_companies?.find(
    (c: { developer: boolean }) => c.developer
  );

  return {
    summary: game.summary ?? null,
    releaseYear: game.first_release_date
      ? new Date(game.first_release_date * 1000).getFullYear()
      : null,
    developer: developerEntry?.company?.name ?? null,
  };
}

export async function getPopularCovers() {
  const randomOffset = Math.floor(Math.random() * 400);

  const results = await igdbFetch(
    `fields cover.url; sort total_rating_count desc; where cover != null; limit 100; offset ${randomOffset};`
  );

  return results
    .map((g: { cover?: { url: string } }) => coverUrl(g.cover?.url, "t_720p"))
    .filter((url: string | null): url is string => Boolean(url));
}