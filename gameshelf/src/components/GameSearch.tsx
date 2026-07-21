"use client";

import { useState, useTransition } from "react";
import { searchGames } from "@/app/actions/rawg";
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
    await addGame(result.title, result.coverUrl ?? undefined);
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
        className="border rounded px-3 py-2 w-full"
      />

      {isPending && <p className="text-sm text-gray-400 mt-1">Searching...</p>}

      {results.length > 0 && (
        <ul className="border rounded mt-2 divide-y">
          {results.map((result) => (
            <li
              key={result.id}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer"
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
                <span className="text-xs text-gray-400 ml-auto">Adding...</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}