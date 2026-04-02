import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import { icons } from "@/constants/icons";

function TabIcon({ focused, icon, title }: any) {
  return (
    <View
      className={`items-center justify-center px-3 py-2 rounded-2xl min-w-[68px] ${
        focused ? "bg-[#2a1f37]" : ""
      }`}
    >
      <Image source={icon} tintColor={focused ? "#d772ff" : "#8d8f9e"} className="size-5" />
      <Text
        className={`text-[10px] mt-1 uppercase tracking-[1.2px] font-semibold ${
          focused ? "text-[#d772ff]" : "text-[#8d8f9e]"
        }`}
      >
        {title}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "auto",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0e1016",
          borderRadius: 18,
          marginHorizontal: 16,
          marginBottom: 22,
          height: 70,
          paddingTop: 8,
          paddingBottom: 8,
          position: "absolute",
          borderWidth: 1,
          borderColor: "#1e212c",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "index",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Search" />
          ),
        }}
      />

      <Tabs.Screen
        name="save"
        options={{
          title: "Movies",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save} title="Movies" />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}
