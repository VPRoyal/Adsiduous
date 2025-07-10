import { apiClient } from "@/utils/apiClient";
import endpoints from "@/constants/endpoints";
import type { SearchParams } from "@/types";

const searchFiles = async (params: SearchParams) => {
  const searchParams = new URLSearchParams();

  if (params.query) searchParams.append("query", params.query);
  if (params.tags?.length) searchParams.append("tags", params.tags.join(","));
  if (params.type) searchParams.append("type", params.type);
  if (params.page) searchParams.append("page", params.page.toString());
  if (params.limit) searchParams.append("limit", params.limit.toString());

  return apiClient({ url: endpoints.SEARCH(searchParams.toString()) });
};

const getSuggestions = async (query: string) => {
  return apiClient({ url: endpoints.SUGGESTIONS(encodeURIComponent(query)) });
};

const getTags = async () => {
  return apiClient({ url: endpoints.GET_TAGS });
};

export default { searchFiles, getSuggestions, getTags };
