import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView, View, TextInput, StyleSheet, Image, Alert, LogBox, TouchableHighlight, Modal, Pressable } from 'react-native'
import ImageZoom from 'react-native-image-pan-zoom'
import { THEME, globalStyles } from '../theme'
import { toogleBooked, removePost, textUpdatePost } from '../store/post'
import { Ionicons } from '@expo/vector-icons'
import useDimentions from '../hooks/useDimentions'

LogBox.ignoreLogs([ 'Non-serializable values were found in the navigation state' ])

export const PostScreen = ({ navigation, route }) => {
  const { id: postId } = route.params
  const [modalVisible, setModalVisible] = useState(false)
  const [newText, setNewText] = useState('')

  const { display, width, height } = useDimentions()
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
            dispatch(removePost(postId))
            navigation.navigate('Main')
          }
        }
      ],
      { cancelable: false }
    )
  }

  // useEffect(() => {
  //   setNewText(post.text)
  // }, [])


  if (!post) {
    return null
  }

  return (
    <>   
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={[styles.centeredView, styles.modalView]}>
            <ImageZoom 
              cropWidth={width}
              cropHeight={display === 'PORTRAIT' ? height + 25 : height}
              imageWidth={width}
              imageHeight={display === 'PORTRAIT' ? height : '100%'}
              maxOverflow={0}>
              <Image 
                source={{ uri: post.img }} 
                style={{ height: display === 'PORTRAIT' ? height : '100%', width: width, resizeMode: 'contain' }} 
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
      
      <ScrollView>
        <TouchableHighlight onPress={() => setModalVisible(true)} style={styles.centeredView}>
          <Image source={{ uri: post.img }} style={[globalStyles.image, display === 'PORTRAIT' ? {resizeMode: 'contain'} : null]} />
        </TouchableHighlight>
        <View style={styles.textWrap}>
          <TextInput 
            style={globalStyles.title}
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
  // image: {
  //   width: '100%',
  //   height: 200,
  // },
  textWrap: {
    padding: 10
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
