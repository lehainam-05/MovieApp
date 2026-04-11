/**
 * app/_layout.tsx
 * 
 * @purpose Gốc rễ của toàn bộ kiến trúc giao diện (Root Layout).
 * @why Đây là nơi khai báo Expo Router Stack. Quản lý việc màn hình nào sẽ được xếp lên trên màn hình nào, 
 *      và thiết lập các quy tắc chung hiển thị toàn cục (như ẩn StatusBar, nạp file CSS gốc).
 */
import { Stack, useRouter, useSegments } from "expo-router";
import "./globals.css";
import { StatusBar, View, ActivityIndicator } from "react-native";
import { useEffect } from "react";

import { WatchlistProvider } from "@/store/WatchlistContext";
import { AuthProvider, useAuth } from "@/store/AuthContext";
import { Colors } from "@/constants/colors";

const RootLayoutNav = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // Chặn cửa tử: Nếu chưa đăng nhập mà lang thang ngoài login/register => Cút về login.
    if (!isAuthenticated && segments[0] !== 'login' && segments[0] !== 'register') {
      // Dùng replace để triệt tiêu nút "Back" của OS nảy về trang nhăng cuội
      router.replace('/login');
    } else if (isAuthenticated && segments[0] === 'login') {
      // Nếu có vé rồi mà ra check-in làm trò => Ép vô sàn đấu chính
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false, animation: 'fade' }} />
      <Stack.Screen name="register" options={{ headerShown: false, animation: 'fade' }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="actor/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="settings/account" options={{ headerShown: false }} />
      <Stack.Screen name="watchlist" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <WatchlistProvider>
        <StatusBar hidden={true} />
        <RootLayoutNav />
      </WatchlistProvider>
    </AuthProvider>
  );
}
