import { SearchBar, Button, Text } from '@rneui/themed'
import React from 'react'
import { ActivityIndicator, Dimensions, Platform, StyleSheet, View } from 'react-native'
import { IWeatherData } from '../../interfaces/WeatherData.interface'
import API_GetWeatherData from './api/getWeather'
import Icon from 'react-native-vector-icons/AntDesign'
import CitySelectionContext from '../../contexts/_CitySelectionContext'
import { useNavigation } from '@react-navigation/native'
import { GetCityByLocation } from './GetCityByLocation'
import * as Location from 'expo-location'

interface IAddCityScreenProps {}

export function AddCityScreen(props: IAddCityScreenProps) {
  const navigation = useNavigation()
  const { addCity } = React.useContext(CitySelectionContext)
  const [searchCityNameText, setSearchCityNameText] = React.useState('')
  const [lastSearchedText, setLastSearchedText] = React.useState('')
  const [getWeatherResponse, runGetWeather] = API_GetWeatherData()

  const handleOnSubmit = () => {
    setLastSearchedText(searchCityNameText)
    runGetWeather({ cityName: searchCityNameText, type: 'GET_BY_CITY_NAME' })
  }

  const generateCityInfo = (
    weatherData: IWeatherData,
  ): {
    key: string
    value: string | number
  }[] => {
    return [
      {
        key: 'Country',
        value: weatherData.sys.country,
      },
      { key: 'Timezone', value: `GMT+${weatherData.timezone / 3600 ?? 0}` },
      { key: 'Longitude', value: weatherData.coord.lon },
      { key: 'Latitude', value: weatherData.coord.lat },
    ]
  }

  const handleAddCity = (cityId?: number) => {
    if (cityId && cityId > 0) {
      addCity(cityId)
      if (navigation.canGoBack()) {
        navigation.goBack()
      }
    }
  }

  const handleOnGetLocation = React.useCallback(
    (location: Location.LocationObject) => {
      const { latitude, longitude } = location.coords
      console.log('Received location: ', longitude, '-', latitude)
      if (latitude && longitude) {
        runGetWeather({
          lon: longitude,
          lat: latitude,
          type: 'GET_BY_LON_LAT',
          callbackAfterSuccess(data) {
            if (data.name) {
              setSearchCityNameText(data.name)
            }
          },
        })
      }
    },
    [runGetWeather],
  )

  return (
    <View style={[styles.container]}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <SearchBar
          placeholder='Type city name here...'
          onChangeText={setSearchCityNameText}
          onSubmitEditing={handleOnSubmit}
          value={searchCityNameText}
          style={{ fontSize: 14 }}
          containerStyle={{ width: Dimensions.get('screen').width - 72, height: 48 }}
          cancelButtonProps={{ style: { width: 8, height: 0 } }}
          clearIcon={true}
          platform={Platform.OS === 'ios' ? 'ios' : 'default'}
        />
        <GetCityByLocation onGetLocation={handleOnGetLocation} />
      </View>

      <View style={{ marginTop: 16 }}>
        {getWeatherResponse.isLoading == true && (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
          </View>
        )}
        {getWeatherResponse.isLoading === false && getWeatherResponse.data?.id && (
          <>
            <View style={styles.city_container}>
              <Text style={styles.city_name}>{getWeatherResponse.data.name}</Text>
              <View style={styles.city_info_container}>
                {generateCityInfo(getWeatherResponse.data).map((row, rowIdx) => (
                  <Text key={rowIdx} style={styles.city_info_text}>
                    {row.key}: {row.value}
                  </Text>
                ))}
              </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <Button buttonStyle={[styles.btn_add_city]} radius={8} onPress={() => handleAddCity(getWeatherResponse.data?.id)}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name='plus' size={24} style={[styles.btn_add_city_icon]} />
                  <Text style={[styles.btn_add_city_text]}>Add city</Text>
                </View>
              </Button>
            </View>
          </>
        )}
        {getWeatherResponse.isLoading === false && lastSearchedText && !getWeatherResponse.data?.id && (
          <>
            <View style={styles.error_container}>
              <Text style={styles.error_text}>Cannot find any city with name "{lastSearchedText}"</Text>
            </View>
          </>
        )}
        {getWeatherResponse.isLoading === false && !lastSearchedText && !getWeatherResponse.data?.id && (
          <Text style={{ marginHorizontal: 12, marginVertical: 4 }}>You can search city by Name or by your current Location.</Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 8,
  },
  loading_container: {
    paddingVertical: 24,
  },
  city_container: {
    margin: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#4a87c0',
  },
  city_name: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 24,
  },
  city_info_container: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 8,
    marginTop: 16,
    marginBottom: 4,
  },
  city_info_text: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  btn_add_city: {
    paddingHorizontal: 24,
    backgroundColor: '#64c4b2',
  },
  btn_add_city_icon: {
    color: '#FFF',
    fontSize: 18,
    marginRight: 2,
  },
  btn_add_city_text: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 2,
  },
  error_container: {
    margin: 8,
  },
  error_text: {
    color: '#f23535',
    fontWeight: '500',
  },
})
