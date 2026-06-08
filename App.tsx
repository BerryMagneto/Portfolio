import { useState } from 'react'
import SearchBar from './components/SearchBar'
import RestaurantGrid from './components/RestaurantGrid'

interface Restaurant {
  fsq_id: string
  name: string
  location: {
    address?: string
    neighborhood?: string[]
  }
  categories: {
    name: string
    icon: {
      prefix: string
      suffix: string
    }
  }[]
  rating?: number
  price?: number
  distance?: number
}

export type { Restaurant }

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  async function searchRestaurants(query: string, neighborhood: string) {
  setLoading(true)
  setError('')
  setRestaurants([])
  setSearched(true)

  const area = neighborhood ? `${neighborhood}, Brooklyn, New York` : 'Brooklyn, New York'

  try {
    // First get coordinates for the area
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(area)}&format=json&limit=1`
    )
    const geoData = await geoRes.json()

    if (!geoData.length) throw new Error('Area not found')

    const { lat, lon } = geoData[0]
    const radius = 1000

    // Query Overpass for restaurants matching the search
    const overpassQuery = `
      [out:json][timeout:10];
      node["amenity"="restaurant"]["name"~"${query}",i](around:${radius},${lat},${lon});
      out body 12;
    `

    const overpassRes = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: overpassQuery
    })

    const overpassData = await overpassRes.json()
    const results = overpassData.elements.map((el: any) => ({
      fsq_id: String(el.id),
      name: el.tags.name || 'Unknown',
      location: {
        address: [el.tags['addr:street'], el.tags['addr:housenumber']]
          .filter(Boolean).join(' ') || undefined
      },
      categories: el.tags.cuisine
        ? [{ name: el.tags.cuisine.replace(/_/g, ' '), icon: { prefix: '', suffix: '' } }]
        : [],
      rating: undefined,
      price: undefined,
      distance: undefined
    }))

    setRestaurants(results)
  } catch (_err) {
    setError('Something went wrong. Try again.')
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#1a1a2e] text-white py-10 px-6 text-center">
        <h1 className="text-4xl font-bold mb-2">NYC Restaurant Finder</h1>
        <p className="text-gray-400">Find the best spots in Brooklyn and beyond</p>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-10">
        <SearchBar onSearch={searchRestaurants} />
        {loading && <p className="text-center text-gray-400 mt-8">Finding restaurants...</p>}
        {error && <p className="text-center text-red-400 mt-8">{error}</p>}
        {!loading && searched && restaurants.length === 0 && !error && (
          <p className="text-center text-gray-400 mt-8">No restaurants found. Try a different search.</p>
        )}
        {restaurants.length > 0 && (
          <RestaurantGrid restaurants={restaurants} />
        )}
      </main>
    </div>
  )
}

export default App