import { Link } from "expo-router";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
      className="w-full h-[470px] rounded-[30px] overflow-hidden justify-end bg-[#15151f]"
      resizeMode="cover"
    >
      <View className="px-5 pb-5 pt-12 bg-black/45">
        <Text className="text-white text-5xl leading-[52px] font-black uppercase" numberOfLines={2}>
          {movie.title}
        </Text>

        <View className="flex-row mt-3 gap-2">
          <View className="bg-[#b763ff]/80 px-3 py-1 rounded-md">
            <Text className="text-[#efe3ff] text-xs font-semibold">IMDB {rating}</Text>
          </View>
          <View className="bg-black/50 px-3 py-1 rounded-md">
            <Text className="text-white text-xs font-semibold">1:16</Text>
          </View>
          <View className="bg-black/50 px-3 py-1 rounded-md">
            <Text className="text-white text-xs font-semibold">{releaseYear}</Text>
          </View>
        </View>

        <View className="flex-row gap-3 mt-5">
          <Link href={`/movie/${movie.id}`} asChild>
            <TouchableOpacity className="bg-[#d770ff] rounded-3xl px-7 py-4 flex-1 flex-row items-center justify-center">
              <Ionicons name="play" size={16} color="#1d1022" />
              <Text className="text-[#1d1022] text-xl ml-2 font-bold">Watch Now</Text>
            </TouchableOpacity>
          </Link>

          <Link href={`/movie/${movie.id}`} asChild>
            <TouchableOpacity className="bg-[#17181f] border border-[#262836] rounded-3xl px-7 py-4 flex-1 flex-row items-center justify-center">
              <Ionicons name="information-circle" size={18} color="#ffffff" />
              <Text className="text-white text-xl ml-2 font-bold">Info</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HeroBanner;
