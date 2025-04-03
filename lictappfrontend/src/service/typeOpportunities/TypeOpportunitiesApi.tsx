import api from "../../lib/http/Axios";

export const typeOpportunitiesGetApi = async (url: any) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw error;
  }
};
