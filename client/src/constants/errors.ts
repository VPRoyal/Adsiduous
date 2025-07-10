export interface AppError {
  code: string
  message: string
  status: number
}
export type ErrorKey = keyof typeof ERRORS


// ToDo: Need to improve for more error Handling
export const ERRORS = {
  DEFAULT: {
    code: "GEN_UNKNOWN_ERROR",
    message: "Something went wrong. Please try again.",
    status: 500,
  },

  // AUTH errors
  AUTH_LOGIN_FAILED: {
    code: "AUTH_LOGIN_FAILED",
    message: "Invalid email or password.",
    status: 401,
  },
  AUTH_REGISTER_FAILED: {
    code: "AUTH_REGISTER_FAILED",
    message: "Registration failed. Please try again.",
    status: 400,
  },
  AUTH_UNAUTHORIZED: {
    code: "AUTH_UNAUTHORIZED",
    message: "Access denied. Please log in.",
    status: 401,
  },
  AUTH_TOKEN_INVALID: {
    code: "AUTH_TOKEN_INVALID",
    message: "Your session is invalid or expired.",
    status: 403,
  },

  // UPLOAD errors
  UPLOAD_FILE_TYPE_INVALID: {
    code: "UPLOAD_FILE_TYPE_INVALID",
    message: "Unsupported file format.",
    status: 415,
  },
  UPLOAD_FILE_TOO_LARGE: {
    code: "UPLOAD_FILE_TOO_LARGE",
    message: "File size exceeds the allowed limit.",
    status: 413,
  },
  UPLOAD_FAILED: {
    code: "UPLOAD_FAILED",
    message: "File upload failed. Please try again.",
    status: 500,
  },

  // SEARCH errors
  SEARCH_NO_RESULTS: {
    code: "SEARCH_NO_RESULTS",
    message: "No files matched your search criteria.",
    status: 404,
  },
  SEARCH_QUERY_INVALID: {
    code: "SEARCH_QUERY_INVALID",
    message: "Invalid search query.",
    status: 400,
  },

  // GENERAL errors
  GEN_UNKNOWN_ERROR: {
    code: "GEN_UNKNOWN_ERROR",
    message: "Something went wrong. Please try again later.",
    status: 500,
  },
  GEN_NOT_FOUND: {
    code: "GEN_NOT_FOUND",
    message: "Resource not found.",
    status: 404,
  },
  GEN_VALIDATION_FAILED: {
    code: "GEN_VALIDATION_FAILED",
    message: "Input validation failed.",
    status: 400,
  },
} satisfies Record<string, AppError>
