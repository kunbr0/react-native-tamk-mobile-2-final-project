import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

interface IWeatherForecastListItemSeparatorProps {
  date: string
}

const WeatherForecastListItemSeparator = (props: IWeatherForecastListItemSeparatorProps) => {
  return (
    <View style={[styles.forecast_container_label, styles.bottom_separator]}>
      <Text style={[styles.forecast_container_label_text]}>{props.date ?? 'Separator'}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  forecast_container_label: {
    paddingVertical: 8,
    marginHorizontal: 12,
  },
  forecast_container_label_text: {
    color: '#eaffff60',
    fontWeight: '700',
  },
  bottom_separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#eaffff60',
  },
})

export default WeatherForecastListItemSeparator
