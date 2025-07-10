import { createSlice } from "@reduxjs/toolkit";
import type { SearchState } from "@/types";
import { SearchThunk } from "@/store/thunks";
const { searchFiles, getSuggestions, getTags } = SearchThunk;

const initialState: SearchState = {
  query: "",
  results: [],
  tags: [],
  suggestions: [],
  filters: {
    tags: [],
  },
  isLoading: false,
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    hasMore: false,
  },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearResults: (state) => {
      state.results = [];
      state.pagination = initialState.pagination;
    },
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Search files
      .addCase(searchFiles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchFiles.fulfilled, (state, action) => {
        state.isLoading = false;
        const { files, pagination } = action.payload;

        if (pagination.page === 1) {
          state.results = files;
        } else {
          state.results = [...state.results, ...files];
        }

        state.pagination = pagination;
      })
      .addCase(searchFiles.rejected, (state, _action) => {
        state.isLoading = false;
      })
      // Get suggestions
      .addCase(getSuggestions.fulfilled, (state, action) => {
        state.suggestions = action.payload;
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.tags = Array.isArray(action.payload)
          ? action.payload.map((item) =>
              typeof item === "string" ? item : item.tag
            )
          : [];
      });
  },
});

export const { setQuery, setFilters, clearResults, clearSuggestions } =
  searchSlice.actions;
export default searchSlice.reducer;
