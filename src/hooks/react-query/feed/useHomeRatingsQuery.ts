import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { RatingDto } from "../../../types/domain/rating/RatingDto"

import { urls } from "../../../utils/urls"

export const useHomeRatingsQuery = () => {
  return useQuery<RatingDto[], AxiosError>([urls.api.homeRatings])
}
