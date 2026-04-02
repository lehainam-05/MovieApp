import { Link } from "expo-router";
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
      className="w-full h-[420px] rounded-[30px] overflow-hidden justify-end"
      resizeMode="cover"
    >
      <View className="px-5 pb-6 bg-black/40">
        <Text className="text-white text-4xl font-black uppercase" numberOfLines={2}>
          {movie.title}
        </Text>

        <View className="flex-row mt-3 gap-2">
          <View className="bg-accent/60 px-3 py-1 rounded-md">
            <Text className="text-white text-xs font-semibold">IMDB {rating}</Text>
          </View>
          <View className="bg-dark-200/80 px-3 py-1 rounded-md">
            <Text className="text-white text-xs font-semibold">PG-13</Text>
          </View>
          <View className="bg-dark-200/80 px-3 py-1 rounded-md">
            <Text className="text-white text-xs font-semibold">{releaseYear}</Text>
          </View>
        </View>

        <View className="flex-row gap-3 mt-5">
          <Link href={`/movie/${movie.id}`} asChild>
            <TouchableOpacity className="bg-accent rounded-2xl px-8 py-4 flex-row items-center">
              <Text className="text-white text-lg mr-2">▶</Text>
              <Text className="text-black text-xl font-semibold">Watch Now</Text>
            </TouchableOpacity>
          </Link>

          <Link href={`/movie/${movie.id}`} asChild>
            <TouchableOpacity className="bg-dark-200/95 border border-dark-100 rounded-2xl px-7 py-4">
              <Text className="text-white text-xl font-semibold">ⓘ Info</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HeroBanner;
