import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import API_GetWeatherData from '../api/getWeather'

interface IWeatherDataProps {
  cityName: string
}

const WeatherData = (props: IWeatherDataProps) => {
  const [weatherDataResponse, getWeatherData] = API_GetWeatherData()

  React.useEffect(() => {
    if (props.cityName) {
      getWeatherData({ cityName: props.cityName })
    }
  }, [props.cityName, getWeatherData])

  if (weatherDataResponse.isLoading) {
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator size='large' />
      </View>
    )
  } else {
    return (
      <View style={[styles.weather_data_container]}>
        <Text style={[styles.city_name]}>{weatherDataResponse.data?.name}</Text>
        <Text style={[styles.temp]}>{Math.round(weatherDataResponse.data?.main?.temp ?? 0)}°</Text>
        <Text style={[styles.desc]}>{weatherDataResponse.data?.weather[0].main}</Text>

        <Text style={[styles.high_low]}>
          H:{Math.round(weatherDataResponse.data?.main?.temp_max ?? 0)}°{'  '}L:{Math.round(weatherDataResponse.data?.main?.temp_min ?? 0)}°
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loading_container: {
    paddingVertical: 24,
  },
  weather_data_container: {
    paddingVertical: 24,
  },
  city_name: {
    color: '#eaffff',
    fontSize: 32,
    textAlign: 'center',
  },
  temp: {
    color: '#eaffff',
    fontSize: 64,
    fontWeight: '300',
    textAlign: 'center',
    paddingLeft: 24,
  },
  desc: {
    color: '#eaffff',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  high_low: {
    color: '#eaffff',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
  },
})

export default WeatherData
