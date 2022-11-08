import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMyToast } from "../../../components/toasts/useMyToast"
import { ProfileDto } from "../../../types/domain/profile/ProfileDto"
import { ProfilePutDto } from "../../../types/domain/profile/ProfilePutDto"
import { urls } from "../../../utils/urls"
import { useAxios } from "../../useAxios"
import useAuthStore from "../../zustand/useAuthStore"

const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient()
  const { showSuccessToast } = useMyToast()

  const axios = useAxios()

  const [authUser, setAuthUser] = useAuthStore((s) => [
    s.authUser,
    s.setAuthUser,
  ])

  return useMutation(
    (dto: ProfilePutDto) =>
      axios.put<ProfileDto>(urls.api.myProfile, dto).then((res) => res.data),
    {
      onSuccess: async (updatedProfile, payload) => {
        setAuthUser({ ...authUser!, username: payload.username })

        showSuccessToast("Profile saved!")
      },
    }
  )
}

export default useUpdateProfileMutation
