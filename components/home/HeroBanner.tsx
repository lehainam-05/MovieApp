import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

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
      className="w-full h-[460px] rounded-[34px] overflow-hidden justify-end"
      resizeMode="cover"
    >
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.55)", "rgba(0,0,0,0.88)"]}
        locations={[0.2, 0.58, 1]}
        className="absolute inset-0"
      />

      <View className="px-6 pb-7">
        <Text className="text-white text-[42px] leading-[48px] font-black uppercase" numberOfLines={2}>
          {movie.title}
        </Text>

        <View className="flex-row mt-4 gap-2">
          <View className="bg-[#9D50BB]/70 px-3 py-1.5 rounded-full border border-white/15">
            <Text className="text-white text-[11px] font-semibold">IMDB {rating}</Text>
          </View>
          <View className="bg-black/35 px-3 py-1.5 rounded-full border border-white/20">
            <Text className="text-white text-[11px] font-semibold">T16</Text>
          </View>
          <View className="bg-black/35 px-3 py-1.5 rounded-full border border-white/20">
            <Text className="text-white text-[11px] font-semibold">{releaseYear}</Text>
          </View>
        </View>

        <View className="flex-row gap-3 mt-6">
          <Link href={`/movie/${movie.id}`} asChild>
            <TouchableOpacity activeOpacity={0.9} className="flex-1 rounded-[18px] overflow-hidden">
              <LinearGradient
                colors={["#9D50BB", "#AB57AC", "#C084FC"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="px-5 py-4 flex-row items-center justify-center"
              >
                <Ionicons name="play" size={16} color="#0f0b17" />
                <Text className="text-[#100c1a] text-xl font-extrabold ml-2">Watch Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Link>

          <Link href={`/movie/${movie.id}`} asChild>
            <TouchableOpacity
              activeOpacity={0.9}
              className="flex-1 bg-white/10 border border-white/15 rounded-[18px] px-5 py-4 flex-row items-center justify-center"
            >
              <Ionicons name="information-circle" size={18} color="#FFFFFF" />
              <Text className="text-white text-xl font-semibold ml-2">Info</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HeroBanner;
