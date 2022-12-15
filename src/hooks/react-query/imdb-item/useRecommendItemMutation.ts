import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMyToast } from "../../../components/toasts/useMyToast"
import { useAxios } from "../../../hooks/useAxios"
import upsert from "../../../utils/array/upsert"
import { urls } from "../../../utils/urls"
import { ItemRecommendationDto } from "../notification/types/ItemRecommendationDto"

const useRecommendItemMutation = () => {
  const { showSuccessToast } = useMyToast()

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
        showSuccessToast("Recommended!")
      },
    }
  )
}

export default useRecommendItemMutation
