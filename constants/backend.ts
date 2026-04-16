/**
 * constants/api.ts
 *
 * @purpose Cấu hình Base URL cho JSON Server backend.
 * @why     Điện thoại thật cần trỏ về IP Wifi của máy tính chạy json-server.
 *          Thay đổi IP bên dưới nếu mạng Wifi thay đổi.
 */

// IP Wifi của máy tính đang chạy json-server
// Nếu đổi mạng Wifi, chạy `ipconfig` để lấy IP mới và cập nhật ở đây.
export const API_BASE_URL = "http://192.168.110.152:3000";
