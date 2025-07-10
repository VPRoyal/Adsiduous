"use client"

import type React from "react"
import type { FileItem } from "../../types"
import FilePreview from "../File/FilePreview"
import SkeletonLoader from "../UI/SkeletonLoader"

interface FileGridProps {
  files: FileItem[]
  isLoading: boolean
  onLoadMore?: () => void
  hasMore?: boolean
}

const FileGrid: React.FC<FileGridProps> = ({ files, isLoading, onLoadMore, hasMore = false }) => {
  if (isLoading && files.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="card">
            <SkeletonLoader className="h-48 mb-4" />
            <SkeletonLoader className="h-4 mb-2" />
            <SkeletonLoader className="h-3 w-2/3" />
          </div>
        ))}
      </div>
    )
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📁</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
        <p className="text-gray-500">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {files.map((file) => (
          <FilePreview key={file.id} file={file} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center">
          <button onClick={onLoadMore} disabled={isLoading} className="btn-primary">
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  )
}

export default FileGrid
