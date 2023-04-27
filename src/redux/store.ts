import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { themeSlice } from './slices/themeSlice'
import userSlice from './slices/userSlice'
import { responseNotificationsSlice } from './slices/responseNotificationsSlice'
import { rootApi } from './api/rootApi'

const persistUserConfig = {
  key: 'user',
  storage,
  whitelist: ['token', 'language']
}

const persistThemeConfig = {
  key: 'theme',
  storage
}

const persistedUserReducer = persistReducer(persistUserConfig, userSlice.reducer)
const persistedThemeReducer = persistReducer(persistThemeConfig, themeSlice.reducer)

export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    userReducer: persistedUserReducer,
    themeReducer: persistedThemeReducer,
    responseNotificationsReducer: responseNotificationsSlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false
    }).concat(rootApi.middleware)
  }
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
