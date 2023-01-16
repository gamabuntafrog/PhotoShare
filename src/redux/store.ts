import {configureStore, ThunkAction, Action, combineReducers} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import {postsApi} from "./api/postsApi";
import {themeSlice} from "./slices/themeSlice";
import {usersApi} from "./api/usersApi";
import userSlice from "./slices/userSlice";
import {collectionsApi} from "./api/collectionsApi";
import {responseNotificationsSlice} from "./slices/responseNotificationsSlice";
import {extendedPostsApi, rootApi} from "./api/rootApi";


const persistUserConfig = {
  key: 'user',
  storage,
  whitelist: ['token']
}

const persistThemeConfig = {
  key: 'theme',
  storage
}

const persistedUserReducer = persistReducer(persistUserConfig, userSlice.reducer)
const persistedThemeReducer = persistReducer(persistThemeConfig, themeSlice.reducer)


export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [collectionsApi.reducerPath]: collectionsApi.reducer,
    // [extendedApi.reducerPath]: extendedApi.reducer,
    [rootApi.reducerPath]: rootApi.reducer,
    userReducer: persistedUserReducer,
    themeReducer: persistedThemeReducer,
    responseNotificationsReducer: responseNotificationsSlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false
    }).concat(postsApi.middleware, usersApi.middleware, collectionsApi.middleware, rootApi.middleware)
  }
});
//, extendedApi.middleware
export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
