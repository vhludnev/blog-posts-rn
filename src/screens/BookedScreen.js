import React from 'react'
import { useSelector } from 'react-redux'
import { PostList } from '../components/PostList'

export const BookedScreen = ({ navigation }) => {
  const openPostHandler = post => {
    navigation.navigate('Post', {
      booked: post.booked,
      date: post.date,
      id: post.id,
      img: post.img,
      text: post.text,
    })
  }

  const bookedPosts = useSelector(state => state.post.bookedPosts)

  return <PostList data={bookedPosts} onOpen={openPostHandler} />
}
