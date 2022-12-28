import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogReducer,
    notifications: notificationReducer,
  }
})

export default store