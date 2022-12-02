import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { UserItemDto } from "../../../types/domain/syncro-item/UserItemDto"
import { SyncroItemType } from "../../../types/domain/SyncroItemType"

import { urls } from "../../../utils/urls"
import { useAxios } from "../../useAxios"

export const useUserItemsQuery = (
  userId: string,
  itemType?: SyncroItemType
) => {
  const axios = useAxios()
  return useQuery<UserItemDto[], AxiosError>(
    [urls.api.userItems(userId, itemType)],
    async () => {
      const res = await axios.get<UserItemDto[]>(urls.api.userItems(userId))

      if (itemType === "movie")
        return res.data?.filter((d) => d.type === "movie") || []

      if (itemType === "tv series")
        return res.data?.filter((d) => d.type === "tvSeries") || []

      return res?.data || []
    }
  )
}
