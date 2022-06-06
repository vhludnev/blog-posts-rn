import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { AppNavigation } from './src/navigation/AppNavigation'
import { bootstrap } from './src/bootstrap'
import 'react-native-gesture-handler'

import store from './src/store'

export default function App() {
  const [isReady, setIsReady] = useState(false)

  async function loadFonts() {
    try {       
      await bootstrap()
    } catch (e) {
      console.warn(e);
    } finally {
      setIsReady(true) 
    }
  }

  useEffect(() => { loadFonts() }, [])

  if (!isReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  )
}
