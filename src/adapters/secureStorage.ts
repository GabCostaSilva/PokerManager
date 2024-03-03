import * as SecureStore from 'expo-secure-store';

export type Session = {
    sessionCookie: string,
    options: {
        maxAge: number,
        httpOnly: boolean,
        secure: boolean
    }
}

const _verifySessionExpiration = (session: Session) => {
    console.log("session", session)
    const {options} = session;
    const {maxAge} = options;
    const expirationDate = new Date(maxAge);
    const now = new Date();
    return now < expirationDate;

}
export const secureStorage = {
    saveSession: async (session: Session) => {
        await SecureStore.setItemAsync("session", JSON.stringify(session));
    },

    getSession: async () => {
        const s = await SecureStore.getItemAsync("session");
        if (!s) throw new Error("session-not-found");
        const session: Session = JSON.parse(s);
        if (!_verifySessionExpiration(session))
            return session;
        else
            throw new Error("session-cookie-expired");
    },
}
