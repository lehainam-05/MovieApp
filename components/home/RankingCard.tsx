import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface RankingCardProps {
  movie: Movie;
  index: number;
}

const RankingCard = ({ movie, index }: RankingCardProps) => {
  return (
    <Link href={`/movie/${movie.id}`} asChild>
      <TouchableOpacity className="w-40 relative">
        <Text className="absolute -left-2 bottom-4 text-white/20 text-7xl font-black z-10">
          {index + 1}
        </Text>
        <Image
          source={{
            uri: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://placehold.co/500x750/1a1a1a/FFFFFF.png",
          }}
          className="w-40 h-56 rounded-3xl"
          resizeMode="cover"
        />
        <View className="absolute top-2 right-2 bg-accent/90 px-2 py-1 rounded-md">
          <Text className="text-black text-xs font-semibold">
            PD.{movie.vote_average.toFixed(1)}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default RankingCard;
