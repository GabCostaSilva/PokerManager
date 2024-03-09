import {auth, loginUser, recoverPassword} from "../../../firebaseConfig";
import {httpClient} from "./client";

export interface UserRegistrationData {
    name: string,
    userName: string,
    phoneNumber: string,
    email: string,
    docNumber: string,
    pix: string,
    bank: string,
    bankAgency: string,
    bankAccountNumber: string,
    picPay: string,
    password: string,
    uid?: string,
}

const getCookie = async (idToken: string) => {
    return await httpClient.post("/auth/csrf", {idToken})
};

export const AuthController = {

    register: async (userRegistrationData: UserRegistrationData) => {
        await httpClient.post("/auth/register", userRegistrationData)
        return "Usuário salvo com sucesso"

    },

    login: async (email: string, password: string) => {
        console.log("login", email, password)
        const userCredential = await loginUser(email, password);
        const idToken = await userCredential.user?.getIdToken();
        console.log("idToken", idToken)
        try {
            const axiosResponse = await httpClient.post("/auth/sessionLogin", {idToken});
            console.log("axiosResponse", axiosResponse)
        } catch (e) {
            console.error("login error: ", e)
        }
        // await secureStorage.saveSession(axiosResponse.data.sessionCookie);

        return userCredential;
    },

    logout: async () => {
        return await auth.signOut()
    },

    sendPasswordRecoveryEmail: async (email: string) => {
        return await recoverPassword(email)
    },
};
