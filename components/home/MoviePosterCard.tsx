import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface MoviePosterCardProps {
  movie: Movie;
}

const MoviePosterCard = ({ movie }: MoviePosterCardProps) => {
  return (
    <Link href={`/movie/${movie.id}`} asChild>
      <TouchableOpacity className="w-[47%]" activeOpacity={0.9}>
        <View className="rounded-[20px] overflow-hidden relative">
          <Image
            source={{
              uri: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://placehold.co/500x750/1a1a1a/FFFFFF.png",
            }}
            className="w-full h-56"
            resizeMode="cover"
          />
          <View className="absolute inset-0 border border-white/10 rounded-[20px]" />

          <LinearGradient
            colors={["#C4534D", "#AB57AC"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="absolute left-2.5 bottom-2.5 px-2 py-1 rounded-md"
          >
            <Text className="text-white text-[10px] font-bold">PD {movie.vote_average.toFixed(1)}</Text>
          </LinearGradient>
        </View>

        <Text className="text-white text-lg font-extrabold mt-3" numberOfLines={1}>
          {movie.title}
        </Text>
        <Text className="text-white/65 text-xs mt-1">
          {movie.vote_average.toFixed(1)} • {movie.release_date?.split("-")[0] || "N/A"}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MoviePosterCard;
