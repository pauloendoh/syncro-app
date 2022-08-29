import { useMemo } from "react";
import { useTagsQuery } from "./useTagsQuery";

export const useTagIdQueryUtils = (tagId: number | null) => {
  const { data } = useTagsQuery();

  const tag = useMemo(() => data?.find((t) => t.id === tagId), [data]);

  return tag;
};
