import { useQuery } from "@tanstack/react-query";
import {
  getCurrentPositionAsync,
  LocationObject,
  requestForegroundPermissionsAsync as requestLocationAsync,
} from "expo-location";

export const useLocationQuery = () => {
  return useQuery(
    ["location"],

    async (): Promise<LocationObject | null> => {
      let { status } = await requestLocationAsync();
      if (status !== "granted") {
        return null;
      }

      const location = await getCurrentPositionAsync();
      return location;
    },
    {
      staleTime: 1000 * 30,
    }
  );
};
