"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/storeHook"
import { clearResults } from "../store/slices/searchSlice"
import { SearchThunk } from "@/store/thunks"
import SearchBar from "../components/Search/SearchBar"
import FilterPanel from "../components/Search/FilterPanel"
import FileGrid from "../components/Search/FileGrid"

// ToDo: Need to improve with a hook.
const Search: React.FC = () => {
  const dispatch = useAppDispatch()
  const { query, results, filters, isLoading, pagination } = useAppSelector((state) => state.search)

 const debounceRef = useRef<NodeJS.Timeout | null>(null)

useEffect(() => {
  if (debounceRef.current) clearTimeout(debounceRef.current)
  debounceRef.current = setTimeout(() => {
    handleSearch()
  }, 200)
  return () => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
  }
}, [filters, query, pagination.limit])

  const handleSearch =(searchQuery?: string) => {
      dispatch(clearResults())
      dispatch(
        SearchThunk.searchFiles({
          query: searchQuery || query,
          tags: filters.tags,
          type: filters.type,
          page: 1,
          limit: pagination.limit,
        }),
      )
    }

  const handleLoadMore = () => {
    if (pagination.hasMore && !isLoading) {
      dispatch(
        SearchThunk.searchFiles({
          query,
          tags: filters.tags,
          type: filters.type,
          page: pagination.page + 1,
          limit: pagination.limit,
        }),
      )
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Files</h1>
        <p className="text-gray-600">Find your multimedia files quickly with our powerful search and filtering tools</p>
      </div>

      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FilterPanel />
        </div>

        <div className="lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {results.length > 0 && (
                <span>
                  Showing {results.length} of {pagination.total} results
                  {query && (
                    <span>
                      {" "}
                      for "<strong>{query}</strong>"
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>

          <FileGrid files={results} isLoading={isLoading} onLoadMore={handleLoadMore} hasMore={pagination.hasMore} />
        </div>
      </div>
    </div>
  )
}

export default Search
