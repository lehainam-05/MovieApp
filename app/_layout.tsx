// _layout cho Router của Expo - định nghĩa các stack screen chính
// Đây là layout gốc, tất cả các route con được hiển thị trong Stack.
import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      {/* Ẩn status bar để app full màn hình */}
      <StatusBar hidden={true} />

      <Stack>
        {/* Tab navigator chứa các tab chính */}
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        {/* Page chi tiết phim (/movie/[id]) */}
        <Stack.Screen
          name="movie/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
