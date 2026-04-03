import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { icons } from "@/constants/icons";

function TabIcon({ focused, icon }: { focused: boolean; icon: ImageSourcePropType }) {
  if (focused) {
    return (
      <LinearGradient
        colors={["#9D50BB", "#AB57AC", "#C084FC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="w-16 h-10 rounded-full items-center justify-center"
        style={{
          shadowColor: "#AB57AC",
          shadowOpacity: 0.4,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 6 },
          elevation: 8,
        }}
      >
        <Image source={icon} tintColor="#160f24" className="size-5" />
      </LinearGradient>
    );
  }

  return (
    <View className="w-16 h-10 rounded-full items-center justify-center">
      <Image source={icon} tintColor="#B7B7C9" className="size-5" />
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
          backgroundColor: "rgba(22,22,28,0.95)",
          borderRadius: 36,
          marginHorizontal: 24,
          marginBottom: 28,
          height: 72,
          paddingHorizontal: 10,
          paddingTop: 12,
          position: "absolute",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.1)",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "index",
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
          title: "Save",
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
