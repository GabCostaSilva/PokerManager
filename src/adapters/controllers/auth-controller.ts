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

export const AuthController = {

    register: async (userRegistrationData: UserRegistrationData) => {
        await httpClient.post("/auth/register", userRegistrationData)
        return "Usuário salvo com sucesso"

    },

    login: async (email: string, password: string) => {
        await loginUser(email, password)
    },

    logout: async () => {
        return await auth.signOut()
    },

    sendPasswordRecoveryEmail: async (email: string) => {
        return await recoverPassword(email)
    },
};
