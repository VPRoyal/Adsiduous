// /api/request.ts
import type { AxiosRequestConfig } from "axios"
import axiosInstance from "@/configs/axios"

export const apiClient = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await axiosInstance.request(config)
    return response.data
  } catch (error: any) {
    console.error("API request failed:", error)
    const message = error?.response?.data?.message || "API request error"
    throw new Error(message)
  }
}
