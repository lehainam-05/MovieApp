/**
 * app/_layout.tsx
 * 
 * @purpose Gốc rễ của toàn bộ kiến trúc giao diện (Root Layout).
 * @why Đây là nơi khai báo Expo Router Stack. Quản lý việc màn hình nào sẽ được xếp lên trên màn hình nào, 
 *      và thiết lập các quy tắc chung hiển thị toàn cục (như ẩn StatusBar, nạp file CSS gốc).
 */
import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      {/* Ẩn cột sóng, giờ, phần trăm pin của điện thoại để App phủ kín 100% màn hình, tạo cảm giác điện ảnh */}
      <StatusBar hidden={true} />

      {/* Máy quản lý ngăn xếp màn hình (Stack). Màn hình mới mở sẽ lùi màn cũ ra sau. */}
      <Stack>
        {/* Khai báo cụm Tab Dưới Đáy (Bottom Tabs) làm root */}
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false, // Tắt cái tên route mặc định màu trắng ở đỉnh đầu
          }}
        />
        {/* Cấu hình màn hình Chi tiết Phim */}
        <Stack.Screen
          name="movie/[id]"
          options={{
            headerShown: false,
          }}
        />
        {/* Cấu hình màn hình Trang Cá Nhân Diễn Viên */}
        <Stack.Screen
          name="actor/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
