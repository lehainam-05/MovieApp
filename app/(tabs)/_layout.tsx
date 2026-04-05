/**
 * app/(tabs)/_layout.tsx
 *
 * @purpose Cấu hình Tab Bar Navigation — file bắt buộc của Expo Router.
 * @why Expo Router yêu cầu file `_layout.tsx` nằm đúng vị trí này để định nghĩa
 *      cấu trúc điều hướng Tab. Không thể di chuyển sang screens/.
 *      Component TabIcon đã được tách ra components/common/TabIcon.tsx.
 */
import { Tabs } from "expo-router";
import { icons } from "@/constants/icons";
import TabIcon from "@/components/common/TabIcon";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          borderTopWidth: 0,
          height: 80,
          paddingTop: 8,
          paddingBottom: 12,
          position: "absolute",
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Trang Chủ" />
          ),
        }}
      />

      <Tabs.Screen
        name="movies"
        options={{
          title: "Movies",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save} title="Kho Phim" />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Tìm Kiếm" />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Hồ Sơ" />
          ),
        }}
      />
    </Tabs>
  );
}
