import queryString from "query-string"
import envVars from "../../envVars"
import { RationItemType } from "../types/domain/RationItemType"

const { API_URL } = envVars
export const urls = {
  api: {
    register: API_URL + "/auth/register",
    login: API_URL + "/auth/login",

    me: API_URL + "/auth/me",

    search: (q: string, type: RationItemType) =>
      API_URL + "/search?" + queryString.stringify({ q, type }),

    imdbItemDetails: (id?: string | null) => API_URL + `/imdb-item?id=${id}`,
    myRatings: API_URL + `/me/ratings`,

    apiImages: (imageName: string) => API_URL + `/public/images/${imageName}`,
  },
}
