import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface RankingCardProps {
  movie: Movie;
  index: number;
}

const RankingCard = ({ movie, index }: RankingCardProps) => {
  return (
    <Link href={`/movie/${movie.id}`} asChild>
      <TouchableOpacity activeOpacity={0.9} className="w-40 relative">
        <Text className="absolute -left-2 bottom-3 text-white/18 text-7xl font-black z-10">
          {index + 1}
        </Text>
        <Image
          source={{
            uri: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://placehold.co/500x750/1a1a1a/FFFFFF.png",
          }}
          className="w-40 h-56 rounded-[22px]"
          resizeMode="cover"
        />
        <LinearGradient
          colors={["#9D50BB", "#C084FC"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="absolute top-2 right-2 px-2 py-1 rounded-lg"
        >
          <Text className="text-[#150f22] text-xs font-extrabold">PD {movie.vote_average.toFixed(1)}</Text>
        </LinearGradient>
        <View className="absolute inset-0 rounded-[22px] border border-white/10" />
      </TouchableOpacity>
    </Link>
  );
};

export default RankingCard;
