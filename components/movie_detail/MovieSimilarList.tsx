/**
 * components/movie/MovieSimilarList.tsx
 *
 * @purpose Kéo ra một khay chứa các phim tương tự (cùng thể loại) cho người dùng lướt tiếp mỏi tay.
 * @why Tận dụng luôn thẻ phim `MoviePosterCard` đã làm ở trang chủ để tối đa hoá sự gắn kết (Reusability).
 */

import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MoviePosterCard from "@/components/home/MoviePosterCard"; // Reusable generic poster card

interface MovieSimilarListProps {
  movies: Movie[];
}

const MovieSimilarList: React.FC<MovieSimilarListProps> = ({ movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <View className="mb-10 pl-5">
      <View className="flex-row justify-between items-end mb-4 px-5">
        <Text className="text-white font-bold text-xl">Phim Tương Tự</Text>
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-light-200 text-xs font-semibold mr-1">
            Xem Thêm
          </Text>
          <Ionicons name="chevron-forward" size={12} color="#ababab" />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={movies.slice(0, 10)}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => <MoviePosterCard movie={item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 16, paddingRight: 20 }}
      />
    </View>
  );
};

export default MovieSimilarList;
