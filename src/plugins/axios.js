import axios from "axios";
import { useAuthStore } from "@/stores/auth.js";
import {toast} from "vue3-toastify";
import router from '@/router'

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const authStore = useAuthStore();

    if (authStore.token) {
      const dateNow = Date.now() / 1000;
      if (dateNow > authStore.tokenExist.exp) {
        await authStore.refresh()
      }
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        router.push({ path: "/login", replace: true });
        toast(error.response.data.message, {
            autoClose: 5000,
        });
        return Promise.reject(error);
    }
)

export { axiosInstance };
