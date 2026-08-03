"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function LibrarySortControl() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("sort", value);
    else params.delete("sort");
    router.push(`/library?${params.toString()}`);
  }

  return (
    <select
      defaultValue={searchParams.get("sort") ?? ""}
      onChange={(e) => handleChange(e.target.value)}
      className="bg-shelf-surface border border-shelf-border rounded px-2 py-1 text-xs font-mono text-shelf-text"
    >
      <option value="">Newest first</option>
      <option value="title">Title (A–Z)</option>
      <option value="rating">Highest rated</option>
      <option value="year">Release year</option>
    </select>
  );
}