import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CurrentWeatherDto } from "../../types/weather/CurrentWeatherDto";
import myAxios from "../../utils/myAxios";
import { urls } from "../../utils/urls";
import { useLocationQuery } from "./useLocationQuery";

export const useCurrentWeatherQuery = (): UseQueryResult<
  CurrentWeatherDto | null,
  unknown
> => {
  const { data: location } = useLocationQuery();

  const url = urls.api.weather(
    Number(location?.coords?.latitude),
    Number(location?.coords?.longitude)
  );

  return useQuery([url], () => {
    if (!location) return null;

    return myAxios.get<CurrentWeatherDto>(url).then((res) => res.data);
  });
};
