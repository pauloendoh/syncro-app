import { persist } from "zustand/middleware";

import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";

type IHomeFilterStore = {
  filteringByCurrWeather: boolean;
  setFilteringByCurrWeather: (value: boolean) => void;

  minRating: number | null;
  setMinRating: (value: number | null) => void;

  tagId: number | null;
  setTagId: (value: number | null) => void;
};

const useHomeFilterStore = create(
  persist<IHomeFilterStore>(
    (set, get) => ({
      filteringByCurrWeather: false,
      setFilteringByCurrWeather: (value) => {
        set({ filteringByCurrWeather: value });
      },

      minRating: null,
      setMinRating: (minRating) => {
        set({ minRating });
      },

      tagId: null,
      setTagId: (tagId) => {
        set({ tagId });
      },
    }),
    {
      name: "home-filter",
      getStorage: () => AsyncStorage,
    }
  )
);

const initialState = useHomeFilterStore.getState();
export const resetHomeFilterStore = async () => {
  useHomeFilterStore.setState(initialState, true);
};

export default useHomeFilterStore;
