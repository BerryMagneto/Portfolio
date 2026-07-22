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
    <li className="relative flex gap-4 rounded-lg border border-shelf-border bg-shelf-surface p-4 pl-5 overflow-hidden">
      <span
        className={`absolute inset-y-0 left-0 w-1.5 ${statusColors[status] ?? "bg-shelf-slate"}`}
      />

      {game.coverUrl && (
        <img
          src={game.coverUrl}
          alt={game.title}
          className="w-16 h-16 object-cover rounded shrink-0"
        />
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display font-medium text-lg leading-tight">
              {game.title}
            </h3>
            <p className="font-mono text-xs text-shelf-muted mt-1">
              {game.developer && <span>{game.developer}</span>}
              {game.developer && game.releaseYear && <span> · </span>}
              {game.releaseYear && <span>{game.releaseYear}</span>}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="bg-shelf-bg border border-shelf-border rounded px-2 py-1 text-xs font-mono text-shelf-text"
            >
              <option value="BACKLOG">Backlog</option>
              <option value="PLAYING">Playing</option>
              <option value="COMPLETED">Completed</option>
              <option value="DROPPED">Dropped</option>
            </select>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-xs text-shelf-red hover:opacity-75 disabled:opacity-50"
            >
              {deleting ? "..." : "Delete"}
            </button>
          </div>
        </div>

        {game.summary && (
          <div className="mt-2">
            <p
              className={`text-sm text-shelf-muted ${expanded ? "" : "line-clamp-2"}`}
            >
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
      </div>
    </li>
  );
}