import { Tabs } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, View } from "react-native";

import { icons } from "@/constants/icons";

function TabIcon({ focused, icon, title }: { focused: boolean; icon: any; title: string }) {
  if (focused) {
    return (
      <LinearGradient
        colors={["#7C3AED", "#C084FC"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        className="mt-4 min-h-14 min-w-[112px] flex-1 flex-row items-center justify-center overflow-hidden rounded-full"
      >
        <Image source={icon} tintColor="#F5EFFF" className="size-5" />
        <Text className="ml-2 text-base font-semibold text-white">{title}</Text>
      </LinearGradient>
    );
  }

  return (
    <View className="mt-4 size-full items-center justify-center rounded-full">
      <Image source={icon} tintColor="#A8B5DB" className="size-5" />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0F0F14",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 24,
          height: 56,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#1E1B2E",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.home} title="Home" />,
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.search} title="Search" />,
        }}
      />

      <Tabs.Screen
        name="save"
        options={{
          title: "Movies",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.save} title="Movies" />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.person} title="Profile" />,
        }}
      />
    </Tabs>
  );
}
