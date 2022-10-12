import { useQuery } from "@tanstack/react-query"
import { RatingDto } from "../../../types/domain/rating/RatingDto"

import { urls } from "../../../utils/urls"

export const useMyRatingsQuery = () => {
  return useQuery<RatingDto[], Error>([urls.api.myRatings])
}
