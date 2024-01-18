import { API } from "./configServ";

export const Vitri = {
  get_vi_tri: () => API.get("/api/vi-tri"),
  get_vitri_phanTrang: () =>
    API.get("/api/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=8"),
};
