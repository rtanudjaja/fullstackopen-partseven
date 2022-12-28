import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs(_, action) {
      const content = action.payload
      return content
    },
  },
})

export const { setBlogs } = blogSlice.actions
export default blogSlice.reducer