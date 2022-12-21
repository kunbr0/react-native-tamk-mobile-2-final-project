import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import * as Location from 'expo-location'
import { Button, Text } from '@rneui/themed'

interface IGetCityByLocationProps {
  onGetLocation: (location: Location.LocationObject) => any
}

export function GetCityByLocation(props: IGetCityByLocationProps) {
  const [location, setLocation] = React.useState<Location.LocationObject | null>(null)
  const [errorMsg, setErrorMsg] = React.useState<string>()
  const [isGettingLocation, setIsGettingLocation] = React.useState(false)

  const getCurrentLocation = async () => {
    let _location = await Location.requestForegroundPermissionsAsync()
    if (_location.status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      return
    }
    try {
      setIsGettingLocation(true)
      const userLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 500,
      })
      setLocation(userLocation)
      setIsGettingLocation(false)
    } catch (error) {
      console.log(error)
      setIsGettingLocation(false)
    }
  }

  React.useEffect(() => {
    if (typeof props.onGetLocation === 'function' && location) {
      props.onGetLocation(location)
    }
  }, [location, props.onGetLocation])

  return (
    <View style={[styles.container]}>
      <Button buttonStyle={[styles.btn]} radius={8} onPress={getCurrentLocation}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          {isGettingLocation === false && <Icon name='location' size={24} style={[styles.btn_icon]} />}
          {isGettingLocation === true && <ActivityIndicator size='small' color='#1e47c3' />}
        </View>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: 48,
  },
  btn: {
    width: 48,
    height: '100%',
    backgroundColor: '#8cbcff',
  },
  btn_icon: {
    color: '#1e47c3',
    fontSize: 18,
    marginRight: 2,
  },
})
