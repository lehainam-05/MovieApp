import { Link } from "expo-router";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { colors } from "@/constants/colors";

interface HeroBannerProps {
  movie: Movie;
}

const HeroBanner = ({ movie }: HeroBannerProps) => {
  const releaseYear = movie.release_date?.split("-")[0] ?? "N/A";
  const rating = Number.isFinite(movie.vote_average)
    ? movie.vote_average.toFixed(1)
    : "N/A";

  return (
    <ImageBackground
      source={{
        uri: movie.backdrop_path
          ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
          : "https://placehold.co/800x450/161622/FFFFFF.png",
      }}
      className="w-full h-[420px] rounded-[30px] overflow-hidden justify-end"
      resizeMode="cover"
    >
      <LinearGradient colors={colors.gradient.cardOverlay} style={{ paddingHorizontal: 20, paddingBottom: 24 }}>
        <Text className="text-white text-4xl font-black uppercase" numberOfLines={2}>
          {movie.title}
        </Text>

        <View className="flex-row mt-3 gap-2">
          <View className="bg-accent/70 px-3 py-1 rounded-md">
            <Text className="text-white text-xs font-semibold">IMDB {rating}</Text>
          </View>
          <View className="bg-dark-200/90 px-3 py-1 rounded-md">
            <Text className="text-white text-xs font-semibold">T16</Text>
          </View>
          <View className="bg-dark-200/90 px-3 py-1 rounded-md">
            <Text className="text-white text-xs font-semibold">{releaseYear}</Text>
          </View>
        </View>

        <View className="flex-row gap-3 mt-5">
          <Link href={`/movie/${movie.id}`} asChild>
            <TouchableOpacity>
              <LinearGradient
                colors={colors.gradient.chip}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ borderRadius: 16, paddingHorizontal: 30, paddingVertical: 16, flexDirection: "row", alignItems: "center" }}
              >
                <Text className="text-white text-lg mr-2">▶</Text>
                <Text className="text-secondary text-2xl font-semibold">Watch Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Link>

          <Link href={`/movie/${movie.id}`} asChild>
            <TouchableOpacity className="bg-dark-200/95 border border-[#31344A] rounded-2xl px-7 py-4">
              <Text className="text-white text-xl font-semibold">ⓘ Info</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default HeroBanner;
