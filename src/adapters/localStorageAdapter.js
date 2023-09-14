import AsyncStorage from "@react-native-async-storage/async-storage";

export const localStorageAdapter = {
  setAccessToken: async (token) => {
    await AsyncStorage.setItem("accessToken", token);
  },

  getAccessToken: async () => {
    return await AsyncStorage.getItem("accessToken");
  }
};