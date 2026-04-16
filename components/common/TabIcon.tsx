/**
 * components/common/TabIcon.tsx
 *
 * @purpose Icon tái sử dụng cho thanh Tab Bar dưới cùng.
 * @why Tách ra khỏi _layout.tsx để tuân thủ nguyên tắc "Component tái sử dụng phải tách riêng".
 */
import React from 'react';
import { View, Image, Text } from 'react-native';

interface TabIconProps {
  focused: boolean;
  icon: any;
  title: string;
}

const TabIcon = ({ focused, icon, title }: TabIconProps) => (
  <View className="items-center justify-center" style={{ minWidth: 70 }}>
    {/* Icon container */}
    <View
      style={{
        backgroundColor: focused ? "rgba(171,139,255,0.25)" : "transparent",
        borderRadius: 14,
        padding: 10,
        marginBottom: 3,
      }}
    >
      <Image
        source={icon}
        tintColor={focused ? "#AB8BFF" : "#9e9eb3"}
        className="size-6"
        style={{ width: 24, height: 24 }}
      />
    </View>

    {/* Label */}
    <Text
      style={{
        color: focused ? "#AB8BFF" : "#9e9eb3",
        fontSize: 10,
        fontWeight: "600",
        letterSpacing: 1,
        textTransform: "uppercase",
      }}
    >
      {title}
    </Text>
  </View>
);

export default TabIcon;
