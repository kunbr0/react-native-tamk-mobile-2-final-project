import React from 'react'
import axios, { AxiosError } from 'axios'
import { IExecuteParams, IRequestResponse } from './useFetch.type'

export default function useFetch<ResponseType>(baseURL: string): IRequestResponse<ResponseType> & { execute: (params: IExecuteParams) => void } {
  const [data, setData] = React.useState<ResponseType>(undefined as unknown as ResponseType)
  const [error, setError] = React.useState<AxiosError<any>>()
  const [isLoading, setIsLoading] = React.useState(false)
  const [executeParams, setExecuteParams] = React.useState<IExecuteParams>()

  React.useEffect(() => {
    const abortController = new AbortController()
    if (!executeParams?.path) return

    const requestBody = {}

    if (executeParams.method === 'POST') {
      Object.assign(requestBody, executeParams.body)
    }

    setIsLoading(true)
    setError(undefined)
    if (executeParams.clearDataBeforeFetch) {
      setData(undefined as unknown as ResponseType)
    }

    axios({
      method: executeParams.method,
      url: baseURL + executeParams.path,
      data: Object.keys(requestBody).length > 0 ? requestBody : undefined,
      signal: abortController.signal,
    })
      .then((response) => {
        setData(response.data as ResponseType)
        if (typeof executeParams.callbackAfterSuccess === 'function') {
          executeParams.callbackAfterSuccess(response.data as ResponseType)
        }
      })
      .catch((err: AxiosError) => {
        setError(err)
        if (typeof executeParams.callbackAfterFail === 'function') {
          executeParams.callbackAfterFail(err)
        }
      })
      .finally(() => {
        setIsLoading(false)
        if (typeof executeParams.callbackAfterFinish === 'function') {
          executeParams.callbackAfterFinish()
        }
      })

    return () => {
      abortController.abort()
    }
  }, [baseURL, executeParams])

  const execute = React.useCallback(
    (params: IExecuteParams) => {
      setExecuteParams(params)
    },
    [setExecuteParams],
  )

  return { data: data as ResponseType, error, isLoading, execute }
}
