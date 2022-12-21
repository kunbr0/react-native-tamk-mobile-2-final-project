import React from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { SwipeListView } from 'react-native-swipe-list-view'
import Icon from 'react-native-vector-icons/AntDesign'
import API_GetGroupWeather from './api/getGroupWeather'
import { IWeatherData } from '../../interfaces/WeatherData.interface'
import { cloneDeep } from 'lodash'
import dayjs from 'dayjs'
import CitySelectionContext from '../../contexts/_CitySelectionContext'

const HomeScreen = ({ navigation }: StackScreenProps<any>) => {
  const { cityIds } = React.useContext(CitySelectionContext)
  const [listData, setListData] = React.useState<IWeatherData[]>([])
  const [groupWeatherResponse, getGroupWeather] = API_GetGroupWeather()

  React.useEffect(() => {
    getGroupWeather({
      cityIds,
      callbackAfterSuccess(data) {
        setListData(
          cloneDeep(
            data.list.map((data) => ({
              ...data,
              key: data.id,
            })),
          ),
        )
      },
    })
  }, [getGroupWeather, cityIds])

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow()
    }
  }

  const deleteRow = (rowMap: any, rowKey: any) => {
    closeRow(rowMap, rowKey)
    const newData = [...listData]
    const prevIndex = listData.findIndex((item: any) => item.key === rowKey)
    newData.splice(prevIndex, 1)
    setListData(newData)
  }

  const onRowDidOpen = (rowKey: any) => {
    console.log('This row opened', rowKey)
  }

  const renderItem = (data: { item: IWeatherData }) => (
    <TouchableHighlight
      onPress={() => {
        console.log('You touched me')
        navigation.navigate('WeatherDetailsScreen', { cityName: data.item.name })
      }}
      style={styles.rowFront}
      underlayColor={'#AAA'}
    >
      <View style={[styles.city_container]}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ display: 'flex', flexDirection: 'column', paddingVertical: 4, paddingHorizontal: 12 }}>
            <Text style={[styles.city_name]}>{data.item.name}</Text>
            <Text style={[styles.city_time]}>
              {dayjs
                .utc()
                .add(data.item.sys.timezone ?? 0, 'second')
                .format('HH.mm A')}
            </Text>
          </View>
          <View>
            <Text style={[styles.city_temp]}>{Math.round(data.item.main.temp ?? 0)}°</Text>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 12, paddingRight: 10, marginTop: 16, marginBottom: 2 }}>
          <Text style={[styles.desc]}>{data.item.weather[0].main}</Text>
          <Text style={[styles.high_low]}>
            H:{Math.round(data.item.main.temp_max ?? 0)}°{'  '}L:{Math.round(data.item.main.temp_min ?? 0)}°
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  )

  const renderHiddenItem = (data: any, rowMap: any) => (
    <View style={styles.rowBack}>
      <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={() => deleteRow(rowMap, data.item.key)}>
        <Text style={styles.backTextWhite}>
          <Icon name='delete' size={24} />
        </Text>
      </TouchableOpacity>
    </View>
  )

  if (groupWeatherResponse.isLoading) {
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator size='large' />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <SwipeListView
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={0}
          rightOpenValue={-(75 + 16)}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 16,
  },
  loading_container: {
    paddingVertical: 24,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#4a87c0',
    marginBottom: 16,
    borderRadius: 8,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 0,
  },
  backRightBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 16,
    right: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderRadius: 8,
  },

  //
  city_container: {
    paddingVertical: 8,
  },
  city_name: {
    fontSize: 22,
    fontWeight: '500',
    color: '#ffffff',
  },
  city_time: {
    fontSize: 12,
    fontWeight: '500',
    color: '#ffffff',
    marginTop: 2,
  },
  city_temp: {
    fontSize: 36,
    fontWeight: '400',
    color: '#ffffff',
    paddingRight: 8,
  },
  desc: {
    color: '#eaffff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  high_low: {
    color: '#eaffff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
  },
})

export default HomeScreen
