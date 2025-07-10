import {Schema, model} from "mongoose"
import { IFile, IFileMethods, IFileModel } from "@/types/fileType"



/**
 * @swagger
 * components:
 *   schemas:
 *     File:
 *       type: object
 *       required:
 *         - filename
 *         - originalName
 *         - url
 *         - mimeType
 *         - size
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the file
 *         filename:
 *           type: string
 *           description: The stored filename
 *         originalName:
 *           type: string
 *           description: The original filename
 *         url:
 *           type: string
 *           description: The file URL
 *         thumbnailUrl:
 *           type: string
 *           description: The thumbnail URL for images/videos
 *         mimeType:
 *           type: string
 *           description: The file MIME type
 *         size:
 *           type: number
 *           description: File size in bytes
 *         type:
 *           type: string
 *           enum: [image, video, audio, pdf, document]
 *           description: File type category
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: File tags for organization
 *         viewCount:
 *           type: number
 *           description: Number of times file was viewed
 *         userId:
 *           type: string
 *           description: ID of the user who uploaded the file
 *         cloudinaryPublicId:
 *           type: string
 *           description: Cloudinary public ID
 *         metadata:
 *           type: object
 *           description: Additional file metadata
 *         uploadDate:
 *           type: string
 *           format: date-time
 *           description: File upload timestamp
 */

const fileSchema = new Schema<IFile,IFileModel, IFileMethods>(
  {
    filename: {
      type: String,
      required: [true, "Filename is required"],
      trim: true,
    },
    originalName: {
      type: String,
      required: [true, "Original filename is required"],
      trim: true,
    },
    url: {
      type: String,
      required: [true, "File URL is required"],
    },
    thumbnailUrl: {
      type: String,
      default: null,
    },
    mimeType: {
      type: String,
      required: [true, "MIME type is required"],
    },
    size: {
      type: Number,
      required: [true, "File size is required"],
      min: [0, "File size cannot be negative"],
    },
    type: {
      type: String,
      required: true,
      enum: ["image", "video", "audio", "pdf", "document"],
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    cloudinaryPublicId: {
      type: String,
      required: true,
    },
    metadata: {
      width: Number,
      height: Number,
      duration: Number, // for videos/audio
      format: String,
      resourceType: String,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
fileSchema.index({ userId: 1, uploadDate: -1 })
fileSchema.index({ type: 1 })
fileSchema.index({ tags: 1 })
fileSchema.index({ originalName: "text", tags: "text" })

// Static method to get file type from MIME type
fileSchema.static('getFileType', function(mimeType:string){
  if (mimeType.startsWith("image/")) return "image"
  if (mimeType.startsWith("video/")) return "video"
  if (mimeType.startsWith("audio/")) return "audio"
  if (mimeType === "application/pdf") return "pdf"
  return "document"
})

// Method to increment view count
fileSchema.method('incrementViewCount', async function () {
  this.viewCount += 1
  return await this.save()
})

// Transform output
fileSchema.method('toJSON', function () {
  const obj = this.toObject()
  const {__v, ...output}= obj;
  return output;
})

export default model<IFile, IFileModel>("File", fileSchema);
