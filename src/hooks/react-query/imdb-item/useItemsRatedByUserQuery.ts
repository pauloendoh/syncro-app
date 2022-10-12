import { useQuery } from "@tanstack/react-query"
import { ImdbItemDto } from "../../../types/domain/imdb-item/ImdbItemDto"

import { urls } from "../../../utils/urls"

export const useItemsRatedByUserQuery = (userId: string) => {
  return useQuery<ImdbItemDto[], Error>([urls.api.itemsRatedByUserId(userId)])
}
