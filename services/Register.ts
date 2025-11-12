import { API_URL } from "@/constants/api";
import { IApiResponse } from "@/interfaces/api/ApiResponse";
import { IRegisterResponse, IRegisterUser } from "@/interfaces/api/Register";

export const RegisterUser = async (registerData: IRegisterUser) => {
  const registerUser = await fetch(`${API_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...registerData }),
  });

  const response: IApiResponse<IRegisterResponse> = await registerUser.json();
  return response;
};
