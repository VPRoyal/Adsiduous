"use client"
import { useEffect } from "react"
import { Filter, X } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook"
import { setFilters } from "@/store/slices/searchSlice"
import {SearchThunk} from "@/store/thunks"
import { showToast } from "../UI/Toast"
import { extractErrorMessage } from "@/utils/errorHandler"


const FilterPanel= () => {
  const dispatch = useAppDispatch()
  const { filters, tags } = useAppSelector((state) => state.search)

  const fileTypes = [
    { value: "image", label: "Images" },
    { value: "video", label: "Videos" },
    { value: "audio", label: "Audio" },
    { value: "pdf", label: "PDFs" },
  ]

  useEffect(() => {
    console.log("Usefeect")
    // Fetch tags from the backend
    fetchTags()
  }, [])

  const fetchTags = () => {
      try {
        dispatch(SearchThunk.getTags(""))
      } catch (err) {
        const parsedErr=extractErrorMessage(err, "SEARCH_NO_RESULTS");
        showToast.error(parsedErr.message)
      }
    }


  const handleTypeChange = (type: string) => {
    const newType = filters.type === type ? undefined : type
    dispatch(setFilters({ type: newType }))
  }

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag) ? filters.tags.filter((t) => t !== tag) : [...filters.tags, tag]

    dispatch(setFilters({ tags: newTags }))
  }

  const clearFilters = () => {
    dispatch(setFilters({ type: undefined, tags: [] }))
  }

  const hasActiveFilters = filters.type || filters.tags.length > 0

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
            <X className="w-4 h-4 mr-1" />
            Clear
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* File Type Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">File Type</h4>
          <div className="space-y-2">
            {fileTypes.map((type) => (
              <label key={type.value} className="flex items-center">
                <input
                  type="radio"
                  name="file_type"
                  checked={filters.type === type.value}
                  onChange={() => handleTypeChange(type.value)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-600">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tags Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                  filters.tags.includes(tag)
                    ? "bg-primary-100 border-primary-300 text-primary-800"
                    : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel
