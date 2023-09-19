import axios from 'axios';

export function createAxiosClient({
                                    options,
                                    getCurrentAccessToken,
                                    getCurrentRefreshToken,
                                    getCurrentUser,
                                    refreshTokenUrl,
                                    logout,
                                    setRefreshedTokens,
                                  }) {
  const client = axios.create(options);

  client.interceptors.request.use(
    async (config) => {
      if (config.authorization !== false) {
        const token = await getCurrentAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return client
}