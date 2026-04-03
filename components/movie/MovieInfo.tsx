/**
 * components/movie/MovieInfo.tsx
 *
 * @purpose Khu vực hiển thị Tiêu đề phim, đánh giá sao, nhãn dán 18+ và nút Play Now.
 * @why Tách toàn bộ bãi lầy text nhằng nhịt này ra khỏi thân file chính giúp trang chủ của phim 
 *      đọc nhàn mắt hơn. Chỉ chuyên tâm nhận data từ App và vẽ ra giao diện.
 */

import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { icons } from "@/constants/icons";

interface MovieInfoProps {
  movie: MovieDetails;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => {
  return (
    <View className="px-5 -mt-32">
      {/* Container for Year, Adulthood rating, Runtime, Score */}
      <View className="flex-row items-center gap-3 mb-2">
        <Text className="text-light-100 text-sm font-semibold">
          {movie.release_date?.split("-")[0]}
        </Text>
        <Text className="text-light-100 text-sm font-semibold">
          {movie.adult ? "18+" : "PG-13"}
        </Text>
        <Text className="text-light-100 text-sm font-semibold">
          {movie.runtime}m
        </Text>
        <View className="flex-row items-center ml-1">
          <FontAwesome name="star" size={14} color={Colors.primary} />
          <Text className="text-white text-sm font-bold ml-1">
            {Math.round(movie.vote_average * 10) / 10}
          </Text>
        </View>
      </View>

      {/* Movie title, utilizing extra large highly tightened typography */}
      <Text
        className="text-white font-black leading-none mb-3"
        style={{ fontSize: 44, letterSpacing: -1 }}
      >
        {movie.title}
      </Text>

      {/* Category/Genre tags */}
      <View className="flex-row flex-wrap gap-2 mb-6">
        {movie.genres?.map((genre) => (
          <View
            key={genre.id}
            className="bg-white/10 px-3 py-1.5 rounded-full border border-white/20"
          >
            <Text className="text-white text-xs font-semibold">
              {genre.name}
            </Text>
          </View>
        ))}
      </View>

      {/* Action Buttons: Play & Trailer */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity
          className="flex-1 h-12 flex-row items-center justify-center rounded-full mr-3"
          style={{ backgroundColor: Colors.primary }}
        >
          <Image source={icons.play} className="size-4 mr-2" tintColor="#000000ff" />
          <Text className="text-black font-bold text-base">Play Now</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 h-12 items-center justify-center rounded-full border border-dark-100 bg-dark-200">
          <Text className="text-white font-semibold text-base">
            Watch Trailer
          </Text>
        </TouchableOpacity>
      </View>

      {/* Narrative overview */}
      <Text className="text-light-200 text-sm leading-6 text-justify mb-8">
        {movie.overview}
      </Text>
    </View>
  );
};

export default MovieInfo;
