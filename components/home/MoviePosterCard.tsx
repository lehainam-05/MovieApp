import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface MoviePosterCardProps {
  movie: Movie;
}

const MoviePosterCard = ({ movie }: MoviePosterCardProps) => {
  return (
    <Link href={`/movie/${movie.id}`} asChild>
      <TouchableOpacity className="w-[48%]">
        <Image
          source={{
            uri: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://placehold.co/500x750/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-60 rounded-2xl"
          resizeMode="cover"
        />

        <View className="absolute left-2 bottom-[80px] bg-[#d772ff] px-2 py-1 rounded-md">
          <Text className="text-[#130b1b] text-[10px] font-extrabold">
            PD.{movie.vote_average.toFixed(1)}
          </Text>
        </View>

        <Text className="text-white text-xl font-black mt-3 uppercase" numberOfLines={1}>
          {movie.title}
        </Text>
        <Text className="text-[#b4b5bf] text-sm mt-1 uppercase">
          {movie.vote_average.toFixed(1)} • {movie.release_date?.split("-")[0] || "N/A"}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MoviePosterCard;
