import { RequestHandler } from "express";
import { promises as fs } from "fs";
import File from "@/models/File.model";
import { uploadToCloudinary } from "@/config/cloudinary";

/**
 * @desc    Upload file
 * @route   POST /api/upload
 * @access  Private
 */
export const uploadFile: RequestHandler = async (
  req, res, next
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const { tags } = req.body;
    let parsedTags = [];

    if (tags) {
      try {
        parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
        if (!Array.isArray(parsedTags)) {
          parsedTags = [];
        }
      } catch (error) {
        parsedTags = [];
      }
    }

    // Upload to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(req.file, {
      folder: process.env.CLOUDINARY_FOLDER_NAME,
      resource_type: "auto",
    });

    // Determine file type
    const fileType = File.getFileType(req.file.mimetype);

    // Create file record in database
    const file = await File.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      url: cloudinaryResult.url,
      thumbnailUrl: fileType === "image" ? cloudinaryResult.url : null,
      mimeType: req.file.mimetype,
      size: req.file.size,
      type: fileType,
      tags: parsedTags,
      userId: req.user?._id,
      cloudinaryPublicId: cloudinaryResult.publicId,
      metadata: {
        width: cloudinaryResult.width,
        height: cloudinaryResult.height,
        format: cloudinaryResult.format,
        resourceType: cloudinaryResult.resourceType,
      },
    });

    // Clean up local file
    try {
      await fs.unlink(req.file.path);
    } catch (error) {
      console.error("Error deleting local file:", error);
    }

    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      data: file,
    });
  } catch (error) {
    // Clean up local file on error
    if (req.file && req.file.path) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error("Error deleting local file on error:", unlinkError);
      }
    }
    next(error);
  }
};

/**
 * @desc    Upload multiple files
 * @route   POST /api/upload/multiple
 * @access  Private
 */
export const uploadMultipleFiles: RequestHandler = async (
  req, res, next
) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const { tags } = req.body;
    let parsedTags = [];

    if (tags) {
      try {
        parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
        if (!Array.isArray(parsedTags)) {
          parsedTags = [];
        }
      } catch (error) {
        parsedTags = [];
      }
    }
    const files = req.files as Express.Multer.File[];
    const uploadPromises = files.map(async (file) => {
      try {
        // Upload to Cloudinary
        const cloudinaryResult = await uploadToCloudinary(file, {
          folder: process.env.CLOUDINARY_FOLDER_NAME,
          resource_type: "auto",
        });

        // Determine file type
        const fileType = File.getFileType(file.mimetype);

        // Create file record
        const fileRecord = await File.create({
          filename: file.filename,
          originalName: file.originalname,
          url: cloudinaryResult.url,
          thumbnailUrl: fileType === "image" ? cloudinaryResult.url : null,
          mimeType: file.mimetype,
          size: file.size,
          type: fileType,
          tags: parsedTags,
          userId: req.user?._id,
          cloudinaryPublicId: cloudinaryResult.publicId,
          metadata: {
            width: cloudinaryResult.width,
            height: cloudinaryResult.height,
            format: cloudinaryResult.format,
            resourceType: cloudinaryResult.resourceType,
          },
        });

        // Clean up local file
        try {
          await fs.unlink(file.path);
        } catch (error) {
          console.error("Error deleting local file:", error);
        }

        return fileRecord;
      } catch (error) {
        // Clean up local file on error
        try {
          await fs.unlink(file.path);
        } catch (unlinkError) {
          console.error("Error deleting local file on error:", unlinkError);
        }
        throw error;
      }
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    res.status(201).json({
      success: true,
      message: `${uploadedFiles.length} files uploaded successfully`,
      data: uploadedFiles,
    });
  } catch (error) {
    // Clean up any remaining local files
    const files = req.files as Express.Multer.File[];
    if (files) {
      files.forEach(async (file) => {
        try {
          await fs.unlink(file.path);
        } catch (unlinkError) {
          console.error("Error deleting local file on error:", unlinkError);
        }
      });
    }
    next(error);
  }
};
