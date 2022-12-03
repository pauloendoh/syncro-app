import { useQuery } from "@tanstack/react-query"
import {
  buildSyncroItemDto,
  SyncroItemDto,
} from "../../../types/domain/syncro-item/SyncroItemDto"
import myAxios from "../../../utils/myAxios"

import { urls } from "../../../utils/urls"

export const useImdbItemDetailsQuery = (id?: string | null) => {
  return useQuery<SyncroItemDto, Error>(
    [urls.api.syncroItemDetails(id)],
    async () => {
      if (id)
        return myAxios
          .get(urls.api.syncroItemDetails(id))
          .then((res) => res.data)

      return buildSyncroItemDto()
    }
  )
}
