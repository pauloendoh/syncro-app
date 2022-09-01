import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "native-base";
import { TagSaveDto } from "../../../types/domain/tag/TagSaveDto";
import { pushOrRemove } from "../../../utils/array/pushOrRemove";
import myAxios from "../../../utils/myAxios";
import { urls } from "../../../utils/urls";

const useDeleteTagMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(
    (payload: TagSaveDto) =>
      myAxios.delete(urls.api.tagsId(payload.id!)).then((res) => res.data),
    {
      onSuccess: (resData, payload) => {
        toast.show({
          description: "Tag deleted!",
        });

        queryClient.setQueryData<TagSaveDto[]>([urls.api.tags], (currTags) => {
          if (!currTags) return [];

          return pushOrRemove(currTags, payload, "id");
        });
      },
      onError: (err: Error) => {
        toast.show({
          description: err.message,
        });
      },
    }
  );
};

export default useDeleteTagMutation;
