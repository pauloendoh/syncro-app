import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import { AuthUserGetDto } from "../../types/domain/auth/AuthUserGetDto";

interface IAuthStore {
  authUser: AuthUserGetDto | null;
  setAuthUser: (authUser: AuthUserGetDto) => void;
}

const useAuthStore = create<IAuthStore>((set, get) => ({
  authUser: null,
  setAuthUser: async (authUser) => {
    const expiresAt = new Date(authUser.expiresAt);
    await AsyncStorage.setItem("user", JSON.stringify(authUser));

    // Refresh logout timeout
    setTimeout(() => {
      return resetAuthStore();
    }, expiresAt.getTime() - new Date().getTime());

    set({ authUser });
  },
}));
const initialState = useAuthStore.getState();
export const resetAuthStore = async () => {
  AsyncStorage.removeItem("user");
  useAuthStore.setState(initialState, true);
};

export default useAuthStore;
