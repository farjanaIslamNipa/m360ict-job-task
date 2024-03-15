import {configureStore} from "@reduxjs/toolkit";
import taskReducer from './features/taskSlice'

import { 
  persistReducer, 
  persistStore, 
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'tasks',
  storage
}

const persistedTaskReducer = persistReducer(persistConfig, taskReducer)

export const store = configureStore({
  reducer: {
    tasks: persistedTaskReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)

