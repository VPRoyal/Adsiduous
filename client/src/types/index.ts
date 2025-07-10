export interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
}

export interface FileItem {
  id: string
  filename: string
  originalName: string
  url: string
  thumbnailUrl?: string
  type: "image" | "video" | "audio" | "pdf"
  size: number
  tags: string[]
  uploadDate: string
  viewCount: number
  userId: string
}

export interface UploadState {
  files: FileItem[]
  isUploading: boolean
  uploadProgress: number
}

export interface SearchState {
  query: string
  results: FileItem[]
  suggestions: string[]
  tags: string[],
  filters: {
    type?: string
    tags: string[]
    dateRange?: {
      start: string
      end: string
    }
  }
  isLoading: boolean
  pagination: {
    page: number
    limit: number
    total: number
    hasMore: boolean
  }
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface SearchParams {
    query?: string
    tags?: string[]
    type?: string
    page?: number
    limit?: number
  }
