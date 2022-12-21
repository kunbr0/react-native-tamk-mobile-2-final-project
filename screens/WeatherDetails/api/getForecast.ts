import React from 'react'
import { JSON_PLACEHOLDER_API_KEY, BASE_JSON_PLACEHOLDER_URL } from '../../../constants'
import useFetch from '../../../core/api/useFetch'
import { TRunRequestFunction, TApiFunctionReturn } from '../../../core/api/useFetch.type'
import { IWeatherForecastData } from '../../../interfaces/WeatherForecastData.interface'

type ResponseType = IWeatherForecastData

type RequiredParams = {
  cityName: string
}

export default function API_GetWeatherForecast(): TApiFunctionReturn<ResponseType, RequiredParams> {
  const { data, error, isLoading, execute } = useFetch<ResponseType>(BASE_JSON_PLACEHOLDER_URL)

  const run: TRunRequestFunction<ResponseType, RequiredParams> = React.useCallback(
    (params) => {
      execute({
        method: 'GET',
        path: `/forecast?q=${params.cityName}&appid=${JSON_PLACEHOLDER_API_KEY}&units=metric`,
        callbackAfterSuccess: params.callbackAfterSuccess,
        callbackAfterFinish: params.callbackAfterFinish,
        callbackAfterFail: params.callbackAfterFail,
      })
    },
    [execute],
  )

  return [{ data, error, isLoading }, run]
}
