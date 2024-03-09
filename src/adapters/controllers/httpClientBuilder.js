import axios from 'axios';
import {secureStorage} from "../secureStorage";

export function createHttpClient({
                                     options,
                                     getCurrentAccessToken,
                                     getCurrentRefreshToken,
                                     getCurrentUser,
                                     refreshTokenUrl,
                                     logout,
                                     setRefreshedTokens,
                                 }) {
    const client = axios.create(options)

    //TODO change XMLHttpRequest for Axios
    client.interceptors.request.use(
        async (config) => {
            if (config.authorization !== false) {
                const token = await getCurrentAccessToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                const uri = axios.getUri(config);
                if (uri.includes('login') || uri.includes('refresh-token') || uri.includes('logout') || uri.includes('sessionLogin')) {
                    return config;
                }

                const session = await secureStorage.getSession();
                if (session) {
                    config.headers['X-Session'] = session.sessionCookie;
                }
            }
            return config;
        },
        (error) => {
            console.error('interceptor error', error)
            return Promise.reject(error);
        }
    );

    client.interceptors.response.use((response) => {
        return response;
    }, async (error) => {
        if (error.response?.status === 401) {
            throw new Error('Usuário não autorizado. Autentique-se novamente.')
        }
        throw error
    })
    return client
}