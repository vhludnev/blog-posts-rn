import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView, View, TextInput, StyleSheet, Image, Alert, LogBox, Dimensions, TouchableHighlight, Modal, Pressable  } from 'react-native'
import ImageZoom from 'react-native-image-pan-zoom'
import { THEME } from '../theme'
import { toogleBooked, removePost, textUpdatePost } from '../store/post'
import { Ionicons } from '@expo/vector-icons'

LogBox.ignoreLogs([ 'Non-serializable values were found in the navigation state' ])

export const PostScreen = ({ navigation, route }) => {
  const { id: postId } = route.params
  const [modalVisible, setModalVisible] = useState(false)
  const [newText, setNewText] = useState('')
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width)
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height)

  const dispatch = useDispatch()

  const post = useSelector(state =>
    state.post.allPosts.find(p => p.id === postId)
  )

  const booked = useSelector(state =>
    state.post.bookedPosts.some(post => post.id === postId)
  )

  useEffect(() => {
    if (post) navigation.setParams({ booked })
  }, [booked, post])

  const toggleHandler = useCallback(() => {
    dispatch(toogleBooked(post))
  }, [post])

  useEffect(() => {
    if (post) navigation.setParams({ toggleHandler })
  }, [toggleHandler, post])

  const textUpdateHandler = useCallback(() => {
    if (newText !== post.text) dispatch(textUpdatePost({...post, text: newText}))
  }, [newText])

  const removeHandler = () => {
    Alert.alert(
      'Post Removal',
      'Are you sure you want to remove this post?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { text: 'Delete', 
          style: 'destructive', 
          onPress() {
            navigation.navigate('Main')
            dispatch(removePost(postId)) 
          }
        }
      ],
      { cancelable: false }
    )
  }

  useEffect(() => {
    setNewText(post.text)
  }, [])

  // dinamically change view when screen turns:
  useEffect(() => {
    const updateWidth = () => { setDeviceWidth(Dimensions.get('window').width) }
    const updateHeight = () => { setDeviceHeight(Dimensions.get('window').height) }

    Dimensions.addEventListener('change', updateWidth)
    Dimensions.addEventListener('change', updateHeight)

    return () => { 
      Dimensions.addEventListener('change', updateWidth).remove() 
      Dimensions.addEventListener('change', updateHeight).remove() 
    }
  })

  if (!post) {
    return null
  }

  return (
    <> 
      <View style={[styles.centeredView, { width: deviceWidth }]}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ImageZoom 
                cropWidth={deviceWidth}
                cropHeight={deviceHeight}
                imageWidth={deviceWidth}
                imageHeight={deviceWidth > deviceHeight ? deviceHeight : '100%'}
                maxOverflow={0}>
                <Image 
                  source={{ uri: post.img }} 
                  style={{ height: deviceWidth > deviceHeight ? deviceHeight : '100%', width: deviceWidth, resizeMode: 'contain' }} 
                />
              </ImageZoom>
              <View style={styles.button}>
                <Pressable
                  style={styles.buttonClose}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <View>
                    <Ionicons name='close-circle-outline' color='#2196F3' size={35}/>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <ScrollView>
        <TouchableHighlight onPress={() => setModalVisible(true)}>
          <Image source={{ uri: post.img }} style={styles.image} />
        </TouchableHighlight>
        <View style={styles.textWrap}>
          <TextInput 
            style={styles.title}
            onChangeText={setNewText}
            defaultValue={post.text}
            onBlur={textUpdateHandler}
            multiline
          />
        </View>
        {/* <Button
          title='Delete'
          color={THEME.DANGER_COLOR}
          onPress={removeHandler}
        /> */}
        <View style={styles.buttonWrapper}>
          <Pressable
            style={[styles.centeredView, styles.icon]}
            onPress={removeHandler}
          >
            <Ionicons name='trash-outline' color={THEME.DANGER_COLOR} size={24}/>
          </Pressable>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    backgroundColor: "white",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 136
  },
  buttonClose: {
    bottom: 0,
    position: 'absolute',
    paddingBottom: 20
  },
  image: {
    width: '100%',
    height: 200,
  },
  textWrap: {
    padding: 10
  },
  title: {
    fontFamily: 'open-regular'
  },
  buttonWrapper: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  icon: {
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
  }
})
