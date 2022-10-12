import { useQuery } from "@tanstack/react-query"
import {
  buildImdbItemDto,
  ImdbItemDto,
} from "../../../types/domain/imdb-item/ImdbItemDto"
import myAxios from "../../../utils/myAxios"

import { urls } from "../../../utils/urls"

export const useImdbItemDetailsQuery = (id?: string | null) => {
  return useQuery<ImdbItemDto, Error>(
    [urls.api.imdbItemDetails(id)],
    async () => {
      if (id)
        return myAxios.get(urls.api.imdbItemDetails(id)).then((res) => res.data)

      return buildImdbItemDto()
    }
  )
}
