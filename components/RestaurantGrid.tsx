import type{ Restaurant } from '../App'

interface RestaurantGridProps {
  restaurants: Restaurant[]
}

function getPriceLabel(price?: number): string {
  if (!price) return 'Price N/A'
  return '$'.repeat(price)
}

function RestaurantGrid({ restaurants }: RestaurantGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {restaurants.map(r => (
        <div key={r.fsq_id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-[#1a1a2e] text-base leading-tight">{r.name}</h3>
            <span className="text-xs text-gray-400 whitespace-nowrap">{getPriceLabel(r.price)}</span>
          </div>
          {r.categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {r.categories.map((cat, i) => (
                <span key={i} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  {cat.name}
                </span>
              ))}
            </div>
          )}
          {r.location.address && (
            <p className="text-xs text-gray-400">📍 {r.location.address}</p>
          )}
          {r.distance && (
            <p className="text-xs text-gray-400">
              {r.distance < 1000
                ? `${r.distance}m away`
                : `${(r.distance / 1000).toFixed(1)}km away`}
            </p>
          )}
          {r.rating && (
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-sm">★</span>
              <span className="text-sm font-semibold text-[#1a1a2e]">{r.rating}</span>
              <span className="text-xs text-gray-400">/ 10</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default RestaurantGrid