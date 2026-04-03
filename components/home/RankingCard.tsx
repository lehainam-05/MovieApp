import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/colors";

interface RankingCardProps {
  movie: Movie;
  index: number;
}

const RankingCard = ({ movie, index }: RankingCardProps) => {
  return (
    <Link href={`/movie/${movie.id}`} asChild>
      <TouchableOpacity
        className="relative"
        style={{ width: 150, marginLeft: index === 0 ? 0 : 8 }}
        activeOpacity={0.85}
      >
        {/* Large rank number behind the poster */}
        <Text
          style={{
            position: "absolute",
            left: -14,
            bottom: -8,
            fontSize: 110,
            fontWeight: "900",
            color: "rgba(255,255,255,0.08)",
            zIndex: 10,
            lineHeight: 110,
          }}
        >
          {index + 1}
        </Text>

        {/* Poster image */}
        <View
          className="overflow-hidden ml-4"
          style={{
            width: 136,
            height: 204,
            borderRadius: 22,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.1)",
          }}
        >
          <Image
            source={{
              uri: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://placehold.co/500x750/1a1a1a/FFFFFF.png",
            }}
            className="w-full h-full"
            resizeMode="cover"
          />

          {/* Rating badge */}
          <View
            className="absolute top-2 right-2 px-2 py-1 rounded"
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.1)",
            }}
          >
            <Text className="text-white font-bold" style={{ fontSize: 9 }}>
              PĐ.{movie.vote_average?.toFixed(1) ?? "N/A"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default RankingCard;
