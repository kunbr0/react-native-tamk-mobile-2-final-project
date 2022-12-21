import { cloneDeep } from 'lodash'
import React from 'react'
export interface ICitySelectionContext {
  cityIds: number[]
  addCity: (id: number) => boolean
  removeCity: (id: number) => boolean
}

const CONTEXT_DEFAULT_VALUE: ICitySelectionContext = {
  cityIds: [634963, 658225, 1581130, 1566083],
  addCity: () => false,
  removeCity: () => false,
}

const CitySelectionContext = React.createContext<ICitySelectionContext>(CONTEXT_DEFAULT_VALUE)

export const CitySelectionContextProvider: React.FC<{ children: any }> = ({ children }) => {
  const [cityIds, setCityIds] = React.useState(CONTEXT_DEFAULT_VALUE.cityIds)

  const addCity = React.useCallback(
    (id: number) => {
      if (cityIds.includes(id) === false) {
        setCityIds((prevCityIds) => [...prevCityIds, id])
        return true
      }
      return false
    },
    [cityIds, setCityIds],
  )

  const removeCity = React.useCallback(
    (id: number) => {
      const existingCityIndex = cityIds.findIndex((cityId) => cityId === id)
      if (existingCityIndex !== -1) {
        setCityIds((prevCityIds) => {
          const newCityIds = cloneDeep(prevCityIds)
          newCityIds.splice(existingCityIndex, 1)
          return newCityIds
        })
        return true
      }
      return false
    },
    [cityIds, setCityIds],
  )

  const values: ICitySelectionContext = React.useMemo(
    () => ({
      cityIds,
      addCity,
      removeCity,
    }),
    [cityIds, addCity, removeCity],
  )

  return <CitySelectionContext.Provider value={values}>{children}</CitySelectionContext.Provider>
}

export default CitySelectionContext
