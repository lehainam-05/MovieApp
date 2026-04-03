/**
 * components/actor/ActorIdentity.tsx
 *
 * @purpose Cụm thông tin định danh Diễn Viên (Tên tuổi to nhất đập vào mắt, thông số độ hot, nút follow).
 * @why Giữ một khối các thống kê liên quan mật thiết với nhau ở cùng một cụm. Style chữ đâm đậm nét 
 *      khảo sát từ thiết kế hệ thống báo chí nhằm tạo ra sự sang trọng.
 */

import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { icons } from "@/constants/icons";

interface ActorIdentityProps {
  firstName: string;
  lastName: string;
  popularity: number;
  department: string;
}

const ActorIdentity: React.FC<ActorIdentityProps> = ({
  firstName,
  lastName,
  popularity,
  department,
}) => {
  return (
    <View className="px-5 -mt-32">
      {/* Badge */}
      <View className="mb-2 bg-white/10 self-start px-3 py-1 rounded-full border border-white/20">
        <Text
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: "#D48BFF" }}
        >
          AWARD-WINNING AUTEUR
        </Text>
      </View>

      {/* Name */}
      <Text
        className="text-white font-black leading-tight"
        style={{ fontSize: 44, letterSpacing: -1 }}
      >
        {firstName}
      </Text>
      <Text
        className="font-black leading-tight -mt-2"
        style={{ fontSize: 44, letterSpacing: -1, color: "#D48BFF" }}
      >
        {lastName}
      </Text>

      {/* Buttons */}
      <View className="flex-row items-center mt-6 mb-6">
        <TouchableOpacity
          className="flex-1 h-12 flex-row items-center justify-center rounded-full mr-3"
          style={{ backgroundColor: "#D48BFF" }}
        >
          <Image source={icons.play} className="size-3 mr-2" tintColor="#000" />
          <Text className="text-black font-bold text-sm">Watch Reel</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 h-12 items-center justify-center rounded-full border border-dark-100 bg-dark-200">
          <Text className="text-white font-semibold text-sm">Follow</Text>
        </TouchableOpacity>
      </View>

      {/* Highlights / Stats */}
      <View className="flex-row items-center gap-4 mb-8">
        <View className="flex-1 bg-dark-200 p-4 rounded-3xl border border-white/10 flex-row items-center">
          <Ionicons name="star" size={24} color="#D48BFF" />
          <View className="ml-3">
            <Text className="text-white font-bold text-base">
              {Math.round(popularity)}
            </Text>
            <Text className="text-light-200 text-[10px] uppercase tracking-wider mt-0.5">
              Popularity Score
            </Text>
          </View>
        </View>

        <View className="flex-1 bg-dark-200 p-4 rounded-3xl border border-white/10 flex-row items-center">
          <Ionicons name="film-outline" size={24} color="#D48BFF" />
          <View className="ml-3">
            <Text className="text-white font-bold text-base capitalize">
              {department || "Acting"}
            </Text>
            <Text className="text-light-200 text-[10px] uppercase tracking-wider mt-0.5">
              Known For
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ActorIdentity;
