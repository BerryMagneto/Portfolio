import { useState } from 'react'

const NEIGHBORHOODS = [
  'All Brooklyn',
  'Williamsburg',
  'DUMBO',
  'Park Slope',
  'Crown Heights',
  'Bushwick',
  'Bed-Stuy',
  'Cobble Hill',
  'Carroll Gardens',
  'Flatbush',
  'Bay Ridge'
]

interface SearchBarProps {
  onSearch: (query: string, neighborhood: string) => void
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('pizza')
  const [neighborhood, setNeighborhood] = useState('')

  function handleSearch() {
    if (query.trim() === '') return
    onSearch(query, neighborhood)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="pizza, sushi, burgers..."
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a1a2e]"
          />
          <button
            onClick={handleSearch}
            className="bg-[#1a1a2e] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-80 transition-opacity"
          >
            Search
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {NEIGHBORHOODS.map(n => (
            <button
              key={n}
              onClick={() => setNeighborhood(n === 'All Brooklyn' ? '' : n)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                (n === 'All Brooklyn' && neighborhood === '') || neighborhood === n
                  ? 'bg-[#1a1a2e] text-white border-[#1a1a2e]'
                  : 'border-gray-200 text-gray-500 hover:border-[#1a1a2e] hover:text-[#1a1a2e]'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchBar