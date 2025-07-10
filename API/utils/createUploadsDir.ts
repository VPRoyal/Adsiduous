import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

// Emulate __dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const createUploadDirectory=(folderName: string): string =>{
  const uploadsDir = path.join(__dirname, "..", folderName)

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
    console.log(`Created uploads directory: ${uploadsDir}`)
  }

  return uploadsDir
}
