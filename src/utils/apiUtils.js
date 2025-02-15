import axios from "axios";
import Cookie from "js-cookie";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL}/api`,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true
});

api.interceptors.request.use(
    async (config) => {
        const jwtToken = Cookie.get("access_token");
        if (jwtToken) {
            config.headers.Authorization = `Bearer ${jwtToken}`;
        }

        let csrfToken = Cookie.get("csrf_token");
        if (!csrfToken) {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/csrf-token`,
                    {withCredentials: true});
                csrfToken = response.data.token;
                Cookie.set("csrf_token", csrfToken, { secure: true, sameSite: "Strict" });
            } catch (error) {
                console.error("Failed to fetch CSRF token", error);
            }
        }
        if (csrfToken) {
            config.headers["X-XSRF-TOKEN"] = csrfToken;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;