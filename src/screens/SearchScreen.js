import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text, View } from 'react-native'
import { PostList } from '../components/PostList'
import { loadPosts } from '../store/post'

export const SearchScreen = ({ route }) => {
  const term = route.params.term
  const onOpen = route.params.onOpen

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(loadPosts())
  }, [])

  const allPosts = useSelector(state => state.post.allPosts)

  const posts = allPosts.filter(post => post.text.toLowerCase().includes(term.toLowerCase()))

  return (
    <View>
      {posts.length ? (
        <Text style={{marginLeft: 10, marginTop: 10}}>We have found {posts.length} {posts.length === 1 ? 'result' : 'results'} </Text>
      ) : null}
      <PostList data={posts} onOpen={onOpen} />
    </View>
  )
}
