'use client'

interface ErrorProps {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="min-h-screen bg-black text-white pt-24 px-6">
      <div className="max-w-4xl mx-auto py-16">
        <h1 className="text-4xl font-bold mb-4 text-red-400">Something went wrong</h1>
        <p className="text-gray-400 mb-8">{error.message}</p>
        <button
          onClick={reset}
          className="bg-[#00BFFF] text-black font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
      </div>
    </main>
  )
}