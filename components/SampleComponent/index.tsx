import { StyleSheet, View } from 'react-native'

interface ISampleComponentProps {}

export function SampleComponent(props: ISampleComponentProps) {
  return <View style={[styles.container]}></View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 16,
  },
})
