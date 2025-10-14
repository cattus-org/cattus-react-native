import { API_URL } from "@/constants/api";
import { IApiResponse } from "@/interfaces/ApiResponse";
import { ICat } from "@/interfaces/Cats";
import { getToken } from "@/storage/tokenManager";

export const getCats = async () => {
  const token = await getToken();
  const catsResponse = await fetch(`${API_URL}/cats`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token!}` },
  });

  const response: IApiResponse<ICat[]> = await catsResponse.json();
  return response;
};
