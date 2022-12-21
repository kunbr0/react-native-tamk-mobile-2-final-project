import dayjs from 'dayjs'
import { cloneDeep } from 'lodash'
import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { IWeatherForecastData, IWeatherForecast_ListItemData } from '../../../interfaces/WeatherForecastData.interface'
import { getRandomInRange } from '../../../utils'
import API_GetWeatherForecast from '../api/getForecast'
import WeatherForecastListItemData from './WeatherForecastListItemData'
import WeatherForecastListItemSeparator from './WeatherForecastListItemSeparator'

type TForecastListData__Item = {
  type: 'item'
  data: IWeatherForecast_ListItemData
  customData: {
    rangePercentage: number
  }
}
type TForecastListData__Separator = {
  type: 'separator'
  date: string
}

type TForecastListItem = TForecastListData__Item | TForecastListData__Separator

interface IDataGroupByDate {
  [date: string]: IWeatherForecast_ListItemData[]
}

interface IWeatherForecastListProps {
  cityName: string
}

const WeatherForecastList = (props: IWeatherForecastListProps) => {
  const [listData, setListData] = React.useState<TForecastListItem[]>([])
  const [weatherForecastResponse, getWeatherForecast] = API_GetWeatherForecast()

  const transformData = (data: IWeatherForecastData) => {
    const result: TForecastListItem[] = []
    const dataGroupByDate: IDataGroupByDate = {}
    for (const item of data.list) {
      const date = dayjs(item.dt_txt).format('YYYY-MM-DD')
      if (!dataGroupByDate[date]) {
        dataGroupByDate[date] = []
      }
      dataGroupByDate[date].push(item)
    }
    for (const date of Object.keys(dataGroupByDate).sort((a, b) => (a > b ? 1 : -1))) {
      result.push({ type: 'separator', date })
      result.push(
        ...dataGroupByDate[date].map((item) => ({
          type: 'item' as 'item',
          data: item,
          customData: {
            rangePercentage: getRandomInRange(0, 70),
          },
        })),
      )
    }
    return result
  }

  const renderListItem = React.useCallback((item: TForecastListItem, idx: number) => {
    switch (item.type) {
      case 'separator': {
        return <WeatherForecastListItemSeparator key={idx} date={item.date} />
      }
      case 'item': {
        const date = dayjs(item.data.dt_txt).format('HH:mm')
        return (
          <WeatherForecastListItemData
            key={idx}
            time={date}
            weatherMainStatus={item.data.weather[0]?.main}
            tempMin={item.data.main.temp_min}
            tempMax={item.data.main.temp_max}
            rangePercentage={item.customData.rangePercentage}
            isBottom
          />
        )
      }
      default: {
        return <></>
      }
    }
  }, [])

  React.useEffect(() => {
    if (props.cityName) {
      getWeatherForecast({
        cityName: props.cityName,
        callbackAfterSuccess(data) {
          const transformedData = transformData(data)
          setListData(cloneDeep(transformedData))
        },
      })
    }
  }, [props.cityName, getWeatherForecast])

  return (
    <View style={styles.container}>
      {weatherForecastResponse.isLoading && (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )}
      {listData.length > 0 && <View style={styles.forecast_list_container}>{listData.map((item, idx) => renderListItem(item, idx))}</View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  forecast_list_container: {
    borderRadius: 8,
    backgroundColor: '#3d80c1',
    marginBottom: 48,
  },
  loading_container: {
    paddingVertical: 24,
  },
})

export default WeatherForecastList
