/**
 * components/actor/ActorWorks.tsx
 *
 * @purpose Liệt kê khay lướt ngang những bộ phim làm nên tên tuổi của diễn viên đó.
 * @why Ẩn chứa cả Loading Indicator nếu mạng chậm. Điều này chống việc giao diện trống trơn khó chịu
 *      trước khi phim kịp móc nối thông tin từ TMDB về.
 */

import React from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { Colors } from "@/constants/colors";
import MoviePosterCard from "@/components/home/MoviePosterCard";

interface ActorWorksProps {
  movies: Movie[] | null;
  loading: boolean;
  firstName: string;
  lastName: string;
}

const ActorWorks: React.FC<ActorWorksProps> = ({ movies, loading, firstName, lastName }) => {
  return (
    <View className="mb-10 pl-5">
      <View className="flex-row justify-between items-end mb-4 pr-5">
        <View>
          <Text className="text-white font-bold text-xl">Featured Works</Text>
          <Text className="text-light-200 text-xs mt-1">
            The career-defining performances of {firstName} {lastName}
          </Text>
        </View>
        <TouchableOpacity>
          <Text
            className="text-xs font-bold uppercase"
            style={{ color: "#D48BFF" }}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator color={Colors.primary} className="my-10 pr-5" />
      ) : (
        <FlatList
          horizontal
          data={movies?.slice(0, 10)}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => <MoviePosterCard movie={item} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16, paddingRight: 20 }}
        />
      )}
    </View>
  );
};

export default ActorWorks;
