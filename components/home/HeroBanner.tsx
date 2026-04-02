import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
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
      className="w-full h-[430px] rounded-[34px] overflow-hidden justify-end"
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(8,8,20,0.05)", "rgba(10,10,24,0.65)", "rgba(6,6,16,0.95)"]}
        className="px-5 pb-6 pt-20"
      >
        <Text className="text-white text-4xl font-black uppercase text-center" numberOfLines={2}>
          {movie.title}
        </Text>

        <View className="flex-row mt-3 gap-2 justify-center">
          <View className="bg-accent/80 px-3 py-1 rounded-md">
            <Text className="text-black text-xs font-semibold">IMDB {rating}</Text>
          </View>
          <View className="bg-dark-200/90 px-3 py-1 rounded-md">
            <Text className="text-white text-xs font-semibold">PG-13</Text>
          </View>
          <View className="bg-dark-200/90 px-3 py-1 rounded-md">
            <Text className="text-white text-xs font-semibold">{releaseYear}</Text>
          </View>
        </View>

        <View className="flex-row gap-3 mt-6">
          <Link href={`/movie/${movie.id}`} asChild>
            <TouchableOpacity className="rounded-2xl overflow-hidden">
              <LinearGradient
                colors={["#C96CFF", "#8B5CF6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="px-8 py-4 flex-row items-center"
              >
                <Text className="text-white text-lg mr-2">▶</Text>
                <Text className="text-white text-xl font-semibold">Watch Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Link>

          <Link href={`/movie/${movie.id}`} asChild>
            <TouchableOpacity className="bg-dark-200/95 border border-dark-100 rounded-2xl px-7 py-4">
              <Text className="text-white text-xl font-semibold">ⓘ Info</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default HeroBanner;
