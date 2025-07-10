import express from "express"
import helmet from "helmet"
import compression from "compression"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import swaggerUi from "swagger-ui-express"



import configRoutes from "@/routes"

import { connectDB } from "@/config/database"
import { cloudinaryConfig } from "@/config/cloudinary"
import {limiter} from "@/config/rateLimiter"
import {swaggerSpec} from "@/config/swagger"

import notFound from "@/middleware/notFound.middleware"
import errorHandler from "./middleware/errorHandler"
import { healthCheck } from "@/utils/healthCheck"

dotenv.config()

const app = express()
connectDB()
cloudinaryConfig()
app.set("trust proxy", 1)

app.use(helmet())
app.use(compression())
app.use(morgan("combined"))
app.use(limiter)

// ToDo: Need to setup properly
app.use(cors({
  // origin: process.env.FRONTEND_URL || "http://localhost:5173",
  origin:true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

// ToDo: Need to check - 
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(cookieParser())

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.get("/health", healthCheck)

configRoutes(app)
app.use(notFound)
app.use(errorHandler)

export default app
