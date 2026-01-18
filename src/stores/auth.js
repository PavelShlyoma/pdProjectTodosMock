import { defineStore } from "pinia";
import { axiosInstance } from "@/plugins/axios.js";
import {toast} from "vue3-toastify";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "",
  }),
  getters: {
    tokenExist() {
      if (this.token) {
        return JSON.parse(atob(this.token.split(".")[1]));
      } else {
        return false;
      }
    },
  },
  actions: {
    register(data) {
      return new Promise((resolve, reject) => {
        const axiosInstanceRegister = axiosInstance.create();
        axiosInstanceRegister({ url: "register", data: data, method: "POST" })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            toast(error.response.data.message, {
              autoClose: 5000,
            });
            reject(error);
          });
      });
    },
    login(data) {
      return new Promise((resolve, reject) => {
        const axiosInstanceLogin = axiosInstance.create();
        axiosInstanceLogin({ url: "login", data: data, method: "POST" })
          .then((response) => {
            this.token = response.data.token;
            resolve(response.data);
          })
          .catch((error) => {
            toast(error.response.data.message, {
              autoClose: 5000,
            });
            reject(error);
          });
      });
    },
    logout() {
      return new Promise((resolve, reject) => {
        axiosInstance({ url: "logout", method: "POST" })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    refresh() {
      return new Promise((resolve, reject) => {
        const axiosInstanceRefresh = axiosInstance.create();
        axiosInstanceRefresh({ url: "refresh", method: "GET" })
          .then((response) => {
            this.token = response.data.token;
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
