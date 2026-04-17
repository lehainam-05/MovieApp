<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Native Logo" width="100" />
  <h1>MovieApp</h1>
  <p>Một ứng dụng di động xem phim chuyên nghiệp được xây dựng trên nền tảng React Native (Expo) và TypeScript.</p>

  <!-- Badges -->
  <p>
    <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" />
    <img alt="Expo" src="https://img.shields.io/badge/Expo-1B1F23?style=flat-square&logo=expo&logoColor=white" />
    <img alt="React Native" src="https://img.shields.io/badge/React_Native-20232A?style=flat-square&logo=react&logoColor=61DAFB" />
  </p>
</div>

---

## 📖 Tổng quan

**MovieApp** là một ứng dụng di động cho phép người dùng theo dõi, tìm kiếm và khám phá các bộ phim yêu thích của họ. Ứng dụng cung cấp trải nghiệm mượt mà với giao diện hiện đại nhờ sử dụng NativeWind, cùng với cấu trúc định tuyến (routing) mạnh mẽ của Expo Router.

---

## ✨ Tính năng chính

- 🎬 **Khám phá phim:** Duyệt qua các danh sách phim thịnh hành, phim được yêu thích và sắp ra mắt.
- 🔍 **Tìm kiếm phim:** Tìm kiếm các bộ phim cụ thể theo từ khóa với hiệu suất tối ưu.
- 🔖 **Danh sách yêu thích:** Thêm và quản lý những bộ phim bạn muốn xem trong tương lai.
- 👤 **Xác thực người dùng:** Hệ thống đăng nhập / đăng ký thông qua backend nội bộ.
- 🎨 **Giao diện hiện đại:** Thiết kế responsive chuẩn UI/UX, hỗ trợ mượt mà trên cả iOS và Android.

---

## 🛠️ Công nghệ sử dụng & Thư viện lõi

Dự án được xây dựng với những công nghệ tiên tiến nhất của hệ sinh thái React Native:

- **Framework lõi:** [React Native](https://reactnative.dev) / [Expo](https://expo.dev/)
- **Ngôn ngữ:** [TypeScript](https://www.typescriptlang.org/)
- **Định tuyến:** [Expo Router](https://docs.expo.dev/router/introduction/)
- **Tạo kiểu:** [NativeWind](https://www.nativewind.dev/) (Tailwind CSS cho React Native)
- **Hoạt ảnh:** [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) & Expo Blur
- **Lưu trữ dữ liệu:** Expo File System / Async Storage (hoặc Local JSON Server)
- **Backend Mocking:** `json-server` & `json-server-auth`

---

## 📋 Yêu cầu hệ thống

Để chạy dự án này trên máy nội bộ, bạn cần cài đặt:

- **Node.js** (Khuyến nghị phiên bản LTS `v18.x` hoặc `v20.x`)
- Trình quản lý gói: **npm**
- **Expo CLI** đa phần được đi kèm (cài đặt thông qua `npm run start`).
- **Ứng dụng Expo Go** trên điện thoại (để chạy thật qua mạng LAN)

---

## 🚀 Cài đặt & Thiết lập

Thực hiện các bước sau để sao chép mã nguồn và thiết lập môi trường phát triển:

**1. Clone kho lưu trữ :**
```bash
git clone https://github.com/lehainam-05/MovieApp.git
cd MovieApp
```

**2. Cài đặt các gói phụ thuộc:**
```bash
npm install
```

---

## 🔐 Biến môi trường (.env)

Tạo một tệp `.env` tại thư mục gốc của dự án. Dưới đây là mẫu `.env.example`:

```env
# API Endpoint cho dữ liệu / phim
EXPO_PUBLIC_MOVIE_API_KEY=[YOUR_TMDB_API_KEY_HERE]
```

*(Lưu ý: Không bao giờ đẩy tệp `.env` thực thụ của bạn lên GitHub. Tệp chứa khóa bảo mật cần được giữ riêng tư.)*

---

## ▶️ Chạy ứng dụng

Ứng dụng chia thành 2 phần: Frontend (Mobile App) và Mock Backend.

### 1. Khởi chạy Mock Backend (JSON Server)
Dự án có sử dụng một máy chủ JSON cục bộ cho việc xác thực và cung cấp dữ liệu:
```bash
npm run backend
```
*(Lưu ý quan trọng: Khi tải json-server trên máy tính, bạn cần mở cmd/terminal và chạy lệnh `ipconfig` (Windows) hoặc `ifconfig` (Mac/Linux) để lấy địa chỉ IP mạng LAN của máy (IPv4, ví dụ: `192.168.x.x`). Sau đó, hãy dùng IP này để cấu hình kết nối ứng dụng tới backend của bạn thay vì dùng `localhost` để thiết bị thật có thể kết nối được.)*

### 2. Khởi chạy Mobile App (Expo)
Mở một cửa sổ Terminal (hoặc tab) mới:
```bash
npm start
```
- Nhấn **`a`** để mở ứng dụng trên Android Emulator.
- Nhấn **`i`** để mở ứng dụng trên iOS Simulator (Chỉ cấp khả dụng trên macOS).
- Nhấn **`w`** để mở trực tiếp dưới dạng Web App.
- Quét mã QR code xuất hiện trên terminal bằng ứng dụng **Expo Go** trên thiết bị thực của bạn.

---

## 📁 Cấu trúc dự án

```text
movieApp/
├── backend/                  # Nơi lưu trữ cấu hình Mock Backend (json-server)
├── assets/                   # Phông chữ, biểu tượng ứng dụng và hình ảnh mặc định
├── components/               # Các component tái sử dụng (Buttons, Cards,...)
├── app/ (hoặc expo-router)   # Cấu trúc hệ thống màn hình dựa theo tệp (File-based routing)
├── screens/                  # Các màn hình chính (Home, Details, Profile...)
├── store/                    # Quản lý trạng thái chia sẻ toàn cục (Context API)
│   ├── AuthContext.tsx
│   └── WatchlistContext.tsx
├── package.json              # Chứa thông tin về thư viện và npm scripts
├── tailwind.config.js        # Cấu hình phong cách thiết kế NativeWind
├── tsconfig.json             # Thiết lập trình biên dịch TypeScript
└── README.md                 # Tài liệu này
```
