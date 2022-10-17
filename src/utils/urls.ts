import queryString from "query-string"
import envVars from "../../envVars"
import { SearchParams } from "../types/domain/search/SearchParams"

const { API_URL } = envVars
export const urls = {
  api: {
    register: API_URL + "/auth/register",
    login: API_URL + "/auth/login",

    me: API_URL + "/auth/me",

    search: (params: SearchParams) =>
      API_URL + "/search?" + queryString.stringify(params),

    imdbItemDetails: (id?: string | null) => API_URL + `/imdb-item?id=${id}`,
    myRatings: API_URL + `/me/ratings`,
    userRatings: (userId: string) => API_URL + `/user/${userId}/ratings`,
    itemsRatedByUserId: (userId: string) =>
      API_URL + `/user/${userId}/imdb-items`,

    apiImages: (imageName: string) => API_URL + `/public/images/${imageName}`,
    homeRatings: API_URL + "/feed/home-ratings",
  },
}
