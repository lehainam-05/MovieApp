import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import { icons } from "@/constants/icons";

function TabIcon({ focused, icon, title }: { focused: boolean; icon: any; title: string }) {
  return (
    <View
      className={`mt-2 items-center justify-center rounded-2xl px-5 py-2 ${
        focused ? "bg-[#d48fff]/20" : "bg-transparent"
      }`}
    >
      <Image source={icon} tintColor={focused ? "#d48fff" : "#7b7b7b"} className="size-5" />
      <Text className={`mt-1 text-[10px] uppercase tracking-[1.5px] ${focused ? "text-[#d48fff]" : "text-zinc-500"}`}>
        {title}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#111111",
          borderTopWidth: 0,
          height: 84,
          paddingTop: 8,
          paddingBottom: 14,
          position: "absolute",
          borderRadius: 24,
          marginHorizontal: 14,
          marginBottom: 14,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.home} title="Home" />,
        }}
      />
      <Tabs.Screen
        name="save"
        options={{
          title: "Movies",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.save} title="Movies" />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.search} title="Search" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.person} title="Profile" />,
        }}
      />
    </Tabs>
  );
}
