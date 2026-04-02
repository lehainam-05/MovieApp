import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface MoviePosterCardProps {
  movie: Movie;
}

const MoviePosterCard = ({ movie }: MoviePosterCardProps) => {
  return (
    <Link href={`/movie/${movie.id}`} asChild>
      <TouchableOpacity className="w-[46%]">
        <Image
          source={{
            uri: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://placehold.co/500x750/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-56 rounded-2xl"
          resizeMode="cover"
        />

        <View className="absolute left-2 bottom-[72px] bg-accent/90 px-2 py-1 rounded-md">
          <Text className="text-black text-[10px] font-bold">
            PD.{movie.vote_average.toFixed(1)}
          </Text>
        </View>

        <Text className="text-white text-xl font-bold mt-3" numberOfLines={1}>
          {movie.title}
        </Text>
        <Text className="text-light-300 text-sm mt-1">
          {movie.vote_average.toFixed(1)} • {movie.release_date?.split("-")[0] || "N/A"}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MoviePosterCard;
