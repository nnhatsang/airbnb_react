import axios from "axios";
import { userLocalStorage } from "./../Utils/Local";
// let dataUser = userLocalStorage.get();
// // const token = ;
// // console.log(token);
// const TOKEN_CYBER = process.env.REACT_APP_TOKEN_CYBERSOFT;
// const saveTokenToLocalStorage = (token) => {
//   localStorage.set(token);
// };

// export const API = axios.create({
//   baseURL: "https://airbnbnew.cybersoft.edu.vn",
//   headers: {
//     TokenCybersoft: TOKEN_CYBER,
//     Authorization: `Bearer ${dataUser ? dataUser.accessToken : null}`,
//     token: userLocalStorage.get()?.token,
//   },
//   timeout: 15000,
// });


export const API = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn",
  timeout: 15000,
});

API.interceptors.request.use(
  (config) => {
    const tokenCyber = process.env.REACT_APP_TOKEN_CYBERSOFT;
    const dataUser = userLocalStorage.get();
    const userToken = userLocalStorage.get()?.token;

    config.headers.TokenCybersoft = tokenCyber;
    config.headers.Authorization = `Bearer ${dataUser ? dataUser.accessToken : null}`;
    config.headers.token = userToken;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

