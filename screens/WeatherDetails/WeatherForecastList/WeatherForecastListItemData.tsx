import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { weatherIcon } from '../../../constants'
import { TWeatherStatus } from '../../../interfaces/WeatherData.interface'

interface IWeatherForecastListItemDataProps {
  isBottom: boolean
  time: string
  weatherMainStatus: TWeatherStatus
  tempMin: number
  tempMax: number
  rangePercentage: number
}

const WeatherForecastListItemData = (props: IWeatherForecastListItemDataProps) => {
  const textStyles = [styles.weekday_data, styles.bottom_separator]
  const bottomTextStyles = [styles.weekday_data]

  return (
    <View style={props.isBottom ? bottomTextStyles : textStyles}>
      <Text style={[styles.text_forecast_time]}>{props.time}</Text>
      <Image
        style={styles.weather_status_icon}
        source={{
          uri: weatherIcon[props.weatherMainStatus],
        }}
      />
      <Text style={[styles.text_tempMin]}>{Math.round(props.tempMin ?? 0)}°</Text>
      <View style={[styles.view_tempBar]}>
        <View style={[styles.view_tempBar_progress, { marginLeft: (props.rangePercentage ?? 0) + '%' }]}></View>
      </View>
      <Text style={[styles.text_tempMax]}>{Math.round(props.tempMax ?? 0)}°</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  weekday_data: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    paddingVertical: 12,
  },
  bottom_separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#eaffff60',
  },
  text_forecast_time: {
    width: 76,
    color: '#eaffff',
    fontWeight: '700',
    fontSize: 18,
  },
  weather_status_icon: {
    width: 28,
    height: 28,
  },
  text_tempMin: {
    marginLeft: 20,
    color: '#eaffff',
    fontWeight: '700',
    fontSize: 18,
  },
  text_tempMax: {
    color: '#eaffff',
    fontWeight: '700',
    fontSize: 18,
    marginRight: 10,
  },
  view_tempBar: {
    marginLeft: 20,
    marginRight: 18,
    flex: 1,
    width: 120,
    height: 6,
    borderRadius: 8,
    backgroundColor: '#2f69a5',
  },
  view_tempBar_progress: {
    height: '100%',
    width: 48,
    borderRadius: 8,
    backgroundColor: '#69cfdb',
  },
})

export default WeatherForecastListItemData
