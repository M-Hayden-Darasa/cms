import { createSlice } from '@reduxjs/toolkit'

import type { InitialAuthInterface } from '@/models/auth.model'

const initialState: InitialAuthInterface = {
  isAuth: true,
  userInfo: {
    useName: 'Hayden',
    email: 'mhayden@darasa.io',
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: () => {},
})

export const {} = authSlice.actions

export default authSlice.reducer
