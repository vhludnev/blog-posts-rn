import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const AboutScreen = ({}) => {
  return (
    <View style={styles.center}>
      <Text>Best App for personal notes.</Text>
      <Text>
        App version <Text style={styles.version}>1.2.0</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  version: {
    fontFamily: 'open-bold'
  }
})
