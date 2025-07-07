import axios from "axios";

const baseURL = "https://upskilling-egypt.com:3000/api/v0";

export const ImageURL = "https://upskilling-egypt.com:3000/";

export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const USERS_URLS = {
  LOGIN: `/portal/users/login`,
  FORGET_PASS: `/portal/users/forgot-password`,
  REGISTER: `/portal/users`,
  CHANGE_PASS: `/portal/users/change-password`,
  RESET_PASS: `/portal/users/reset-password`,
<<<<<<< HEAD
  GET_CURRENT_USER: (id: number) => `/portal/users/${id}`,
};

export const ROOMS_URLS = {
  GET_ROOMS: `/admin/rooms?page=1&size=10`,
};
=======
  GET_CURRENT_USER: (id : Number) => `/admin/users/${id}`
}
>>>>>>> bbf2be5096bae8a029a97ea7bac00cb2b32fa579
