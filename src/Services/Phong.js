import React from "react";
import { API } from "./configServ";

export const Phong = {
  get_datPhongTheoViTri: (value) =>
    API.get(`/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${value}`),
};