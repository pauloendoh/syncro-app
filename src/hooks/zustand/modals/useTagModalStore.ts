import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import { TagSaveDto } from "../../../types/domain/tag/TagSaveDto";

interface ITagModalStore {
  initialValue: TagSaveDto | null;
  isOpen: boolean;
  openModal: (decision: TagSaveDto) => void;
  closeModal: () => void;
}

const useTagModalStore = create<ITagModalStore>((set, get) => ({
  initialValue: null,
  isOpen: false,
  openModal: (initialValue) => {
    set({ initialValue, isOpen: true });
  },
  closeModal: () => set({ isOpen: false }),
}));
const initialState = useTagModalStore.getState();
export const resetAuthStore = async () => {
  AsyncStorage.removeItem("user");
  useTagModalStore.setState(initialState, true);
};

export default useTagModalStore;
