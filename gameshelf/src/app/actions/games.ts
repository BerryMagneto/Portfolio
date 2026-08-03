"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function addGame(title: string, coverUrl?: string, summary?: string | null, releaseYear?: number | null, developer?: string | null) {
  const session = await auth();
  if (!session?.user) return { error: "Not authenticated" };

  if (!title) return { error: "Title is required" };

  await prisma.gameEntry.create({
    data: {
      title,
      coverUrl: coverUrl || null,
      userId: session.user.id,
      summary: summary || null,
      releaseYear: releaseYear || null,
      developer: developer || null,
    },
  });

  revalidatePath("/library");
  return { success: true };
}

export async function updateGameStatus(gameId: string, status: string) {
  const session = await auth();
  if (!session?.user) return { error: "Not authenticated" };

  await prisma.gameEntry.updateMany({
    where: { id: gameId, userId: session.user.id },
    data: { status: status as "BACKLOG" | "PLAYING" | "COMPLETED" | "DROPPED" },
  });

  revalidatePath("/library");
  return { success: true };
}

export async function deleteGame(gameId: string) {
  const session = await auth();
  if (!session?.user) return { error: "Not authenticated" };

  await prisma.gameEntry.deleteMany({
    where: { id: gameId, userId: session.user.id },
  });

  revalidatePath("/library");
  return { success: true };
}

export async function updateGameDetails(
  gameId: string,
  rating: number | null,
  notes: string | null
) {
  const session = await auth();
  if (!session?.user) return { error: "Not authenticated" };

  await prisma.gameEntry.updateMany({
    where: { id: gameId, userId: session.user.id },
    data: { rating, notes },
  });

  revalidatePath("/library");
  return { success: true };
}