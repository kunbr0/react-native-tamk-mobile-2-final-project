export type TWeatherStatus = 'Thunderstorm' | 'Drizzle' | 'Rain' | 'Snow' | 'Atmosphere' | 'Clear' | 'Clouds' | 'Unknown'

export interface IWeatherData {
  coord: {
    lon: number
    lat: number
  }
  weather: {
    id: number
    main: TWeatherStatus
    description: string
    icon: string
  }[]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    timezone: number
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}
