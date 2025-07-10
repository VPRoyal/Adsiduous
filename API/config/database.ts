import mongoose from "mongoose"

export const connectDB = async () => {
  const MONGODB_URI=process.env.MONGODB_URI as string;
  try {
    const conn = await mongoose.connect(MONGODB_URI)

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error:any) {
    console.error("MongoDB connection error:", error.message)
    process.exit(1)
  }
}

// Handle connection events
mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected")
})

mongoose.connection.on("error", (err) => {
  console.error("MongoDB error:", err)
})

process.on("SIGINT", async () => {
  await mongoose.connection.close()
  console.log("🔌 MongoDB connection closed through app termination")
  process.exit(0)
})
