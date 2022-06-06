import React, { useState } from 'react'
import { View, StyleSheet, Image, /* Alert, */ TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons'
import { THEME } from '../theme'

async function permissionsStatus(status) {
  if (!status.granted) {
    //Alert.alert('Error', 'You did not give permissions to create photo')
    return false
  }
  return true
}

export const PhotoPicker = ({ onPick, textFocused }) => {
  const [image, setImage] = useState(null)
  const [status, requestPermission] = ImagePicker.useCameraPermissions()

  const takePhoto = async () => {
    await requestPermission()
    await permissionsStatus(status)

    const img = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: false,
      maxWidth: 1280, 
      maxHeight: 720,
      aspect: [16, 9]
    })

    if (!img.cancelled) {
      setImage(img.uri)
      onPick(img.uri)
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      maxWidth: 1280, 
      maxHeight: 720,
      aspect: [16, 9],
      quality: 1,
    })

    if (!result.cancelled) {
      setImage(result.uri)
      onPick(result.uri)
    }
  }

  return (
    <View style={styles.wrapper}>
      {image && <Image style={styles.image} source={{ uri: image }} />}
      <View style={styles.buttonsWrapper}>
        {/* <Button title='Camera' onPress={takePhoto} />
        <Button title='Gallery' onPress={pickImage} /> */}
        <TouchableOpacity activeOpacity={0.7} onPress={takePhoto} style={[styles.icons, textFocused && {elevation: 0, shadowRadius: 0}]}>
          <Ionicons name='camera' size={24} color='#0492C2' style={textFocused && {opacity: 0.2}}/>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={pickImage} style={[styles.icons, textFocused && {elevation: 0, shadowRadius: 0}]}>
          <Ionicons name='image' size={24} color='green' style={textFocused && {opacity: 0.2}}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10
  },
  buttonsWrapper: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-evenly',
  },
  icons: {
    paddingHorizontal: 9,
    paddingVertical: 8,
    backgroundColor: "white",
    borderRadius: 35,
    shadowColor: THEME.MAIN_COLOR,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 10
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10
  }
})
