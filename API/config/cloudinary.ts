import { v2 as cloudinary } from "cloudinary"
import type {
  UploadApiOptions,
  UploadApiResponse,
  TransformationOptions,
} from "cloudinary"


export const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  console.log("Cloudinary configured successfully")
}

export const uploadToCloudinary = async (file:Express.Multer.File, options:Record<string, any> = {}) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: process.env.CLOUDINARY_FOLDER_NAME,
      resource_type: "auto",
      ...options,
    })

    return {
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      resourceType: result.resource_type,
      bytes: result.bytes,
      width: result.width,
      height: result.height,
    }
  } catch (error) {
    console.error("Cloudinary upload error:", error)
    throw new Error("File upload failed")
  }
}

export const deleteFromCloudinary = async (publicId: string, resourceType = "image") => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    })
    return result
  } catch (error) {
    console.error("Cloudinary delete error:", error)
    throw new Error("File deletion failed")
  }
}

export const generateSignedUrl = (publicId: string, options = {}) => {
  return cloudinary.url(publicId, {
    sign_url: true,
    ...options,
  })
}


