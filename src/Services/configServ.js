import axios from "axios";
import { userLocalStorage } from "./../Utils/Local";
let dataUser = userLocalStorage.get();
const token = dataUser?.token;
const TOKEN_CYBER = process.env.REACT_APP_TOKEN_CYBERSOFT;

export const API = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn",
  headers: {
    TokenCybersoft: TOKEN_CYBER,
    Authorization: `Bearer ${dataUser ? dataUser.accessToken : null}`,
    token,
  },
  timeout: 15000,
});
