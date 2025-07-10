export const getFileType = (file: File): "image" | "video" | "audio" | "pdf" => {
  const type = file.type

  if (type.startsWith("image/")) return "image"
  if (type.startsWith("video/")) return "video"
  if (type.startsWith("audio/")) return "audio"
  if (type === "application/pdf") return "pdf"

  return "image"
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export const isValidFileType = (file: File): boolean => {
  const validTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "video/mp4",
    "video/webm",
    "audio/mp3",
    "audio/wav",
    "audio/ogg",
    "application/pdf",
  ]

  return validTypes.includes(file.type)
}

export const generateThumbnail = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    } else if (file.type.startsWith("video/")) {
      const video = document.createElement("video")
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        video.currentTime = 1 // Seek to 1 second
      }

      video.onseeked = () => {
        ctx?.drawImage(video, 0, 0)
        resolve(canvas.toDataURL())
      }

      video.onerror = reject
      video.src = URL.createObjectURL(file)
    } else {
      // Return a default thumbnail for other file types
      resolve("/placeholder.svg?height=200&width=200")
    }
  })
}
