import { API_URL } from "@/constants/api";
import { IApiResponse } from "@/interfaces/api/ApiResponse";
import { ICat } from "@/interfaces/api/Cats";
import { getToken } from "@/storage/tokenManager";

export const getCats = async () => {
  const token = await getToken();
  const catsResponse = await fetch(`${API_URL}/cats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token!}`,
    },
  });

  const response: IApiResponse<ICat[]> = await catsResponse.json();
  return response;
};

export const getCatById = async (id: number) => {
  const token = await getToken();
  const catResponse = await fetch(`${API_URL}/cats/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token!}`,
    },
  });

  const response: IApiResponse<ICat> = await catResponse.json();
  return response;
};

export const updateFavorite = async (id: number) => {
  const token = await getToken();
  const catResponse = await fetch(`${API_URL}/cats/${id}/change-favorite`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const response: IApiResponse<ICat> = await catResponse.json();

  return response;
};
