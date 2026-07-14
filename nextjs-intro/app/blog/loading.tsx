export default function Loading() {
  return (
    <main className="min-h-screen bg-black text-white pt-24 px-6">
      <div className="max-w-4xl mx-auto py-16">
        <div className="animate-pulse flex flex-col gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="h-4 bg-white/10 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-white/5 rounded w-full mb-2"></div>
              <div className="h-3 bg-white/5 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}