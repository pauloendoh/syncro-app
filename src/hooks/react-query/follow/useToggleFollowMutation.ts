import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMyToast } from "../../../components/toasts/useMyToast"
import { FollowDto } from "../../../types/domain/follow/FollowDto"
import removeFromArray from "../../../utils/array/removeFromArray"
import upsert from "../../../utils/array/upsert"
import myAxios from "../../../utils/myAxios"
import { urls } from "../../../utils/urls"

const useToggleFollowMutation = () => {
  const queryClient = useQueryClient()
  const { showSuccessToast } = useMyToast()

  return useMutation(
    (followingUserId: string) =>
      myAxios
        .post<FollowDto | "deleted">(urls.api.toggleFollow(followingUserId))
        .then((res) => res.data),
    {
      onSuccess: (data, followingUserId) => {
        if (data === "deleted") {
          if (followingUserId) {
            queryClient.setQueryData<FollowDto[]>(
              [urls.api.myFollowingUsers],
              (curr) =>
                removeFromArray(
                  curr,
                  (i) => i.followingUserId === followingUserId
                )
            )
          }

          showSuccessToast("Unfollowed!")

          return
        }

        queryClient.setQueryData<FollowDto[]>(
          [urls.api.myFollowingUsers],
          (curr) => {
            return upsert(curr, data, (i) => i.id === data.id)
          }
        )

        showSuccessToast("Following!")
      },
    }
  )
}

export default useToggleFollowMutation
