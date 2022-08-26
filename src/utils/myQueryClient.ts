import { QueryClient, QueryFunction } from "@tanstack/react-query";
import myAxios from "./myAxios";

const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
  const { data } = await myAxios.get(String(queryKey[0]));
  return data;
};

// provide the default query function to your app with defaultOptions
export const myQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});
