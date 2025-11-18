import { API_URL } from "@/constants/api";
import { IApiResponse } from "@/interfaces/api/ApiResponse";
import { ICamera } from "@/interfaces/api/Cameras";
import { getToken } from "@/storage/tokenManager";

export const getCameras = async () => {
  const token = await getToken();
  const cameras = await fetch(`${API_URL}/cameras`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const response: IApiResponse<ICamera[]> = await cameras.json();
  return response;
};
