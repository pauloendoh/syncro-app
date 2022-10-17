import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { IImdbResultItem } from "../../../types/domain/movie/MovieResultResponseDto"

import { urls } from "../../../utils/urls"

export const useTvSeriesSearchQuery = (query: string) => {
  return useQuery<IImdbResultItem[], AxiosError>([
    urls.api.search({ q: query, type: "tv series" }),
  ])
}
