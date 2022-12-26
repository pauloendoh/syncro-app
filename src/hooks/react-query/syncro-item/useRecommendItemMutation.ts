import { useMutation, useQueryClient } from "@tanstack/react-query"
import upsert from "../../../utils/array/upsert"
import { urls } from "../../../utils/urls"
import { useAxios } from "../../useAxios"
import { ItemRecommendationDto } from "../notification/types/ItemRecommendationDto"

const useRecommendItemMutation = () => {
  const axios = useAxios()
  const qc = useQueryClient()
  return useMutation(
    ({ userId, itemId }: { userId: string; itemId: string }) =>
      axios
        .post<ItemRecommendationDto>(urls.api.recommendItem(itemId, userId))
        .then((res) => res.data),
    {
      onSuccess: (returnedRecommendation, payload) => {
        qc.setQueryData<ItemRecommendationDto[]>(
          [urls.api.recommendationsFromMe],
          (curr) => {
            return upsert(
              curr,
              returnedRecommendation,
              (r) => r.itemId === returnedRecommendation.id
            )
          }
        )
      },
    }
  )
}

export default useRecommendItemMutation
