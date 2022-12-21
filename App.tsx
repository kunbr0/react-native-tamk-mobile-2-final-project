import 'react-native-gesture-handler'
import React from 'react'
import { StyleSheet } from 'react-native'
import WeatherDetails from './screens/WeatherDetails'
import HomeScreen from './screens/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { Button } from '@rneui/themed'
import Icon from 'react-native-vector-icons/AntDesign'

dayjs.extend(utc)
dayjs.extend(timezone)

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='HomeScreen'
          component={HomeScreen}
          options={{
            headerRight: () => (
              <Button color='transparent'>
                <Icon name='plus' size={24} />
              </Button>
            ),
          }}
        />
        <Stack.Screen name='WeatherDetails' component={WeatherDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#b4d1c3',
  },
})

export default App
