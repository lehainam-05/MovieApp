/**
 * components/common/Footer.tsx
 *
 * @purpose Cụm chân trang chứa bản quyền, điều khoản và mạng xã hội.
 * @why Khi nhét chung cụm này vào một file, nếu sau này app có đổi tên thương hiệu hay 
 *      thay đổi link Facebook, ta chỉ cần vào duy nhất file này sửa 1 chữ là tự nhận ở tất cả mọi nơi.
 */

import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const Footer: React.FC = () => {
  return (
    <View className="items-center mt-6 mb-10 opacity-70">
      <Text
        className="font-black uppercase text-lg"
        style={{ color: "#D48BFF" }}
      >
        CINEMA
      </Text>
      <Text className="text-light-200 text-xs tracking-widest mt-1 mb-5">
        PREMIUM STREAMING EXPERIENCE
      </Text>

      {/* Primary Links */}
      <View className="flex-row items-center gap-4 mb-5">
        <Text className="text-light-100 text-xs font-semibold">PRIVACY</Text>
        <Text className="text-light-100 text-xs font-semibold">TERMS</Text>
        <Text className="text-light-100 text-xs font-semibold">HELP</Text>
        <Text className="text-light-100 text-xs font-semibold">CONTACT</Text>
      </View>

      {/* Social Media Circular Links */}
      <View className="flex-row items-center justify-center gap-4 mb-8">
        <View className="size-8 rounded-full bg-dark-200 items-center justify-center">
          <FontAwesome5 name="facebook-f" size={14} color="white" />
        </View>
        <View className="size-8 rounded-full bg-dark-200 items-center justify-center">
          <FontAwesome5 name="twitter" size={14} color="white" />
        </View>
        <View className="size-8 rounded-full bg-dark-200 items-center justify-center">
          <FontAwesome5 name="linkedin-in" size={14} color="white" />
        </View>
      </View>

      <Text
        className="text-light-200 text-xs text-center"
        style={{ fontSize: 10 }}
      >
        © 2024 CINEMA ENTERTAINMENT. ALL RIGHTS RESERVED.
      </Text>
    </View>
  );
};

export default Footer;
