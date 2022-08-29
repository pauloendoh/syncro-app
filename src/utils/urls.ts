import envVars from "../../envVars";

const { API_BASE_URL } = envVars;

export const urls = {
  api: {
    register: API_BASE_URL + "/auth/register",
    login: API_BASE_URL + "/auth/login",

    me: API_BASE_URL + "/auth/me",

    clothings: API_BASE_URL + "/clothings",
    tags: API_BASE_URL + "/tags",
    clothingsId: (id: number) => API_BASE_URL + "/clothings/" + id,
    publicUploads: (fileName: string) =>
      API_BASE_URL + "/public/uploads/" + fileName,

    weather: (lat: number, lon: number) =>
      `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}`,
  },
};
