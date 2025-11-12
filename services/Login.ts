import { API_URL } from "@/constants/api";
import { IApiResponse } from "@/interfaces/api/ApiResponse";
import { IAuth } from "@/interfaces/api/Login";
import { IUser } from "@/interfaces/api/Users";
import { getToken } from "@/storage/tokenManager";

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

export const VerifyToken = async () => {
  const token = await getToken();
  const tokenValidation = await fetch(`${API_URL}/auth`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token!}`,
    },
  });

  const response: IApiResponse<IUser> = await tokenValidation.json();
  return response;
};
