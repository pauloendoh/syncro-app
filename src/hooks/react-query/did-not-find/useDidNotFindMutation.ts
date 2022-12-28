import { useMutation } from "@tanstack/react-query"
import { useMyToast } from "../../../components/toasts/useMyToast"
import { urls } from "../../../utils/urls"
import { useAxios } from "../../useAxios"

const useDidNotFindMutation = () => {
  const { showSuccessToast } = useMyToast()

  const axios = useAxios()

  return useMutation(
    (payload: { query: string; type: string }) =>
      axios.post(urls.api.didNotFind, payload).then((res) => res.data),
    {
      onSuccess: (_, payload) => {
        showSuccessToast(
          `Thanks for your feedback! We'll try to add ${payload.type} "${payload.query}" soon!`
        )
      },
    }
  )
}

export default useDidNotFindMutation
