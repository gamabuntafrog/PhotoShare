import { createSlice } from '@reduxjs/toolkit'
import colorTypes from '../../types/colorTypes'

export interface ThemeState {
  mode: 'dark' | 'light'
  primaryColor: colorTypes
}

const initialState: ThemeState = {
  mode: 'dark',
  primaryColor: colorTypes.blue
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleColorMode: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
    },
    setPrimaryColor: (state, { payload }: { payload: colorTypes }) => {
      state.primaryColor = payload
    }
  }
})

export const { toggleColorMode, setPrimaryColor } = themeSlice.actions
