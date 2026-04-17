/**
 * components/movies/MovieGridCard.tsx
 *
 * @purpose Thẻ phim dành riêng cho hệ thống phân trang chia Lưới (Grid).
 * @why Thẻ MoviePosterCard mặc định bị fix cứng width=150px, nên khi nhét vào 
 *      danh sách 2 cột nó sẽ bị lệch. Thẻ này dùng flex-1 để tự co dãn chiếm đủ 50% màn hình.
 */
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/colors";

interface MovieGridCardProps {
  movie: Movie;
}

const MovieGridCard = ({ movie }: MovieGridCardProps) => {
  const rating = movie.vote_average?.toFixed(1) ?? "N/A";
  const year = movie.release_date?.split("-")[0] ?? "N/A";

  return (
    <Link href={`/movie/${movie.id}`} asChild>
      <TouchableOpacity
        className="flex-1 m-2"
        activeOpacity={0.85}
      >
        <View
          className="w-full overflow-hidden mb-3"
          style={{
            aspectRatio: 3 / 4,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.05)",
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

          {/* Badge Rating đè lên ảnh */}
          <View
            className="absolute bottom-2 left-2 px-2 py-1 rounded flex-row items-center gap-1"
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          >
            <Text className="text-primary" style={{ fontSize: 10 }}>★</Text>
            <Text
              className="text-white font-bold"
              style={{ fontSize: 10 }}
            >
              {rating}
            </Text>
          </View>
        </View>

        <Text
          className="text-white font-bold"
          style={{ fontSize: 14 }}
          numberOfLines={1}
        >
          {movie.title}
        </Text>

        <Text
          className="text-on-surface-variant uppercase font-medium mt-1"
          style={{ fontSize: 11, letterSpacing: 1 }}
        >
          {year} • {movie.original_language || "N/A"}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieGridCard;
