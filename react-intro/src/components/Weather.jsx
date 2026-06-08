import { useState } from 'react'

function getDescription(code) {
  if (code === 0) return 'Clear sky'
  if (code <= 2) return 'Partly cloudy'
  if (code === 3) return 'Overcast'
  if (code <= 49) return 'Foggy'
  if (code <= 59) return 'Drizzle'
  if (code <= 69) return 'Rain'
  if (code <= 79) return 'Snow'
  if (code <= 82) return 'Rain showers'
  if (code <= 99) return 'Thunderstorm'
  return 'Unknown'
}

function Weather() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function getWeather() {
    if (city.trim() === '') return
    setLoading(true)
    setError('')
    setWeather(null)

    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
      const geoData = await geoRes.json()

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found')
      }

      const { latitude, longitude, name, country } = geoData.results[0]

      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph`)
      const weatherData = await weatherRes.json()
      const current = weatherData.current

      setWeather({
        city: `${name}, ${country}`,
        temp: Math.round(current.temperature_2m),
        feelsLike: Math.round(current.apparent_temperature),
        humidity: current.relative_humidity_2m,
        wind: Math.round(current.wind_speed_10m),
        description: getDescription(current.weather_code)
      })
    } catch (err) {
      setError('City not found. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-[#1a1a2e] mb-8">Weather</h1>

      <div className="flex gap-2 mb-6 max-w-md">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && getWeather()}
          placeholder="Enter a city..."
          className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a1a2e]"
        />
        <button
          onClick={getWeather}
          className="bg-[#1a1a2e] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-80 transition-opacity"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-400 text-sm">Fetching weather...</p>}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {weather && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-md">
          <p className="text-gray-500 text-sm mb-1">{weather.city}</p>
          <p className="text-6xl font-bold text-[#1a1a2e] mb-2">{weather.temp}°F</p>
          <p className="text-gray-400 capitalize mb-6">{weather.description}</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Feels like</p>
              <p className="font-semibold text-[#1a1a2e]">{weather.feelsLike}°F</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Humidity</p>
              <p className="font-semibold text-[#1a1a2e]">{weather.humidity}%</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Wind</p>
              <p className="font-semibold text-[#1a1a2e]">{weather.wind} mph</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Weather