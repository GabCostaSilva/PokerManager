import {auth, createUser, loginUser} from "../../../firebaseConfig";
import {httpClient} from "./client";

export interface UserRegistrationData {
    name: string,
    username: string,
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

    //TODO call another persistence for saving user personal data
    register: async (userRegistrationData: UserRegistrationData) => {
        await httpClient.post("/auth/register", userRegistrationData)
        return "Usuário salvo com sucesso"

    },

    login: async (email: string, password: string) => {
        //@ts-ignore
        await loginUser(email, password)
    },

    logout: async () => {
        return await auth.signOut()
    },

    sendPasswordRecoveryEmail: async (email: string) => {
        // @ts-ignore
        return await auth.sendPasswordResetEmail(email)
    },
};
