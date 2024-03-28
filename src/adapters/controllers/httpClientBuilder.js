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
                    console.log('token', token)
                    config.headers.Authorization = `Bearer ${token}`;
                }

                const uri = axios.getUri(config);
                if (uri.includes('login') || uri.includes('refresh-token') || uri.includes('logout') || uri.includes('sessionLogin')) {
                    return config;
                }
            }
            return config;
        },
        (error) => {
            console.error('interceptor request error', error.response.data.message)

            return Promise.reject(error);
        }
    );

    client.interceptors.response.use((response) => {
        return response;
    }, async (error) => {
        console.error('interceptor response error', error.response.data.message)
        if (error.response?.status === 401) {
            throw new Error('Usuário não autorizado. Autentique-se novamente.')
        }
        throw error
    })
    return client
}