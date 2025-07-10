import { Application } from "express"
import authRoutes from "./auth.route"
import uploadRoutes from "./upload.route"
import searchRoutes from "./search.route"
import fileRoutes from "./files.route"

const configRoutes=(app: Application):void => {
  app.use("/auth", authRoutes)
  app.use("/upload", uploadRoutes)
  app.use("/search", searchRoutes)
  app.use("/files", fileRoutes)
}

export default configRoutes;
