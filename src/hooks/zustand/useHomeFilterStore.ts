import create from "zustand";

interface IHomeFilterStore {
  filteringByCurrWeather: boolean;
  setFilteringByCurrWeather: (value: boolean) => void;

  minRating: number | null;
  setMinRating: (value: number | null) => void;

  tagId: number | null;
  setTagId: (value: number | null) => void;
}

const useHomeFilterStore = create<IHomeFilterStore>((set, get) => ({
  filteringByCurrWeather: false,
  setFilteringByCurrWeather: (value) => {
    set({ filteringByCurrWeather: value });
  },

  minRating: null,
  setMinRating: (minRating) => set({ minRating }),

  tagId: null,
  setTagId: (tagId) => set({ tagId }),
}));

const initialState = useHomeFilterStore.getState();
export const resetHomeFilterStore = async () => {
  useHomeFilterStore.setState(initialState, true);
};

export default useHomeFilterStore;
