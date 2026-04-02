import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { icons } from "@/constants/icons";
import { colors } from "@/constants/colors";

function TabIcon({ focused, icon, title }: any) {
  if (focused) {
    return (
      <LinearGradient
        colors={colors.gradient.chip}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          flexDirection: "row",
          width: "100%",
          flex: 1,
          minWidth: 112,
          minHeight: 56,
          marginTop: 8,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 999,
        }}
      >
        <Image source={icon} tintColor="#141624" className="size-5" />
        <Text className="text-secondary text-base font-semibold ml-2">{title}</Text>
      </LinearGradient>
    );
  }

  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
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
          backgroundColor: "#0D0F1A",
          borderRadius: 24,
          marginHorizontal: 20,
          marginBottom: 20,
          height: 64,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#25283A",
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
          title: "Save",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save} title="Save" />
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
