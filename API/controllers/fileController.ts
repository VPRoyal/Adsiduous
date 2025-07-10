import { RequestHandler } from "express";
import File from "@/models/File.model.js";
import { deleteFromCloudinary, generateSignedUrl } from "@/config/cloudinary";

/**
 * @desc    Get single file
 * @route   GET /api/files/:id
 * @access  Private
 */
export const getFile: RequestHandler = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id).populate(
      "userId",
      "name email"
    );

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    // Check if user owns the file or file is public
    if (file.userId !== req.user?._id && !file.isPublic) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.status(200).json({
      success: true,
      data: file,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user's files
 * @route   GET /api/files
 * @access  Private
 */
export const getUserFiles: RequestHandler = async (req, res, next) => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1;
    const limit = Number.parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const query: any = { userId: req.user?._id };

    // Add type filter if provided
    if (req.query.type) {
      query.type = req.query.type as string;
    }

    // Add tag filter if provided
    if (req.query.tags) {
      const tags = Array.isArray(req.query.tags)
        ? req.query.tags
        : [req.query.tags];
      query.tags = { $in: tags };
    }

    const files = await File.find(query)
      .sort({ uploadDate: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "name email");

    const total = await File.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        files,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
          hasMore: page * limit < total,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update file view count
 * @route   PUT /api/files/:id/view
 * @access  Public
 */
export const incrementViewCount: RequestHandler = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    await file.incrementViewCount();

    res.status(200).json({
      success: true,
      message: "View count updated",
      data: {
        viewCount: file.viewCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update file
 * @route   PUT /api/files/:id
 * @access  Private
 */
export const updateFile: RequestHandler = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    if (file.userId !== req.user?._id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const { tags, isPublic } = req.body;

    if (tags !== undefined) {
      file.tags = Array.isArray(tags) ? tags : [];
    }

    if (isPublic !== undefined) {
      file.isPublic = Boolean(isPublic);
    }

    await file.save();

    res.status(200).json({
      success: true,
      message: "File updated successfully",
      data: file,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete file
 * @route   DELETE /api/files/:id
 * @access  Private
 */
export const deleteFile: RequestHandler = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    // Check if user owns the file
    if (file.userId !== req.user?._id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // Delete from Cloudinary
    try {
      await deleteFromCloudinary(
        file.cloudinaryPublicId,
        file.metadata?.resourceType
      );
    } catch (error) {
      console.error("Error deleting from Cloudinary:", error);
    }

    // Delete from database
    await File.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
