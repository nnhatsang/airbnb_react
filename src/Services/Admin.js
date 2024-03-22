import { API } from "./configServ";

export const Admin = {
  // user
  getAllUser: () => API.get("/api/users"),
  getUsersPage: (index, searchKeyword) =>
    API.get(
      `/api/users/phan-trang-tim-kiem?pageIndex=${index}&pageSize=10&keyword=${searchKeyword}`
    ),
  getUserByID: (id) => API.get(`/api/users/${id}`),
  createNewUser: (user) => API.post("/api/users", user),
  deleteUser: (id) => API.delete(`/api/users/?id=${id}`),
  updateUser: (userUpdate) =>
    API.put(`/api/users/${userUpdate.id}`, userUpdate),
  searchUser: (key) => API.get(`/api/users/search/${key}`),
  updateAvatar: (avatar) => API.post(`/api/users/upload-avatar`, avatar),

  // room
  getRoomPage: (index, searchKeyword) =>
    API.get(
      `/api/phong-thue/phan-trang-tim-kiem?pageIndex=${index}&pageSize=10&keyword=${searchKeyword}`
    ),
  createRoom: (data) => API.post("/api/phong-thue", data),
  uploadPhotoRoom: (id, photo) =>
    API.post(`/api/phong-thue/upload-hinh-phong?maPhong=${id}`, photo),
  deleteRoom: (id) => API.delete(`/api/phong-thue/${id}`),
  updateRoom: (data) => API.put(`/api/phong-thue/${data.id}`, data),
  get_idPhong: (id) => API.get(`/api/phong-thue/${id}`),

  //location
  getLocationPage: (index, searchKeyword) =>
    API.get(
      `/api/vi-tri/phan-trang-tim-kiem?pageIndex=${index}&pageSize=3&keyword=${searchKeyword}`
    ),
  getLocationByID: (id) => API.get(`/api/vi-tri/${id}`),
  createLocation: (data) => API.post("/api/vi-tri", data),
  updateLocation: (data) => API.put(`/api/vi-tri/${data.id}`, data),

  deleteLocation: (id) => API.delete(`/api/vi-tri/${id}`),
  uploadPhotoLocation: (id, photo) =>
    API.post(`/api/vi-tri/upload-hinh-vitri?maViTri=${id}`, photo),

  // booking
  getAllBookings: () => API.get("/api/dat-phong"),
  deleteBooking: (id) => API.delete(`/api/dat-phong/${id}`),
};
