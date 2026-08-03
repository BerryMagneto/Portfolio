import Link from "next/link";
import { getPopularCovers } from "@/app/actions/igdb";
import CoverMarquee from "@/components/CoverMarquee";

export default async function Home() {
  const covers = await getPopularCovers();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <CoverMarquee covers={covers} />

      <div className="relative z-20 max-w-4xl mx-auto px-6 pt-28 pb-20">
        <div className="text-center">
          <h1 className="font-display text-5xl font-bold tracking-tight">
            Respawn<span className="text-shelf-amber">List</span>
          </h1>
          <p className="text-shelf-muted text-lg mt-4 max-w-md mx-auto">
            Your game backlog, organized. Track what you're playing, what's
            next, and what you've beaten.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            <Link
              href="/signup"
              className="bg-shelf-amber text-shelf-bg font-medium rounded-lg px-6 py-3 hover:opacity-90 transition-opacity"
            >
              Get started
            </Link>
            <Link
              href="/login"
              className="border border-shelf-border text-shelf-text rounded-lg px-6 py-3 hover:border-shelf-amber transition-colors"
            >
              Log in
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-20">
          <div className="rounded-lg border border-shelf-border bg-shelf-surface p-5">
            <span className="inline-block w-2 h-2 rounded-full bg-shelf-amber mb-3" />
            <h3 className="font-display font-medium">Search &amp; add</h3>
            <p className="text-shelf-muted text-sm mt-1">
              Find any game and add it to your shelf with real cover art and
              details in one click.
            </p>
          </div>
          <div className="rounded-lg border border-shelf-border bg-shelf-surface p-5">
            <span className="inline-block w-2 h-2 rounded-full bg-shelf-teal mb-3" />
            <h3 className="font-display font-medium">Track status</h3>
            <p className="text-shelf-muted text-sm mt-1">
              Backlog, Playing, Completed, or Dropped — always know where you
              left off.
            </p>
          </div>
          <div className="rounded-lg border border-shelf-border bg-shelf-surface p-5">
            <span className="inline-block w-2 h-2 rounded-full bg-shelf-slate mb-3" />
            <h3 className="font-display font-medium">Your shelf, your data</h3>
            <p className="text-shelf-muted text-sm mt-1">
              Private by default — your library is only ever visible to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}