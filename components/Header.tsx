import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

interface IHeaderProps {
  location?: string
}

const Header = (props: IHeaderProps) => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.text_base]}>Current location: {props.location || 'Unknown'}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    backgroundColor: '#67B5C9',
  },
  text_base: {
    fontSize: 18,
  },
})

export default Header
