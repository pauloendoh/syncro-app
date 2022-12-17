import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useMyToast } from "../../../components/toasts/useMyToast"
import { RatingDto } from "../../../types/domain/rating/RatingDto"
import removeFromArray from "../../../utils/array/removeFromArray"
import upsert from "../../../utils/array/upsert"
import myAxios from "../../../utils/myAxios"
import { urls } from "../../../utils/urls"

const useSaveRatingMutation = () => {
  const queryClient = useQueryClient()
  const { showSuccessToast, showErrorToast } = useMyToast()
  // const { setSuccessMessage, setErrorMessage } = useSnackbarStore()

  return useMutation(
    (payload: RatingDto) =>
      myAxios
        .post<RatingDto | null>(urls.api.myRatings, payload)
        .then((res) => res.data),
    {
      onSuccess: (savedRating, payload) => {
        if (!savedRating) {
          if (payload.id) {
            queryClient.setQueryData<RatingDto[]>(
              [urls.api.myRatings],
              (curr) => removeFromArray(curr, (i) => i.id === payload.id)
            )
          }

          showSuccessToast("Rating removed!")

          return
        }

        queryClient.setQueryData<RatingDto[]>([urls.api.myRatings], (curr) => {
          return upsert(curr, savedRating, (i) => i.id === savedRating.id)
        })

        showSuccessToast("Rating saved!", { duration: 10000000 })
      },
      onError: (err: AxiosError<any>) => {
        alert(err?.response?.data?.message || "Error saving idea")
        // setErrorMessage(err?.response?.data?.message || "Error saving idea")
      },
    }
  )
}

export default useSaveRatingMutation
