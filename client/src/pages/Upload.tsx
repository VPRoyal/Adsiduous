"use client"

import type React from "react"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook"
import { UploadThunk } from "@/store/thunks"
import { showToast } from "@/components/UI/Toast"
import FileDropzone from "@/components/Upload/FileDropzone"
import TagInput from "@/components/Upload/TagInput"
import LoadingSpinner from "@/components/UI/LoadingSpinner"
import { UploadIcon, CheckCircle } from "lucide-react"

const Upload: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isUploading, uploadProgress } = useAppSelector((state) => state.upload)

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])


  const handleFilesSelected = (files: File[]) => {
   setSelectedFiles((prev) => [...prev, ...files])
  }

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      showToast.error("Please select files to upload")
      return
    }

    const uploadPromises = selectedFiles.map(async (file) => {
      try {
        await dispatch(UploadThunk.uploadFile({ file, tags })).unwrap()
        setUploadedFiles((prev) => [...prev, file.name])
        showToast.success(`${file.name} uploaded successfully!`)
      } catch (error) {
        showToast.error(`Failed to upload ${file.name}`)
      }
    })

    await Promise.all(uploadPromises)

    // Clear form after successful upload
    setSelectedFiles([])
    setTags([])

    // Clear uploaded files list after a delay
    setTimeout(() => {
      setUploadedFiles([])
    }, 3000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Files</h1>
        <p className="text-gray-600">Upload and organize your multimedia files with tags for easy searching</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Files</h2>
            <FileDropzone
              onFilesSelected={handleFilesSelected}
              selectedFiles={selectedFiles}
              onRemoveFile={handleRemoveFile}
              isUploading={isUploading}
            />
          </div>

          <div className="card">
            <TagInput tags={tags} onTagsChange={setTags} placeholder="Add tags to organize your files..." />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleUpload}
              disabled={selectedFiles.length === 0 || isUploading}
              className="btn-primary flex items-center space-x-2 px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Uploading... {uploadProgress}%</span>
                </>
              ) : (
                <>
                  <UploadIcon className="w-5 h-5" />
                  <span>Upload Files</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Upload Progress */}
          {isUploading && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Progress</h3>
              <div className="space-y-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 text-center">{uploadProgress}% complete</p>
              </div>
            </div>
          )}

          {/* Recently Uploaded */}
          {uploadedFiles.length > 0 && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Uploaded</h3>
              <div className="space-y-2">
                {uploadedFiles.map((fileName, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700 truncate">{fileName}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Tips */}
          <div className="card bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Upload Tips</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Supported formats: Images, Videos, Audio, PDFs</li>
              <li>• Maximum file size: 100MB per file</li>
              <li>• Add relevant tags for better organization</li>
              <li>• Use descriptive filenames</li>
              <li>• Multiple files can be uploaded at once</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload
