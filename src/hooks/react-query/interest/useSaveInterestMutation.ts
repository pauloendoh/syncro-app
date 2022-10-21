import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { InterestDto } from "../../../types/domain/interest/InterestDto"
import removeFromArray from "../../../utils/array/removeFromArray"
import upsert from "../../../utils/array/upsert"
import myAxios from "../../../utils/myAxios"
import { urls } from "../../../utils/urls"

const useSaveInterestMutation = () => {
  const queryClient = useQueryClient()
  // const { setSuccessMessage, setErrorMessage } = useSnackbarStore()

  return useMutation(
    (payload: InterestDto) =>
      myAxios
        .post<InterestDto | null>(urls.api.myInterests, payload)
        .then((res) => res.data),
    {
      onSuccess: (savedInterest, payload) => {
        if (!savedInterest) {
          if (payload.id) {
            queryClient.setQueryData<InterestDto[]>(
              [urls.api.myInterests],
              (curr) => removeFromArray(curr, (i) => i.id === payload.id)
            )
          }
          // setSuccessMessage("Interest removed!")

          return
        }

        queryClient.setQueryData<InterestDto[]>(
          [urls.api.myInterests],
          (curr) => {
            return upsert(curr, savedInterest, (i) => i.id === savedInterest.id)
          }
        )

        // setSuccessMessage("Idea saved!")
      },
      onError: (err: AxiosError<any>) => {
        alert(err?.response?.data?.message || "Error saving idea")
        // setErrorMessage(err?.response?.data?.message || "Error saving idea")
      },
    }
  )
}

export default useSaveInterestMutation
