import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import appSlice from './app/appSlice';
import tourSlice from './tours/tourSlice';
import userSlice from './users/userSlice'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

// use redux persist to save data on localStage
const commonConfig = {
  key: 'tour/user',
  storage
}
const userConfig = {
  ...commonConfig,
  whitelist: ['isLoggedIn', 'token']
}

export const store = configureStore({
  reducer: {
    app: appSlice,
    tours: tourSlice,
    user: persistReducer(userConfig, userSlice)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)
