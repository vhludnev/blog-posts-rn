import { configureStore } from '@reduxjs/toolkit'
import postReducer from './post'

const reducer = {
  post: postReducer
}

const store = configureStore({ reducer })

export default store

// // export default configureStore({
// //   reducer: {
// //     post: postReducer,
// //   }
// // })




// import { createStore, combineReducers } from 'redux'
// import { postReducer } from './reducers/post'

// const rootReducer = combineReducers({
//   post: postReducer
// })

// export default createStore(rootReducer)
