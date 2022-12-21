import React from 'react'
import { JSON_PLACEHOLDER_API_KEY, BASE_JSON_PLACEHOLDER_URL } from '../../../constants'
import useFetch from '../../../core/api/useFetch'
import { TRunRequestFunction, TApiFunctionReturn } from '../../../core/api/useFetch.type'
import { IWeatherData } from '../../../interfaces/WeatherData.interface'

type ResponseType = IWeatherData

type Params__GetByCityName = {
  cityName: string
  type: 'GET_BY_CITY_NAME'
}

type Params__GetByLonLat = {
  lon: number
  lat: number
  type: 'GET_BY_LON_LAT'
}

type RequiredParams = Params__GetByCityName | Params__GetByLonLat

export default function API_GetWeatherData(): TApiFunctionReturn<ResponseType, RequiredParams> {
  const { data, error, isLoading, execute } = useFetch<ResponseType>(BASE_JSON_PLACEHOLDER_URL)

  const run: TRunRequestFunction<ResponseType, RequiredParams> = React.useCallback(
    (params) => {
      let path
      switch (params.type) {
        case 'GET_BY_CITY_NAME': {
          path = `/weather?q=${params.cityName}&appid=${JSON_PLACEHOLDER_API_KEY}&units=metric`
          break
        }
        case 'GET_BY_LON_LAT': {
          path = `/weather?lon=${params.lon}&lat=${params.lat}&appid=${JSON_PLACEHOLDER_API_KEY}&units=metric`
          break
        }
        default:
          break
      }
      if (path) {
        execute({
          method: 'GET',
          path,
          callbackAfterSuccess: params.callbackAfterSuccess,
          callbackAfterFinish: params.callbackAfterFinish,
          callbackAfterFail: params.callbackAfterFail,
          clearDataBeforeFetch: true,
        })
      }
    },
    [execute],
  )

  return [{ data, error, isLoading }, run]
}
