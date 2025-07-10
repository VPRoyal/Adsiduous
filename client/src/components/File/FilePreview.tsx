"use client"

import type React from "react"
import { useState } from "react"
import type { FileItem } from "../../types"
import { formatFileSize } from "../../utils/fileHelpers"
import { Calendar, Eye, Tag, Download, ExternalLink } from "lucide-react"

interface FilePreviewProps {
  file: FileItem
}

const FilePreview: React.FC<FilePreviewProps> = ({ file }) => {
  const [imageError, setImageError] = useState(false)

  const renderPreview = () => {
    switch (file.type) {
      case "image":
        return (
          <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
            {!imageError ? (
              <img
                src={file.thumbnailUrl || file.url}
                alt={file.originalName}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span className="text-4xl">🖼️</span>
              </div>
            )}
          </div>
        )

      case "video":
        return (
          <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
            <video src={file.url} className="w-full h-full object-cover" controls={false} muted />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <span className="text-white text-4xl">▶️</span>
            </div>
          </div>
        )

      case "audio":
        return (
          <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
            <span className="text-6xl">🎵</span>
          </div>
        )

      case "pdf":
        return (
          <div className="h-48 bg-red-50 rounded-lg flex items-center justify-center">
            <span className="text-6xl">📄</span>
          </div>
        )

      default:
        return (
          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-6xl">📁</span>
          </div>
        )
    }
  }

  const handleView = () => {
    window.open(file.url, "_blank")
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = file.url
    link.download = file.originalName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="card group hover:shadow-md transition-shadow duration-200">
      {renderPreview()}

      <div className="mt-4 space-y-3">
        <div>
          <h3 className="font-medium text-gray-900 truncate" title={file.originalName}>
            {file.originalName}
          </h3>
          <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
        </div>

        {file.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {file.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
            {file.tags.length > 3 && <span className="text-xs text-gray-500">+{file.tags.length - 3} more</span>}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(file.uploadDate).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              {file.viewCount}
            </span>
          </div>
        </div>

        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleView}
            className="flex-1 flex items-center justify-center px-3 py-2 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            View
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300 transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilePreview
