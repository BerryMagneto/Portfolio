"use client";

import { useRef, useState } from "react";
import { addGame } from "@/app/actions/games";

export default function AddGameForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    await addGame(formData);
    formRef.current?.reset();
    setLoading(false);
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="flex gap-2"
    >
      <input
        name="title"
        type="text"
        placeholder="Add a game title..."
        required
        className="border rounded px-3 py-2 flex-1"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white rounded px-4 py-2 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}