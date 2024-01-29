import { API } from "./configServ";

export const Auth = {
  post_login: (values) => API.post("/api/auth/signin", values),
  post_signup: (values) => API.post("/api/auth/signup", values),
  get_infoUser: (id) => API.get(`/api/users/${id}`),
};
