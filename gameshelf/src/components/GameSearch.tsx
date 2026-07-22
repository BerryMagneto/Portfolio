"use client";

import { useState, useTransition } from "react";
import { searchGames, getGameDetails } from "@/app/actions/rawg";
import { addGame } from "@/app/actions/games";

type Result = {
  id: number;
  title: string;
  coverUrl: string | null;
};

export default function GameSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [isPending, startTransition] = useTransition();
  const [adding, setAdding] = useState<number | null>(null);

  function handleChange(value: string) {
    setQuery(value);
    startTransition(async () => {
      const data = await searchGames(value);
      setResults(data);
    });
  }

  async function handleAdd(result: Result) {
    setAdding(result.id);
    const gameDetails = await getGameDetails(result.id);
    await addGame(result.title, result.coverUrl ?? undefined, gameDetails?.summary, gameDetails?.releaseYear, gameDetails?.developer);
    setResults([]);
    setQuery("");
    setAdding(null);
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search for a game..."
        className="bg-shelf-surface border border-shelf-border rounded-lg px-4 py-2.5 w-full text-shelf-text placeholder:text-shelf-muted focus:outline-none focus:border-shelf-amber"
      />

      {isPending && (
        <p className="text-sm text-shelf-muted mt-1 font-mono">Searching...</p>
      )}

      {results.length > 0 && (
        <ul className="absolute z-10 w-full border border-shelf-border rounded-lg mt-2 divide-y divide-shelf-border bg-shelf-surface shadow-xl">
          {results.map((result) => (
            <li
              key={result.id}
              className="flex items-center gap-3 p-2.5 hover:bg-shelf-bg cursor-pointer transition-colors"
              onClick={() => handleAdd(result)}
            >
              {result.coverUrl && (
                <img
                  src={result.coverUrl}
                  alt={result.title}
                  className="w-10 h-10 object-cover rounded"
                />
              )}
              <span className="text-sm">{result.title}</span>
              {adding === result.id && (
                <span className="text-xs text-shelf-muted ml-auto font-mono">
                  Adding...
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}