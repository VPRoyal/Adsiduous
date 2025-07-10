import { ERRORS } from "@/constants/errors"

export interface ParsedError {
  message: string
  status: number
  code: string
  timestamp?:string
}

export const extractErrorMessage = (
  err: unknown,
  fallbackKey: keyof typeof ERRORS = "DEFAULT"
): ParsedError => {
  const fallback = ERRORS[fallbackKey]

  let parsed: Partial<ParsedError> = {
    timestamp: new Date().toISOString(),
  }

  // Native Error or string
  if (typeof err === "string") {
    parsed.message = err
  } else if (err instanceof Error) {
    parsed.message = err.message
  } else if (typeof err === "object" && err !== null) {
    const errorObj = err as any

    // Axios-style error
    if ("response" in errorObj && typeof errorObj.response?.data === "object") {
      const res = errorObj.response
      parsed.message = res.data?.message
      parsed.status = res.status
      parsed.code = res.data?.code
    }

    if ("message" in errorObj && typeof errorObj.message === "string") {
      parsed.message = errorObj.message
    }
  }

  // Merge fallback if any fields are missing
  return {
    message: parsed.message ?? fallback.message,
    status: parsed.status ?? fallback.status,
    code: parsed.code ?? fallback.code,
    timestamp: parsed.timestamp!,
  }
}
