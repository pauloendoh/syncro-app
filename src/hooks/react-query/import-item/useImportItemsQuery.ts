import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { RatingImportItemDto } from "../../../types/domain/rating-import-request/RatingImportItemDto"

import { urls } from "../../../utils/urls"

export const useImportItemsQuery = (importRequestId: string) => {
  return useQuery<RatingImportItemDto[], AxiosError>(
    [urls.api.importItemsByRequestId(importRequestId)],
    {
      enabled: importRequestId.length > 0,
    }
  )
}