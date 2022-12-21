import { IWeatherData, TWeatherStatus } from './WeatherData.interface'

export interface IGroupWeather {
  cnt: number
  list: IWeatherData[]
}
