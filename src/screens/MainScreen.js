import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text, View, ActivityIndicator } from 'react-native'
import { PostList } from '../components/PostList'
import SearchBar from '../components/SearchBar'
import { loadPosts } from '../store/post'
import { THEME, globalStyles } from '../theme'

export const MainScreen = ({ navigation }) => {
  const [term, setTerm] = useState('')
  //const [allPostsArr, setAllPostsArr] = useState([])
  const refInput = useRef('')
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
  }, [])

  //const allPosts = useSelector(state => state.post.allPosts)
  //const status = useSelector(state => state.post.status)

  // aka:
  const postsData = useSelector(state => state.post)
  const { allPosts, status } = postsData

  // useEffect(() => {
  //   setAllPostsArr(allPosts)
  // },[allPosts])
  
  const searchHandler = (term) => {
    if (term.length) {
      navigation.navigate('Search', {
        term,
        onOpen: openPostHandler
      })
      setTerm('')
    } 
    //return setAllPostsArr(allPosts.filter(post => post.text.toLowerCase().includes(term.toLowerCase())))
  }
//console.log(allPostsArr)
  if (status === 'loading') {
    return (
      <View style={globalStyles.center}>
        <ActivityIndicator size='large' color={THEME.MAIN_COLOR} />
      </View>
    )
  }

  return (
    <>
      {allPosts.length >= 3 && (
        <SearchBar 
          term={term}
          onTermChange={setTerm}
          onTermSubmit={() => searchHandler(term)} 
          refInput={refInput}
          clearSearch={() => {setTerm('')/* ; setAllPostsArr(allPosts) */}}
        />
      )}
      {/* {refInput.current && allPostsArr && allPostsArr.length !== allPosts.length ? (
        <Text style={{marginLeft: 10}}>We have found {allPostsArr.length} {allPostsArr.length === 1 ? 'result' : 'results'} </Text>
      ) : null} */}
      <PostList data={allPosts} onOpen={openPostHandler} />
    </>
  )
}
