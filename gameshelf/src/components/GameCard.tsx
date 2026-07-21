"use client";

import Image from "next/image";
import { useState } from "react";
import { updateGameStatus, deleteGame } from "@/app/actions/games";

type Game = {
  id: string;
  title: string;
  status: string;
  coverUrl?: string | null;
};

export default function GameCard({ game }: { game: Game }) {
  const [status, setStatus] = useState(game.status);
  const [deleting, setDeleting] = useState(false);

  async function handleStatusChange(newStatus: string) {
    setStatus(newStatus);
    await updateGameStatus(game.id, newStatus);
  }

  async function handleDelete() {
    setDeleting(true);
    await deleteGame(game.id);
  }

  return (
    <li className="border rounded p-3 flex justify-between items-center">
      {game.coverUrl && (
        <Image
          src={game.coverUrl}
          alt={game.title}
          width={40}
          height={40}
          className="w-10 h-10 object-cover rounded"
        />
      )}
      <p className="font-semibold">{game.title}</p>
      <div className="flex items-center gap-2">
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="BACKLOG">Backlog</option>
          <option value="PLAYING">Playing</option>
          <option value="COMPLETED">Completed</option>
          <option value="DROPPED">Dropped</option>
        </select>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-red-500 text-sm disabled:opacity-50"
        >
          {deleting ? "..." : "Delete"}
        </button>
      </div>
    </li>
  );
}