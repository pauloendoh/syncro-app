import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMyToast } from "../../../components/toasts/useMyToast"
import { SyncroItemDto } from "../../../types/domain/syncro-item/SyncroItemDto"
import { urls } from "../../../utils/urls"
import { useAxios } from "../../useAxios"

const useUpdateItemAvgRatingMutation = () => {
  const queryClient = useQueryClient()
  const { showSuccessToast } = useMyToast()

  const axios = useAxios()

  return useMutation(
    (itemId: string) =>
      axios
        .put<SyncroItemDto>(urls.api.updateItemAvgRating(itemId))
        .then((res) => res.data),
    {
      onSuccess: (updatedItem) => {
        queryClient.setQueryData<SyncroItemDto>(
          [urls.api.syncroItemDetails(updatedItem.id)],
          updatedItem
        )
        showSuccessToast("Average rating updated!")
      },
    }
  )
}

export default useUpdateItemAvgRatingMutation
