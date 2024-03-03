import {UserData} from "../../contexts/AuthContext";
import {httpClient} from "../../adapters/controllers/client";

export const userActions = {
    editUserInfo:  async (userData: UserData) => {
        await httpClient.patch("/user", userData)
    },

    getProfile: async() => {
        const axiosResponse = await httpClient.get("/user/profile");
        console.log("getProfile", axiosResponse)
        return axiosResponse
    }
}
