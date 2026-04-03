/**
 * components/actor/ActorBio.tsx
 *
 * @purpose Chứa cụm văn bản tiểu sử khổng lồ và bảng tóm tắt lý lịch (Ngày sinh, nơi đẻ).
 * @why Khối text tiểu sử thường rất dài, dễ dàng phá vỡ bố cục tổng nếu để chung với màn hình gốc.
 */

import React from "react";
import { View, Text } from "react-native";

interface ActorBioProps {
  biography: string;
  birthday: string | null;
  placeOfBirth: string | null;
}

const ActorBio: React.FC<ActorBioProps> = ({
  biography,
  birthday,
  placeOfBirth,
}) => {
  return (
    <View className="px-5">
      {/* About Section */}
      <Text className="text-white font-bold text-xl mb-4">About</Text>
      <Text className="text-light-200 text-sm leading-6 mb-8 text-justify">
        {biography || "No biography available."}
      </Text>

      {/* Personal Details Table */}
      <View className="bg-dark-200 rounded-3xl p-5 mb-10 border border-white/5">
        <Text
          className="text-[10px] font-bold uppercase tracking-widest mb-6"
          style={{ color: "#D48BFF" }}
        >
          PERSONAL DETAILS
        </Text>

        <View className="flex-row justify-between mb-4">
          <Text className="text-light-200 text-xs">Born</Text>
          <Text className="text-white font-bold text-xs">
            {birthday || "N/A"}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-light-200 text-xs">Place of Birth</Text>
          <Text className="text-white font-bold text-xs max-w-[60%] text-right">
            {placeOfBirth || "N/A"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ActorBio;
