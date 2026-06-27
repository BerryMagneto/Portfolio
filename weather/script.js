const input = document.querySelector('#city-input')
const searchBtn = document.querySelector('#search-btn')
const weatherCard = document.querySelector('#weather-card')
const errorMsg = document.querySelector('#error')
const loadingMsg = document.querySelector('#loading')

searchBtn.addEventListener('click', getWeather)

input.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') getWeather()
})

async function getWeather() {
  const city = input.value.trim()
  if (city === '') return

  weatherCard.style.display = 'none'
  errorMsg.style.display = 'none'
  loadingMsg.style.display = 'block'

  try {
    // Step 1 — convert city name to coordinates
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    const geoResponse = await fetch(geoUrl)
    const geoData = await geoResponse.json()

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error('City not found')
    }

    const { latitude, longitude, name, country } = geoData.results[0]

    // Step 2 — fetch weather using coordinates
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph`
    const weatherResponse = await fetch(weatherUrl)
    const weatherData = await weatherResponse.json()

    const current = weatherData.current
    const description = getDescription(current.weather_code)

    document.querySelector('#city-name').textContent = name + ', ' + country
    document.querySelector('#temp').textContent = Math.round(current.temperature_2m) + '°F'
    document.querySelector('#feels-like').textContent = Math.round(current.apparent_temperature) + '°F'
    document.querySelector('#humidity').textContent = current.relative_humidity_2m + '%'
    document.querySelector('#wind').textContent = Math.round(current.wind_speed_10m) + ' mph'
    document.querySelector('#description').textContent = description
    document.querySelector('#condition').textContent = description
    document.querySelector('#weather-icon').src = getIcon(current.weather_code)

    // Change background based on weather and icon
    changeBackground(current.weather_code)
    
    loadingMsg.style.display = 'none'
    weatherCard.style.display = 'block'

  } catch (error) {
    loadingMsg.style.display = 'none'
    errorMsg.style.display = 'block'
  }
}

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

function getIcon(code) {
  if (code === 0) return 'https://openweathermap.org/img/wn/01d@2x.png'
  if (code <= 2) return 'https://openweathermap.org/img/wn/02d@2x.png'
  if (code === 3) return 'https://openweathermap.org/img/wn/04d@2x.png'
  if (code <= 49) return 'https://openweathermap.org/img/wn/50d@2x.png'
  if (code <= 69) return 'https://openweathermap.org/img/wn/10d@2x.png'
  if (code <= 79) return 'https://openweathermap.org/img/wn/13d@2x.png'
  if (code <= 82) return 'https://openweathermap.org/img/wn/09d@2x.png'
  return 'https://openweathermap.org/img/wn/11d@2x.png'
}

function changeBackground(code) {
  const body = document.body;

  if (code === 0) {
    body.style.backgroundImage = "url('../assets/sunny.jpg')";
  }

  else if (code <= 3) {
    body.style.backgroundImage = "url('../assets/cloudy.jpg')";
  }

  else if (code <= 49) {
    body.style.backgroundImage = "url('../assets/cloudy.jpg')";
  }

  else if (code <= 69) {
    body.style.backgroundImage = "url('../assets/rainy.jpg')";
  }

  else if (code <= 79) {
    body.style.backgroundImage = "url('../assets/snowy.jpg')";
  }

  else if (code <= 99) {
    body.style.backgroundImage = "url('../assets/storm.jpg')";
  }

  else {
    body.style.backgroundImage = "url('../assets/weather.jpg')";
  }
}