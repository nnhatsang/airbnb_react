import { API } from "./configServ";

export const Auth = {
  post_login: (data) => API.post("/api/auth/signin",data),
};
