import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(_, action) {
      const content = action.payload
      return content
    },
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer