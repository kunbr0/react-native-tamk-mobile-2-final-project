import { AxiosError } from 'axios'

export type IExecuteGenericParams = IExecuteUserPassedParams<any> & {
  path: string
}

export type IExecuteGetParams = IExecuteGenericParams & {
  method: 'GET'
  path: string
}

export type IExecutePostParams = IExecuteGenericParams & {
  method: 'POST'
  path: string
  body: { [key: string]: any }
}

export type IExecuteParams = IExecuteGetParams | IExecutePostParams

export interface IRequestResponse<ResponseType> {
  data?: ResponseType
  error?: AxiosError<any>
  isLoading: boolean
}

export interface IExecuteUserPassedParams<ResponseType> {
  callbackAfterSuccess?: (data: ResponseType) => void
  callbackAfterFail?: (error: AxiosError<any>) => void
  callbackAfterFinish?: () => void
}

export type TRunRequestFunction<ResponseType = any, RequiredParams = {}> = (params: IExecuteUserPassedParams<ResponseType> & RequiredParams) => void

export type TApiFunctionReturn<ResponseType, RequiredParams = {}> = [IRequestResponse<ResponseType>, TRunRequestFunction<ResponseType, RequiredParams>]
