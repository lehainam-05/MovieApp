import { Tabs } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, View } from "react-native";

import { icons } from "@/constants/icons";

type TabIconProps = {
  focused: boolean;
  icon: any;
  title: string;
};

function TabIcon({ focused, icon, title }: TabIconProps) {
  if (focused) {
    return (
      <LinearGradient
        colors={["#A855F7", "#C084FC"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        className="h-12 min-w-[108px] flex-row items-center justify-center rounded-full px-5"
      >
        <Image source={icon} tintColor="#14071f" className="size-5" />
        <Text className="ml-2 text-xl font-semibold text-[#14071f]">{title}</Text>
      </LinearGradient>
    );
  }

  return (
    <View className="h-12 w-16 items-center justify-center rounded-full">
      <Image source={icon} tintColor="#94A3B8" className="size-5" />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#050816",
          borderRadius: 999,
          marginHorizontal: 12,
          marginBottom: 14,
          height: 58,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#111827",
          paddingHorizontal: 6,
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
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.search} title="Search" />,
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
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.person} title="Profile" />,
        }}
      />
    </Tabs>
  );
}
