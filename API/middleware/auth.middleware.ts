import { RequestHandler } from "express"
import jwt from "jsonwebtoken"
import User from "@/models/User.model"
import { JwtPayload } from "@/types";
const {verify} =jwt



export const auth: RequestHandler = async (req, res, next) => {
  try {
    let token;
    const {authorization}= req.headers;
    // Check for token in Authorization header
    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1]
    }
    // Check for token in cookies
    else if (req.cookies.token) {
      token = req.cookies.token
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      })
    }

    try {
      const decoded = verify(token, process.env.JWT_SECRET as string) as JwtPayload
      const user = await User.findById(decoded.id).select("-password")

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Token is valid but user not found.",
        })
      }

      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: "User account is deactivated.",
        })
      }

      req.user = user
      next()
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      })
    }
  } catch (error) {
    console.error("Auth middleware error:", error)
    res.status(500).json({
      success: false,
      message: "Server error in authentication.",
    })
  }
}

// export const optionalAuth: RequestHandler = async (req, res, next) => {
//   try {
//     let token

//     if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//       token = req.headers.authorization.split(" ")[1]
//     } else if (req.cookies.token) {
//       token = req.cookies.token
//     }

//     if (token) {
//       try {
//         const decoded = verify(token, process.env.JWT_SECRET as string) as JwtPayload
//         const user = await User.findById(decoded.id).select("-password")
//         if (user && user.isActive) {
//           req.user = user
//         }
//       } catch (error) {
//         // Token invalid, but continue without user
//       }
//     }

//     next()
//   } catch (error) {
//     next()
//   }
// }