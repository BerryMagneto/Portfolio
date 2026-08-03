"use client";

import { useState } from "react";
import { updateGameStatus, deleteGame } from "@/app/actions/games";

type Game = {
  id: string;
  title: string;
  status: string;
  coverUrl: string | null;
  summary?: string | null;
  releaseYear?: number | null;
  developer?: string | null;
};

const statusColors: Record<string, string> = {
  BACKLOG: "bg-shelf-slate",
  PLAYING: "bg-shelf-amber",
  COMPLETED: "bg-shelf-teal",
  DROPPED: "bg-shelf-red",
};

export default function GameCard({ game }: { game: Game }) {
  const [status, setStatus] = useState(game.status);
  const [deleting, setDeleting] = useState(false);
  const [expanded, setExpanded] = useState(false);

  async function handleStatusChange(newStatus: string) {
    setStatus(newStatus);
    await updateGameStatus(game.id, newStatus);
  }

  async function handleDelete() {
    setDeleting(true);
    await deleteGame(game.id);
  }

  return (
    <li className="group relative rounded-lg border border-shelf-border bg-shelf-surface overflow-hidden transition-all hover:border-shelf-amber/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20">
      <span
        className={`absolute top-0 left-0 right-0 h-1.5 z-10 ${statusColors[status] ?? "bg-shelf-slate"}`}
      />

      <div className="aspect-[3/4] w-full overflow-hidden bg-shelf-bg">
        {game.coverUrl ? (
          <img
            src={game.coverUrl}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-shelf-muted text-xs font-mono">
            No cover
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-display font-medium text-sm leading-tight line-clamp-2">
          {game.title}
        </h3>
        <p className="font-mono text-xs text-shelf-muted mt-1">
          {game.developer && <span>{game.developer}</span>}
          {game.developer && game.releaseYear && <span> · </span>}
          {game.releaseYear && <span>{game.releaseYear}</span>}
        </p>

        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="w-full mt-2 bg-shelf-bg border border-shelf-border rounded px-2 py-1 text-xs font-mono text-shelf-text"
        >
          <option value="BACKLOG">Backlog</option>
          <option value="PLAYING">Playing</option>
          <option value="COMPLETED">Completed</option>
          <option value="DROPPED">Dropped</option>
        </select>

        {game.summary && (
          <div className="mt-2">
            <p className={`text-xs text-shelf-muted ${expanded ? "" : "line-clamp-2"}`}>
              {game.summary}
            </p>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-shelf-amber mt-1 hover:underline"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          </div>
        )}

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-xs text-shelf-red mt-2 hover:underline disabled:opacity-50"
        >
          {deleting ? "Removing..." : "Delete"}
        </button>
      </div>
    </li>
  );
}