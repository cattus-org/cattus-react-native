import { API_URL } from "@/constants/api";
import { IApiResponse } from "@/interfaces/ApiResponse";
import { IAuth } from "@/interfaces/Login";

export const Authenticate = async (
  email: string,
  password: string
): Promise<IApiResponse<IAuth>> => {
  const login = await fetch(`${API_URL}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const response: IApiResponse<IAuth> = await login.json();
  return response;
};
