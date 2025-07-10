import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import uploadReducer from "./slices/uploadSlice"
import searchReducer from "./slices/searchSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    upload: uploadReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

