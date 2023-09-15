import AsyncStorage from "@react-native-async-storage/async-storage";

export const localStorageAdapter = {
  setAccessToken: async (token) => {
    await AsyncStorage.setItem("accessToken", token);
  },

  removeAccessToken: async () => {
    await AsyncStorage.removeItem("accessToken");
  },

  getAccessToken: async () => {
    return await AsyncStorage.getItem("accessToken");
  }
};