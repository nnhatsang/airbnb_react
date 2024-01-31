import { API } from "./configServ";

export const Admin = {
  getAllUser: () => API.get("/api/users"),
  getUsersPage: (index) =>
    API.get(`/api/users/phan-trang-tim-kiem?pageIndex=${index}&pageSize=10`),
  getUserByID: (id) => API.get(`/api/users/${id}`),
  createNewUser: (user) => API.post("/api/users", user),
  deleteUser: (id) => API.delete(`/api/users/?id=${id}`),
  updateUser: (userUpdate) =>
    API.put(`/api/users/${userUpdate.id}`, userUpdate),
  searchUser: (key) => API.get(`/api/users/search/${key}`),
  updateAvatar: (avatar) => API.post(`/api/users/upload-avatar`, avatar),
};
