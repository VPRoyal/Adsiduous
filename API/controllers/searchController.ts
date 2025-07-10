import { RequestHandler } from "express";
import File from "@/models/File.model";

// ToDo: SearchFile Function need to be improved

/**
 * @desc    Search files
 * @route   GET /api/search
 * @access  Private
 */
export const searchFiles: RequestHandler = async (req, res, next) => {
  try {
    const {
      query = "",
      tags,
      type,
      sortBy = "uploadDate",
      sortOrder = "desc",
      page = "1",
      limit = "20",
    } = req.query;

    const pageNum = Number.parseInt(page as string);
    const limitNum = Number.parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Build search query
    const searchQuery: any = {
      userId: req.user?._id,
    };

    // Text search
    if ((query as string).trim()) {
      searchQuery.$or = [
        { originalName: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ];
    }

    // Type filter
    if (type) {
      searchQuery.type = type;
    }

    // Tags filter
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : (tags as string).split(",");
      searchQuery.tags = { $in: tagArray };
    }

    // Build sort object
    const sortObj: any = {};
    sortObj[sortBy as string] = sortOrder === "asc" ? 1 : -1;

    // Execute search
    const files = await File.find(searchQuery)
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum)
      .populate("userId", "name email");

    const total = await File.countDocuments(searchQuery);

    res.status(200).json({
      success: true,
      data: {
        files,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
          hasMore: pageNum * limitNum < total,
        },
        query: {
          searchTerm: query,
          tags: tags
            ? Array.isArray(tags)
              ? tags
              : (tags as string).split(",")
            : [],
          type,
          sortBy,
          sortOrder,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get search suggestions
 * @route   GET /api/search/suggestions
 * @access  Private
 */
export const getSearchSuggestions: RequestHandler = async (req, res, next) => {
  try {
    const { query = "" } = req.query;

    if (!(query as string).trim()) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    // Get filename suggestions
    const filenameSuggestions = await File.aggregate([
      {
        $match: {
          userId: req.user?._id,
          originalName: { $regex: query, $options: "i" },
        },
      },
      {
        $group: {
          _id: "$originalName",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          suggestion: "$_id",
          _id: 0,
        },
      },
    ]);

    // Get tag suggestions
    const tagSuggestions = await File.aggregate([
      {
        $match: {
          userId: req.user?._id,
        },
      },
      {
        $unwind: "$tags",
      },
      {
        $match: {
          tags: { $regex: query, $options: "i" },
        },
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          suggestion: "$_id",
          _id: 0,
        },
      },
    ]);

    // Combine and deduplicate suggestions
    const allSuggestions = [
      ...filenameSuggestions.map((s) => s.suggestion),
      ...tagSuggestions.map((s) => s.suggestion),
    ];

    const uniqueSuggestions = [...new Set(allSuggestions)].slice(0, 10);

    res.status(200).json({
      success: true,
      data: uniqueSuggestions,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get popular tags
 * @route   GET /api/search/tags
 * @access  Private
 */
export const getPopularTags: RequestHandler = async (req, res, next) => {
  try {
    const popularTags = await File.aggregate([
      {
        $match: {
          userId: req.user?._id,
        },
      },
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 20,
      },
      {
        $project: {
          tag: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: popularTags,
    });
  } catch (error) {
    next(error);
  }
};
