import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMyToast } from "../../../components/toasts/useMyToast"
import { urls } from "../../../utils/urls"
import { useAxios } from "../../useAxios"

const useUpdateSavedPositionMutation = () => {
  const queryClient = useQueryClient()
  const { showSuccessToast } = useMyToast()

  const axios = useAxios()

  return useMutation(
    (payload: { interestId: string; newPosition: number }) =>
      axios.post(urls.api.updateSavedPosition, payload).then((res) => res.data),
    {
      onSuccess: async (_) => {
        await queryClient.invalidateQueries([urls.api.findSavedItems])

        showSuccessToast("Position changed!")
      },
    }
  )
}

export default useUpdateSavedPositionMutation
