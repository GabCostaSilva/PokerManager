import {auth, createUser, loginUser} from "../../../firebaseConfig";
import {createUserWithEmailAndPassword} from "firebase/auth";

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
    password: string
}

export const AuthController = {

    //TODO call another persistence for saving user personal data
    register: async (userRegistrationData: UserRegistrationData) => {
        const {email, password} = userRegistrationData;
        try {
            return await createUser(email, password)
        } catch (e) {
            console.error(e.message)
            return e.message
        }
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

    resetPassword: async (oobCode: string, newPassword: string) => {
        // @ts-ignore
        return await auth.confirmPasswordReset(oobCode, newPassword)
    },
};
