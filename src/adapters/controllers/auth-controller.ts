import {auth} from "../../../firebaseConfig";
import {client} from "./client";

interface UserRegistrationData {
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
}

export const AuthController = {
    login: async (email: string, password: string) => {
        //@ts-ignore
        await auth.signInWithEmailAndPassword(email, password);
    },

    logout: async () => {
        return await auth.signOut()
    },

    register: async (user: UserRegistrationData) => {

        // old way
        await client.post('/auth/register', {
            ...user
        })

        // @ts-ignore
        return await auth.createUserWithEmailAndPassword(email, password)
    },

    sendPasswordRecoveryEmail: async (email: string) => {
        // @ts-ignore
        return await auth.sendPasswordResetEmail(email)
    },

    resetPassword: async (oobCode: string, newPassword: string) => {
        // @ts-ignore
        return await auth.confirmPasswordReset(oobCode, newPassword)
    },
};
