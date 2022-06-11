export const THEME = {
  MAIN_COLOR: '#303f9f',
  DANGER_COLOR: '#d81b60'
}


import { StyleSheet } from 'react-native'

export const globalStyles = StyleSheet.create({
  center: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontFamily: 'open-regular',
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  title: {
    fontFamily: 'open-regular',
    fontSize: 18,
    color: '#333'
  },
  image: {
    width: '100%',
    height: 200
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20
  }
})