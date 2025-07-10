import { createAsyncThunk } from "@reduxjs/toolkit"
import type { LoginRequest, RegisterRequest } from "@/types"
import {AuthService} from "@/services"
import { AuthActions } from "./actionTypes"
import { storage } from "@/utils/localStorage"
import { extractErrorMessage } from "@/utils/errorHandler"

const loginUser = createAsyncThunk(AuthActions.LOGIN, async (credentials: LoginRequest, { rejectWithValue }) => {
  try {
    const response:any = await AuthService.login(credentials)
    storage.setToken(response.data.token)
    storage.setUser(response.data.user)
    return response.data
  } catch (error) {
    const parsedError = extractErrorMessage(error, "AUTH_LOGIN_FAILED")
    return rejectWithValue(parsedError)
  }
})

const registerUser = createAsyncThunk(AuthActions.REGISTER,
  async (userData: RegisterRequest, { rejectWithValue }) => {
    try {
      const response:any = await AuthService.register(userData)
      storage.setToken(response.data.token)
      storage.setUser(response.data.user)
      return response.data
    } catch (error) {
const parsedError = extractErrorMessage(error, "AUTH_REGISTER_FAILED")
    return rejectWithValue(parsedError)    }
  },
)

const getCurrentUser = createAsyncThunk(AuthActions.GET_CURRENT_USER, async (_, { rejectWithValue }) => {
  try {
    const response:any = await AuthService.getMe()
    storage.setUser(response.data)
    return response.data
  } catch (error) {
    storage.clear()
const parsedError = extractErrorMessage(error, "GEN_NOT_FOUND")
    return rejectWithValue(parsedError)  }
})


export default {
  getCurrentUser,
  loginUser,
  registerUser
}