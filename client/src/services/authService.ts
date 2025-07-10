import { apiClient } from "@/utils/apiClient";
import endpoints from "@/constants/endpoints";
import type { LoginRequest, RegisterRequest } from "@/types";

const login = async (credentials: LoginRequest) => {
  return apiClient({
    url: endpoints.LOGIN,
    method: "POST",
    data: JSON.stringify(credentials),
  });
};

const register = async (userData: RegisterRequest) => {
  return apiClient({
    url: endpoints.REGISTER,
    method: "POST",
    data: JSON.stringify(userData),
  });
};

const getMe = async () => {
  return apiClient({ url: endpoints.GET_ME });
};

export default { login, register, getMe };
