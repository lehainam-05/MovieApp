/**
 * components/common/StickyHeader.tsx
 *
 * @purpose Khối Header (tiêu đề trên cùng) có khả năng dính chặt vào cạnh mép trên của điện thoại.
 * @why Tạo ra một trải nghiệm điện ảnh liền mạch: Bình thường tàng hình để không lẹm vào ảnh bìa, 
 *      nhưng cứ hễ người dùng vuốt xuống là nó đổ màu kính mờ (glassmorphism) để nổi bật nút Back.
 */

import React from "react";
import { View, Platform, StyleSheet, TouchableOpacity, Image } from "react-native";
import { BlurView } from "expo-blur";
import { icons } from "@/constants/icons";

interface StickyHeaderProps {
  scrolled: boolean;
  onBackPress: () => void;
  titleNode: React.ReactNode;
  rightNode?: React.ReactNode;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({
  scrolled,
  onBackPress,
  titleNode,
  rightNode,
}) => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        overflow: "hidden",
        paddingTop: Platform.OS === "ios" ? 50 : 30,
        paddingBottom: 15,
      }}
    >
      {/* Màn mờ kính hoạt động khi trang bị cuộn xuống (scrolled = true) */}
      {scrolled ? (
        <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill} />
      ) : null}

      {/* Lớp nền màu tối nhẹ được áp dụng thêm sau khi kéo xuống */}
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: scrolled ? "rgba(14,14,14,0.7)" : "transparent",
          },
        ]}
      />

      {/* Cụm điều hướng */}
      <View className="flex-row justify-between items-center px-5">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={onBackPress} className="p-2 -ml-2 mr-2">
            <Image
              source={icons.arrow}
              className="size-6 rotate-180"
              tintColor="#fff"
            />
          </TouchableOpacity>

          {titleNode}
        </View>

        {rightNode && (
          <View className="flex-row items-center gap-4">
            {rightNode}
          </View>
        )}
      </View>
    </View>
  );
};

export default StickyHeader;
