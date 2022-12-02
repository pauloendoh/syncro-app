import { useQuery } from "@tanstack/react-query"
import { SyncroItemDto } from "../../../types/domain/syncro-item/SyncroItemDto"

import { urls } from "../../../utils/urls"

export const useItemsRatedByUserQuery = (userId: string) => {
  return useQuery<SyncroItemDto[], Error>([urls.api.itemsRatedByUserId(userId)])
}
