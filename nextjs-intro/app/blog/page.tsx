import Link from 'next/link'
import type { Metadata } from 'next'

interface Post {
  id: number
  title: string
  body: string
}

type PostPreview = Pick<Post, 'id' | 'title' | 'body'>

async function getData<T>(url: string): Promise<T> {
  const res = await fetch(url)
  return res.json()
}

export const metadata: Metadata = {
  title: 'Blog | DJ',
  description: 'Latest posts fetched from the server.',
}

export default async function Blog() {
  const posts = await getData<PostPreview[]>(`${process.env.NEXT_PUBLIC_API_URL}/posts?_limit=6`)

  return (
    <main className="min-h-screen bg-black text-white pt-24 px-6">
      <div className="max-w-4xl mx-auto py-16">
        <h1 className="text-5xl font-bold mb-4">Blog</h1>
        <p className="text-gray-400 mb-12">Latest posts fetched from the server.</p>
        <div className="flex flex-col gap-6">
          {posts.map(post => (
  <Link href={`/blog/${post.id}`} key={post.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#00BFFF]/50 hover:bg-white/10 transition-all">
    <h2 className="text-lg font-semibold mb-2 capitalize">{post.title}</h2>
    <p className="text-gray-400 text-sm leading-relaxed">{post.body}</p>
  </Link>
))}
        </div>
      </div>
    </main>
  )
}