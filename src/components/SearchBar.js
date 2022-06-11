import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { THEME } from '../theme'

const SearchBar = ({ term, onTermChange, onTermSubmit, refInput, clearSearch }) => {

  return (
    <View style={styles.backgroundStyle}>
      <Feather name="search" size={26} style={styles.iconStyle} />
      <TextInput
        selectionColor={THEME.MAIN_COLOR}
        autoCapitalize='none'
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder='Search'
        value={term}
        onChangeText={/* newTerm => onTermChange(newTerm) */ onTermChange}
        onEndEditing={onTermSubmit}
        ref={refInput}
        //defaultValue={term}
        //onBlur={() => onTermChange(refInput.current.value)}
      />
      {term ? (
        <TouchableOpacity activeOpacity={0.7} style={styles.iconStyle} onPress={clearSearch} >
          <Ionicons name="ios-close-sharp" size={24}  />
        </TouchableOpacity>) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundStyle: {
    //marginTop: 10,
    backgroundColor: '#dcdcdc',
    height: 40,
    borderRadius: 5,
    //marginHorizontal: 10,
    flexDirection: 'row',
    //marginBottom: 10,
    margin: 10
  },
  inputStyle: {
    flex: 1,
    fontSize: 16
  },
  iconStyle: {
    //fontSize: 35,
    alignSelf: 'center',
    marginHorizontal: 15
  }
})

export default SearchBar
