import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  //Image,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { useDispatch } from 'react-redux'
import { addPost } from '../store/post'
import { THEME } from '../theme'
import { PhotoPicker } from '../components/PhotoPicker'

export const CreateScreen = ({ navigation }) => {
  const [text, setText] = useState('')
  const imgRef = useRef()
  const [inputFocused, setInputFocused] = useState(false)
  const dispatch = useDispatch()

  const imgDemo = 'https://static.coindesk.com/wp-content/uploads/2019/01/shutterstock_1012724596-860x430.jpg'

  const saveHandler = () => {
    const post = {
  //    id: Date.now().toString(),  // timestamp
      date: new Date().toJSON(),
      text: text,
      img: imgRef.current ? imgRef.current : imgDemo,
      booked: false
    }
    dispatch(addPost(post))
    navigation.navigate('Main')
  }

  const photoPickHandler = uri => {
    imgRef.current = uri
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Create new post</Text>
          <TextInput
            style={[styles.textarea, inputFocused && {backgroundColor: 'lightgrey', color: '#333'}]}
            placeholderTextColor={inputFocused ? 'grey' : 'grey'}
            placeholder='Add post text'
            value={text}
            onChangeText={setText}
            multiline
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            autoFocus={true}
            autoCorrect={false}
            returnKeyLabel='OK'
          />
          {/* <Image
            style={{ width: '100%', height: 200, marginBottom: 10 }}
            source={{ uri: img }}
          /> */}
          <PhotoPicker onPick={photoPickHandler} textFocused={inputFocused} />
          {!inputFocused && (
            <Button
              title='Add post'
              disabled={!text}
              color={THEME.MAIN_COLOR}
              onPress={saveHandler}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'open-regular',
    marginVertical: 10
  },
  textarea: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 8
  }
})
