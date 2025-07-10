import { createSlice } from "@reduxjs/toolkit"
import type { UploadState } from "../../types"
import { UploadThunk } from "@/store/thunks"
const {uploadFile}= UploadThunk;

const initialState: UploadState = {
  files: [],
  isUploading: false,
  uploadProgress: 0,
}

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload
    },
    addFile: (state, action) => {
      state.files.unshift(action.payload)
    },
    removeFile: (state, action) => {
      state.files = state.files.filter((file) => file.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.isUploading = true
        state.uploadProgress = 0
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.isUploading = false
        state.uploadProgress = 100
        state.files.unshift(action.payload)
      })
      .addCase(uploadFile.rejected, (state, _action) => {
        state.isUploading = false
        state.uploadProgress = 0
      })
  },
})

export const { setUploadProgress, addFile, removeFile } = uploadSlice.actions
export default uploadSlice.reducer
