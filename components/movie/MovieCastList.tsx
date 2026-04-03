/**
 * components/movie/MovieCastList.tsx
 *
 * @purpose Hiển thị danh sách top 5 diễn viên nổi bật nhất của bộ phim.
 * @why Duy trì một vòng lặp map() gọn gàng. Nếu mai mốt có yêu cầu sửa giao diện danh sách diễn viên 
 *      thành cuộn ngang, bạn chỉ việc vào đúng file này đổi thẻ View thành ScrollView là xong!
 */

import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface MovieCastListProps {
  cast: Cast[];
  onActorPress: (actorId: number) => void;
}

const MovieCastList: React.FC<MovieCastListProps> = ({ cast, onActorPress }) => {
  if (!cast || cast.length === 0) return null;

  return (
    <View className="px-5 mb-8">
      {/* Mảng tiêu đề */}
      <View className="flex-row justify-between items-end mb-4">
        <Text className="text-white font-bold text-xl">Top Cast</Text>
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-light-200 text-xs font-semibold mr-1">
            See All
          </Text>
          <Ionicons name="chevron-forward" size={12} color="#ababab" />
        </TouchableOpacity>
      </View>

      {/* Danh sách 5 diễn viên top đầu */}
      {cast.slice(0, 5).map((actor, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onActorPress(actor.id)}
          className="flex-row items-center mb-3 bg-dark-200 p-3 rounded-2xl"
        >
          <Image
            source={{
              uri: actor.profile_path
                ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                : "https://via.placeholder.com/150",
            }}
            className="w-16 h-16 rounded-xl bg-dark-100"
            resizeMode="cover"
          />
          <View className="ml-4 flex-1">
            <Text className="text-white font-bold text-base">
              {actor.name}
            </Text>
            <Text className="text-light-200 text-xs mt-1">
              {actor.character}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MovieCastList;
