import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { IImdbResultItem } from "../../../types/domain/movie/MovieResultResponseDto"
import { SyncroItemType } from "../../../types/domain/SyncroItemType"

import { urls } from "../../../utils/urls"

export const useImdbSearchQuery = (query: string, type: SyncroItemType) => {
  return useQuery<IImdbResultItem[], AxiosError>([
    urls.api.search({ q: query, type }),
  ])
}
