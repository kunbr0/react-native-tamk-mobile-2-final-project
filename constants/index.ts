import { TWeatherStatus } from '../interfaces/WeatherData.interface'

export const weatherIcon: { [key in TWeatherStatus]: string } = {
  Thunderstorm: 'https://cdn-icons-png.flaticon.com/512/1959/1959334.png',
  Drizzle: 'https://cdn-icons-png.flaticon.com/512/2412/2412739.png',
  Rain: 'https://cdn-icons-png.flaticon.com/512/2470/2470014.png',
  Snow: 'https://cdn-icons-png.flaticon.com/512/2336/2336301.png',
  Atmosphere: 'https://cdn-icons-png.flaticon.com/512/414/414825.png',
  Clear: 'https://cdn-icons-png.flaticon.com/512/3222/3222807.png',
  Clouds: 'https://cdn-icons-png.flaticon.com/512/414/414825.png',
  Unknown: 'https://cdn-icons-png.flaticon.com/512/648/648198.png',
}

export const JSON_PLACEHOLDER_API_KEY = '810256c1ebd8b51d0311eec4118eee89'

export const BASE_JSON_PLACEHOLDER_URL = 'https://api.openweathermap.org/data/2.5'
