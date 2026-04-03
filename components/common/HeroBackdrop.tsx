/**
 * components/common/HeroBackdrop.tsx
 *
 * @purpose Khối vẽ tấm ảnh bìa khổng lồ nằm ở đỉnh các trang phim hoặc trang diễn viên.
 * @why Tự động gắn dải màu Gradient đen mờ vào chân ảnh, giúp che đi lằn cắt vuông vức của bức hình,
 *      trộn lẫn bức hình vào nền background đen một cách mượt mà nhất.
 */

import React from "react";
import { View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";

interface HeroBackdropProps {
  imageUrl: string;
  height?: number;
}

const HeroBackdrop: React.FC<HeroBackdropProps> = ({ imageUrl, height = 600 }) => {
  return (
    <View style={{ width: "100%", height }}>
      <Image
        source={{ uri: imageUrl }}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
      {/* 
        Gradient làm mờ chân ảnh trùng với màu nền background của app.
        Cường độ sẽ tăng dần từ 0 (trong suốt) đến 1 (màu nền background chuẩn).
      */}
      <LinearGradient
        colors={[
          "transparent",
          "rgba(14,14,14,0.4)",
          "rgba(14,14,14,0.9)",
          Colors.background,
        ]}
        locations={[0, 0.4, 0.7, 1]}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: height * (2 / 3), // Chân làm mờ chiếm khoảng 2/3 không gian ảnh
        }}
      />
    </View>
  );
};

export default HeroBackdrop;
