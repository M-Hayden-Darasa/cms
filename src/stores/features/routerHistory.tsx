import { createSlice } from '@reduxjs/toolkit'

import type { HistoryRouterInterface } from '@/models/common.model'

const initialState: HistoryRouterInterface = {
  objectHistory: [],
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    actionUpdateObjHistory(state, action) {
      state.objectHistory = action.payload
    },
  },
  extraReducers: () => {},
})

export const { actionUpdateObjHistory } = historySlice.actions

export default historySlice.reducer
