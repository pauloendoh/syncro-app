import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { UserItemDto } from "../../../types/domain/imdb-item/UserItemDto"

import { urls } from "../../../utils/urls"

export const useUserItemsQuery = (userId: string) => {
  return useQuery<UserItemDto[], AxiosError>([urls.api.userItems(userId)])
}
