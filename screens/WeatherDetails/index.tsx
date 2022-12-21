import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import WeatherData from './WeatherData'
import WeatherForecastList from './WeatherForecastList'

const WeatherDetailsScreen = (props: StackScreenProps<any>) => {
  const cityName: string = (props.route?.params?.cityName as unknown as string) ?? 'Helsinki'

  return (
    <ScrollView style={[styles.container]}>
      <WeatherData cityName={cityName} />
      <WeatherForecastList cityName={cityName} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#4a87c0',
    padding: 24,
  },
})

export default WeatherDetailsScreen
