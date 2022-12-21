import 'react-native-gesture-handler'
import React from 'react'
import { StyleSheet } from 'react-native'
import WeatherDetailsScreen from './screens/WeatherDetails'
import HomeScreen from './screens/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackHeaderProps, StackScreenProps } from '@react-navigation/stack'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { Button } from '@rneui/themed'
import Icon from 'react-native-vector-icons/AntDesign'
import { AddCityScreen } from './screens/AddCity'
import AppContextProvider from './contexts'

dayjs.extend(utc)
dayjs.extend(timezone)

const Stack = createStackNavigator()

const App = () => {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='HomeScreen'
            component={HomeScreen}
            options={({ navigation }: StackScreenProps<any>) => ({
              title: 'Home',
              headerRight: () => (
                <Button color='transparent' onPress={() => navigation.push('AddCityScreen')}>
                  <Icon name='plus' size={24} />
                </Button>
              ),
            })}
          />
          <Stack.Screen
            name='WeatherDetailsScreen'
            component={WeatherDetailsScreen}
            options={{
              title: 'Weather & Forecast',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name='AddCityScreen'
            component={AddCityScreen}
            options={{
              title: 'Add City',
              headerBackTitle: 'Back',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  )
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#b4d1c3',
  },
})

export default App
