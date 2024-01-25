import { API } from "./configServ";

export const Phong = {
  get_datPhongTheoViTri: (value) =>
    API.get(`/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${value}`),
  get_listPhong: () => API.get("api/phong-thue"),
  get_idPhong: (id) => API.get(`/api/phong-thue/${id}`),
  get_binhLuan: (id) =>
    API.get(`/api/binh-luan/lay-binh-luan-theo-phong/${id}`),
};
