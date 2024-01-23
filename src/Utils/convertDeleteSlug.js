export default function convertDeleteSlug(chuoi) {
  // Chuyển đổi dạng "nha-trang" thành "Nha Trang"
  // Ví dụ: "nha-trang" -> "Nha Trang"
  const mangTu = chuoi.split("-");
  const ketQua = mangTu.map((tu) => tu.charAt(0).toUpperCase() + tu.slice(1));
  return ketQua.join(" ");
}
