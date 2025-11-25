import { API_URL } from "@/constants/api";
import { IApiResponse } from "@/interfaces/api/ApiResponse";
import { CatRegistrationDTO } from "@/interfaces/api/CatRegistration";
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

export const createCat = async (payload: Partial<CatRegistrationDTO>) => {
  const token = await getToken();

  // If there is a picture URI, send multipart/form-data
  if (payload.picture) {
    const form = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      if (key === "picture" && typeof value === "string") {
        // attempt to attach file
        // expo image uri: file://... | content://...
        // FormData in RN expects { uri, name, type }
        const uri = value as string;
        const name = uri.split("/").pop() || "photo.jpg";
        const type = name.match(/\.jpg$|\.jpeg$/i)
          ? "image/jpeg"
          : name.match(/\.png$/i)
          ? "image/png"
          : "application/octet-stream";
        // @ts-ignore
        form.append("picture", { uri, name, type });
        return;
      }

      if (Array.isArray(value)) {
        form.append(key, JSON.stringify(value));
        return;
      }

      form.append(key, String(value));
    });

    const res = await fetch(`${API_URL}/cats`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token!}`,
      },
      body: form,
    });

    const json: IApiResponse<ICat> = await res.json();
    return json;
  }

  // otherwise send JSON
  const res = await fetch(`${API_URL}/cats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token!}`,
    },
    body: JSON.stringify(payload),
  });

  const json: IApiResponse<ICat> = await res.json();
  return json;
};
