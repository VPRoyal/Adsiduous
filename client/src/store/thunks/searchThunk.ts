import { createAsyncThunk } from "@reduxjs/toolkit";
import { SearchActions } from "./actionTypes";
import {SearchService} from "@/services";
import type { SearchParams } from "@/types";
import { extractErrorMessage } from "@/utils/errorHandler";

const searchFiles = createAsyncThunk(
  SearchActions.SEARCH,
  async (params: SearchParams, { rejectWithValue }) => {
    try {
      const response: any = await SearchService.searchFiles(params);
      return response.data;
    } catch (error) {
    const parsedError = extractErrorMessage(error, "SEARCH_NO_RESULTS")
    return rejectWithValue(parsedError)
    }
  }
);

const getSuggestions = createAsyncThunk(
  SearchActions.SUGGESTIONS,
  async (query: string, { rejectWithValue }) => {
    try {
      const response: any = await SearchService.getSuggestions(query);
      return response.data;
    } catch (error) {
    const parsedError = extractErrorMessage(error, "SEARCH_QUERY_INVALID")
    return rejectWithValue(parsedError)
    }
  }
);

const getTags = createAsyncThunk(
  SearchActions.TAGS,
  async (query: string, { rejectWithValue }) => {
    try {
      const response: any = await SearchService.getTags();
      return response.data;
    } catch (error) {
    const parsedError = extractErrorMessage(error, "DEFAULT")
    return rejectWithValue(parsedError)
    }
  }
);

export default {
  getSuggestions, searchFiles, getTags
}
