import React from 'react'
import { Button, Dimensions, StyleSheet, TextInput, View } from 'react-native'

interface IUpdateLocationProps {
  onChangeCity: (cityName: string) => any
}

const UpdateLocation = (props: IUpdateLocationProps) => {
  const [value, setValue] = React.useState('')

  const onPressUpdateLocation = () => {
    props.onChangeCity(value)
  }

  return (
    <View style={[styles.container]}>
      <TextInput style={[styles.textInput]} value={value} onChangeText={setValue} />
      <View style={{ marginTop: 10 }}>
        <Button title='Update Location' onPress={onPressUpdateLocation} color='#3832d8' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    paddingVertical: 50,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    borderTopWidth: 1,
  },
  text_base: {
    fontSize: 18,
  },
  textInput: {
    padding: 10,
    width: Dimensions.get('window').width - 50,
    borderWidth: 1,
  },
})

export default UpdateLocation
