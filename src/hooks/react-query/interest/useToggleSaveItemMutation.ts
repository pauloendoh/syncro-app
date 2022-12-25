import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMyToast } from "../../../components/toasts/useMyToast"
import { InterestDto } from "../../../types/domain/interest/InterestDto"
import removeFromArray from "../../../utils/array/removeFromArray"
import upsert from "../../../utils/array/upsert"
import { urls } from "../../../utils/urls"
import { useAxios } from "../../useAxios"

const useToggleSaveItemMutation = () => {
  const queryClient = useQueryClient()
  const { showSuccessToast } = useMyToast()

  const axios = useAxios()

  return useMutation(
    (itemId: string) =>
      axios
        .post<InterestDto | string>(urls.api.toggleSaveItem(itemId))
        .then((res) => res.data),
    {
      onSuccess: (data, itemId) => {
        queryClient.invalidateQueries([urls.api.findSavedItems])

        if (typeof data === "string") {
          queryClient.setQueryData<InterestDto[]>(
            [urls.api.myInterests],
            (curr) => removeFromArray(curr, (i) => i.syncroItemId === itemId)
          )
          showSuccessToast("Removed from saved!")
          return
        }

        queryClient.setQueryData<InterestDto[]>(
          [urls.api.myInterests],
          (curr) => {
            return upsert(curr, data, (i) => i.id === data.id)
          }
        )

        showSuccessToast("Item saved!")
      },
    }
  )
}

export default useToggleSaveItemMutation
