import { createSlice } from "@reduxjs/toolkit"
import type { AuthState } from "../../types"
import { storage } from "../../utils/localStorage"
import { AuthThunk } from "@/store/thunks"
const {loginUser, registerUser, getCurrentUser}=AuthThunk;

// Optionals: We can add custom error state here and useEffects in componenets to manage errors

const initialState: AuthState = {
  user: storage.getUser(),
  token: storage.getToken()!,
  isLoading: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      storage.clear()
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state, _action) => {
        state.isLoading = false
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false
      })
      // Get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
