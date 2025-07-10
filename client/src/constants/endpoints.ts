const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  GET_ME: "/auth/me",
  SEARCH: (params:string)=> `/search?${params}`,
  SUGGESTIONS: (query:string)=> `/search/suggestions?query=${query}`,
  GET_TAGS: '/search/tags',
  UPLOAD: "/upload"
};

export default API_ENDPOINTS;
