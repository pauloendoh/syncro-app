import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { ImdbItemDto } from "../../../types/domain/imdb-item/ImdbItemDto"

import { urls } from "../../../utils/urls"

export const useUserItemsQuery = (userId: string) => {
  return useQuery<ImdbItemDto[], AxiosError>([urls.api.userItems(userId)])
}
