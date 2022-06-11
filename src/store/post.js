import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as FileSystem from 'expo-file-system'
//import { DATA } from '../__data'
import { DB } from '../db'

const loadPosts = createAsyncThunk(
   'postReducer/loadPosts',
   async (_, { rejectWithValue }) => {
      try {
         let posts = await DB.getPosts()
         if (posts) {
            return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
         } else {
            return []
         }
      } catch (error) {
         const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString()
         return rejectWithValue(message)
         //return rejectWithValue('no posts can be loaded now')
      }
   }
)

const addPost = createAsyncThunk(
   'postReducer/addPost',
   async (post, { rejectWithValue }) => {
      try {
         const fileName = post.img.split('/').pop()
         const noImgCheck = post.img.split(':')[0].includes('https')
         const newPath = FileSystem.documentDirectory + fileName

         try {
            !noImgCheck && await FileSystem.moveAsync({
               to: newPath,
               from: post.img
            })
         } catch (e) {
            console.log('Error: ', e)
         }

         const payload = noImgCheck ? {...post} : { ...post, img: newPath }
         const id = await DB.createPost(payload)
         payload.id = id

         return payload
      } catch (err) {
         return rejectWithValue('error adding a new post')
      }
   }
)

const toogleBooked = createAsyncThunk(
   'postReducer/toogleBooked',
   async (post) => {
      await DB.updateBookedPost(post)
      return post.id
   }
)

const textUpdatePost = createAsyncThunk(
   'postReducer/textUpdatePost',
   async (post) => {
      await DB.textUpdatePost(post)
      return post
   }
)

const removePost = createAsyncThunk(
   'postReducer/removePost',
   async (id, { rejectWithValue }) => {
      try {
         await DB.removePost(id)
         return id
      } catch(err) {
         return rejectWithValue(err)
      }
   }
)


const initialState = {
   allPosts: [],
   bookedPosts: [],
   status: 'idle',
   error: null
}


const postReducer = createSlice({
   name: 'post',
   initialState,
   reducers: {},
   extraReducers:  {
      [loadPosts.pending]: (state, action) => {
         state.status = 'loading'
      },
      [loadPosts.fulfilled]: (state, action) => {
         return {
            ...state,
            status: 'success',
            allPosts: action.payload /* || DATA */,
            bookedPosts: action.payload.filter(post => post.booked) /* || DATA.filter(post => post.booked) */,
         }
         /// the same as above: ///
         // state.allPosts = action.payload
         // state.status = 'success'
         // state.bookedPosts = action.payload.filter(post => post.booked)
      },
      [loadPosts.rejected]: (state, action) => {
         //state.allPosts = []
         state.status = 'failed'
         state.error = action.payload
      },
      [addPost.fulfilled]: (state, action) => {
         state.allPosts.unshift(action.payload)
         /// the same as above: ///
         // return {
         //    ...state,
         //    allPosts: [{ ...action.payload }, ...state.allPosts]
         // }
      },
      [loadPosts.rejected]: (state, action) => {
         state.status = 'failed'
         state.error = action.payload
      },
      [textUpdatePost.fulfilled]: (state, action) => {
         const allPosts = state.allPosts.map(post => {
            if (post.id === action.payload.id) {
              post.text = action.payload.text
            }
            return post
         })
         state.allPosts = allPosts
         state.bookedPosts = allPosts.filter(post => post.booked)
         return state
      },
      [toogleBooked.fulfilled]: (state, action) => {
         const allPosts = state.allPosts.map(post => {
            if (post.id === action.payload) {
              post.booked = !post.booked
            }
            return post
         })
         state.allPosts = allPosts
         state.bookedPosts = allPosts.filter(post => post.booked)
         return state
      },
      [removePost.fulfilled]: (state, action) => {
         return {
            ...state,
            allPosts: state.allPosts.filter(p => p.id !== action.payload),
            bookedPosts: state.bookedPosts.filter(p => p.id !== action.payload)
         }
      },
      [removePost.rejected]: (state, action) => {
         state.status = 'failed'
         state.error = action.payload
      },
   }
 })

 //export const { loadPosts, toogleBooked, removePost, addPost } = postReducer.actions       // no need because there are no regular reducers
 export { loadPosts, toogleBooked, removePost, addPost, textUpdatePost }
 export default postReducer.reducer











 // reducers: {
//   loadPosts(state, action) {
//     return {
//       //...state,
//       allPosts: /* action.payload */DATA,
//       bookedPosts: /* action.payload */DATA.filter(post => post.booked)
//     }
//   },
//   toogleBooked(state, action) {
//     const post = state.allPosts.find(p => p.id === action.payload)
//     post.booked = !post.booked
//   },
//   removePost(state, action) {
//     return {
//       ...state,
//       allPosts: state.allPosts.filter(p => p.id !== action.payload),
//       bookedPosts: state.bookedPosts.filter(p => p.id !== action.payload)
//     }
//   },
//   addPost(state, action) {
//     state.allPosts.id = Date.now().toString()
//     return {
//       ...state,
//       allPosts: [{ ...action.payload }, ...state.allPosts]
//     }
//   }
// }