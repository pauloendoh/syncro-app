import envVars from "../../envVars";

const { API_URL } = envVars;
export const urls = {
  api: {
    register: API_URL + "/auth/register",
    login: API_URL + "/auth/login",

    me: API_URL + "/auth/me",

    clothings: API_URL + "/clothings",
    tags: API_URL + "/tags",
    tagsId: (id: number) => API_URL + "/tags/" + id,

    clothingsId: (id: number) => API_URL + "/clothings/" + id,
    publicUploads: (fileName: string) =>
      API_URL + "/public/uploads/" + fileName,

    weather: (lat: number, lon: number) =>
      `${API_URL}/weather?lat=${lat}&lon=${lon}`,
  },
};
