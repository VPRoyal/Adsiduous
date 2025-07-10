// constants/actionTypes.ts

export const AuthActions = {
  LOGIN: "auth/login",
  REGISTER: "auth/register",
  GET_CURRENT_USER: "auth/getCurrentUser",
} as const;

export type AuthAction = (typeof AuthActions)[keyof typeof AuthActions];

export const SearchActions = {
  SEARCH: "search/searchFiles",
  SUGGESTIONS: "search/getSuggestions",
  TAGS: "search/getTags"
} as const;

export type SearchAction = (typeof SearchActions)[keyof typeof SearchActions];

export const UploadActions = {
  UPLOAD: "upload/uploadFile"
} as const;

export type UploadAction = (typeof UploadActions)[keyof typeof UploadActions];

