'use client'

import { useState } from 'react'

export default function LikeButton() {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(0)

  function handleLike() {
    setLiked(!liked)
    setCount(liked ? count - 1 : count + 1)
  }

  return (
    <button
      onClick={handleLike}
      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
        liked
          ? 'bg-red-500/20 border-red-500/50 text-red-400'
          : 'border-white/20 text-gray-400 hover:border-white/40'
      }`}
    >
      {liked ? '❤️' : '🤍'} {count}
    </button>
  )
}