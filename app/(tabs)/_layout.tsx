import { Tabs } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image, View } from "react-native";

import { icons } from "@/constants/icons";

type TabIconProps = {
  focused: boolean;
  icon: any;
};

function TabIcon({ focused, icon }: TabIconProps) {
  if (focused) {
    return (
      <LinearGradient
        colors={["#7C3AED", "#C084FC"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        className="mt-3 h-12 w-14 items-center justify-center overflow-hidden rounded-2xl"
      >
        <Image source={icon} tintColor="#F5EFFF" className="size-5" />
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
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.home} />,
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.search} />,
        }}
      />

      <Tabs.Screen
        name="save"
        options={{
          title: "Movies",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.save} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.person} />,
        }}
      />
    </Tabs>
  );
}
