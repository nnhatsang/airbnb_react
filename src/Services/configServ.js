import axios from "axios";
import { userLocalStorage } from "./../Utils/Local";
let dataUser = userLocalStorage.get();
const token = dataUser?.token;
export const API = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn",
  headers: {
    TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAwMSIsIkhldEhhblN0cmluZyI6IjMwLzA5LzIwMzEiLCJIZXRIYW5UaW1lIjoiMTk0ODQ5MjgwMDAwMCIsIm5iZiI6MTYwMTIyNjAwMCwiZXhwIjoxOTQ4NjQwNDAwfQ.4l-eTzlgVnFczfvc2Or7BNPOcaesY3Kwc8RoNm-o-6M`,
    Authorization: `Bearer ${dataUser ? dataUser.accessToken : null}`,
    token,
  },
  timeout: 15000,
});
