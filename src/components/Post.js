import React from 'react'
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, Pressable } from 'react-native'
import { toogleBooked } from '../store/post'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { Ionicons } from '@expo/vector-icons'

export const Post = ({ post, onOpen }) => {
  const dispatch = useDispatch()

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(post)}>
      <View style={styles.post}>
        <ImageBackground style={styles.image} source={{ uri: post.img }}>
          <View style={styles.textWrap}>
            <Text style={styles.title}>
              {moment(new Date(post.date)).format('DD/MM/YYYY HH:MM')}
            </Text>
          </View>
        </ImageBackground>
        <View style={styles.caption}>
          <Text style={styles.captionText} numberOfLines={1} ellipsizeMode="clip">
            {"#" + post.text.split(" ")[0].toUpperCase()}
          </Text>
        </View>
        <Pressable
          style={styles.favourite}
          onPress={() => dispatch(toogleBooked(post))}
        >
          <Ionicons name={post.booked ? 'ios-star' : 'ios-star-outline'} color='yellow' size={21}/>
        </Pressable>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  post: {
    marginBottom: 15,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 200
  },
  textWrap: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 5,
    alignItems: 'center',
    width: '100%'
  },
  title: {
    color: '#fff',
    fontFamily: 'open-regular'
  },
    caption: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderBottomRightRadius: 3,
    borderTopRightRadius: 3,
    bottom: 15,
    left: 0,
    paddingHorizontal: 12,
    paddingVertical: 4,
    position: "absolute",
    minWidth: 80,
  },
  captionText: {
    color: 'rgba(46, 56, 47, 0.8)',
    fontSize: 10,
    lineHeight: 12,
  },
  favourite: {
    position: "absolute",
    right: 10,
    bottom: 175
  }
})
