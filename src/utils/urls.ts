import queryString from "query-string"
import envVars from "../../envVars"
import { SearchParams } from "../types/domain/search/SearchParams"
import { SyncroItemType } from "../types/domain/SyncroItemType"

const { API_URL } = envVars
export const urls = {
  api: {
    register: API_URL + "/auth/register",
    login: API_URL + "/auth/login",
    tempUser: API_URL + "/auth/temp-user",

    me: API_URL + "/auth/me",

    search: (params: SearchParams) =>
      API_URL + "/search?" + queryString.stringify(params),

    imdbItemDetails: (id?: string | null) => API_URL + `/imdb-item?id=${id}`,
    myRatings: API_URL + `/me/ratings`,
    myInterests: API_URL + `/me/interests`,

    userRatings: (userId: string) => API_URL + `/user/${userId}/ratings`,
    userInterests: (userId: string) => API_URL + `/user/${userId}/interests`,
    itemsRatedByUserId: (userId: string) =>
      API_URL + `/user/${userId}/imdb-items`,

    apiImages: (imageName: string) => API_URL + `/public/images/${imageName}`,
    homeRatings: API_URL + "/feed/home-ratings",
    homeInterests: API_URL + "/feed/home-interests",

    userInfo: (userId: string) => API_URL + `/user/${userId}`,
    userItems: (userId: string, itemType?: SyncroItemType) =>
      API_URL + `/user/${userId}/items?itemType=${itemType}`,
    mySimilarUsers: API_URL + `/me/similar-users`,
    myFollowingUsers: API_URL + `/me/following-users`,
    userFollowers: (userId: string) => API_URL + `/user/${userId}/followers`,
    userFollowingUsers: (userId: string) =>
      API_URL + `/user/${userId}/following-users`,
    toggleFollow: (userId: string) => API_URL + `/user/${userId}/toggle-follow`,

    profilePicture: API_URL + "/profiles/picture",
    myProfile: API_URL + "/me/profile",

    customPositionsByItemType: (itemType: SyncroItemType) =>
      API_URL + `/custom-positions?itemType=${itemType}`,
    customPosition: API_URL + `/custom-positions`,
    mostFollowedUsers: API_URL + `/follow/most-followed-users`,
    notifications: API_URL + `/notifications`,
    hideNotificationDots: API_URL + `/notifications/hide-dots`,

    mutualsSavedItem: (itemId: string) =>
      API_URL + `/me/mutuals/saved-item?itemId=${itemId}`,

    recommendItem: (itemId: string, userId: string) =>
      API_URL + `/recommend-item?itemId=${itemId}&userId=${userId}`,
  },

  others: {
    imdbItem: (id: string) => `https://www.imdb.com${id}`,
  },
}
