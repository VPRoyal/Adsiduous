import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import User from "@/models/User.model";
import File from "@/models/File.model";

dotenv.config();

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || "";
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Connected for seeding");
  } catch (error: any) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await File.deleteMany({});
    await User.deleteMany({});
    console.log("Cleared existing data");

    // Create sample users
    const users = [
      {
        name: "John Doe",
        email: "john@example.com",
        password: "Password123",
        role: "user",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "Password123",
        role: "user",
      },
      {
        name: "Admin User",
        email: "admin@example.com",
        password: "Password123",
        role: "admin",
      },
    ];

    const createdUsers = await User.create(users);
    console.log("Created sample users");

    // Create sample files
    const sampleFiles = [
      {
        filename: "sample-image-1.jpg",
        originalName: "vacation-photo.jpg",
        url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        thumbnailUrl: "https://res.cloudinary.com/demo/image/upload/c_thumb,w_200,g_face/sample.jpg",
        mimeType: "image/jpeg",
        size: 1024000,
        type: "image",
        tags: ["vacation", "travel", "photo"],
        userId: createdUsers[0]._id,
        cloudinaryPublicId: "sample",
        metadata: {
          width: 1920,
          height: 1080,
          format: "jpg",
          resourceType: "image",
        },
        viewCount: 15,
      },
      {
        filename: "sample-document-1.pdf",
        originalName: "project-report.pdf",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        mimeType: "application/pdf",
        size: 2048000,
        type: "pdf",
        tags: ["work", "report", "project"],
        userId: createdUsers[0]._id,
        cloudinaryPublicId: "sample-pdf",
        metadata: {
          format: "pdf",
          resourceType: "raw",
        },
        viewCount: 8,
      },
      {
        filename: "sample-video-1.mp4",
        originalName: "presentation-demo.mp4",
        url: "https://res.cloudinary.com/demo/video/upload/dog.mp4",
        thumbnailUrl: "https://res.cloudinary.com/demo/video/upload/so_0/dog.jpg",
        mimeType: "video/mp4",
        size: 5120000,
        type: "video",
        tags: ["presentation", "demo", "work"],
        userId: createdUsers[1]._id,
        cloudinaryPublicId: "sample-video",
        metadata: {
          width: 1280,
          height: 720,
          duration: 120,
          format: "mp4",
          resourceType: "video",
        },
        viewCount: 23,
      },
    ];

    await File.create(sampleFiles);
    console.log("Created sample files");

    console.log("Database seeded successfully!");
    console.log("\n Sample Users:");
    console.log("- john@example.com (Password123)");
    console.log("- jane@example.com (Password123)");
    console.log("- admin@example.com (Password123)");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
};

const run = async () => {
  await connectDB();
  await seedData();
};

run();
