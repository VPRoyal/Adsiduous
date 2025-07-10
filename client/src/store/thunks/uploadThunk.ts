import { createAsyncThunk } from "@reduxjs/toolkit";
import { UploadActions } from "./actionTypes";
import {UploadService} from "@/services";
import { extractErrorMessage } from "@/utils/errorHandler";
const uploadFile = createAsyncThunk(
  UploadActions.UPLOAD,
  async ({ file, tags }: { file: File; tags: string[] }, { rejectWithValue }) => {
    try {
      const response = await UploadService.uploadFile(file, tags)
      return response.data
    } catch (error) {
    const parsedError = extractErrorMessage(error, "UPLOAD_FAILED")
    return rejectWithValue(parsedError)
    }
  },
)

export default {uploadFile}