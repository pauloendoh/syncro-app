import vars from "../../vars";

const { API_BASE_URL } = vars;

export const urls = {
  api: {
    register: API_BASE_URL + "/auth/register",
    login: API_BASE_URL + "/auth/login",

    me: API_BASE_URL + "/auth/me",

    clothings: API_BASE_URL + "/clothings",
    clothingsId: (id: number) => API_BASE_URL + "/clothings/" + id,
    publicUploads: (fileName: string) =>
      API_BASE_URL + "/public/uploads/" + fileName,
  },
};
