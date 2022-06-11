import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { globalStyles } from '../theme'

export const AboutScreen = ({}) => {
  return (
    <View style={globalStyles.center}>
      <Text>Best App for personal notes.</Text>
      <Text>
        App version <Text style={styles.version}>1.3.0</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  // center: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  version: {
    fontFamily: 'open-bold'
  }
})
