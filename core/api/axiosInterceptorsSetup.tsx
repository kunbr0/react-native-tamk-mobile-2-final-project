import axios from 'axios'
import React from 'react'
import HttpStatusCode from '../enums/http-status.enum'

export const AxiosInterceptorNavigate = () => {
  React.useEffect(() => {
    const responseInterceptorsId = axios.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response
      },
      function (error) {
        switch (error.response?.status) {
          case HttpStatusCode.UNAUTHORIZED: {
            console.log('UNAUTHORIZED')
          }
        }
        return Promise.reject(error)
      },
    )

    return () => axios.interceptors.response.eject(responseInterceptorsId)
  }, [])

  return <></>
}
