import { useMutation } from "@tanstack/react-query"
import { useMyToast } from "../../../components/toasts/useMyToast"
import { useAxios } from "../../../hooks/useAxios"
import { urls } from "../../../utils/urls"
import { NotificationDto } from "../notification/types/NotificationDto"

const useRecommendItemMutation = () => {
  const { showSuccessToast } = useMyToast()

  const axios = useAxios()
  return useMutation(
    ({ userId, itemId }: { userId: string; itemId: string }) =>
      axios
        .post<NotificationDto>(urls.api.recommendItem(itemId, userId))
        .then((res) => res.data),
    {
      onSuccess: (data, payload) => {
        showSuccessToast("Recommended!")
      },
    }
  )
}

export default useRecommendItemMutation
