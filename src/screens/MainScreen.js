import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { PostList } from '../components/PostList'

import { loadPosts } from '../store/post'
import { THEME } from '../theme'
//import { loadPosts } from '../store/actions/post'

export const MainScreen = ({ navigation }) => {
  const openPostHandler = post => {
    navigation.navigate('Post', {
      booked: post.booked,
      date: post.date,
      id: post.id,
      img: post.img,
      text: post.text,
    })
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadPosts())
  }, [dispatch])

  //const allPosts = useSelector(state => state.post.allPosts)
  //const status = useSelector(state => state.post.status)

  // aka:
  const postsData = useSelector(state => state.post)
  const { allPosts, status } = postsData

  if (status !== 'success') {
    return (
      <View style={styles.center}>
        <ActivityIndicator size='large' color={THEME.MAIN_COLOR} />
      </View>
    )
  }

  return <PostList data={allPosts} onOpen={openPostHandler} />
}


const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})