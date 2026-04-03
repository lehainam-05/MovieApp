// MoviePosterCard hiển thị poster phim và thông tin nhỏ bên cạnh
// Input: movie object, output: thẻ poster để nhấn chuyển sang chi tiết.
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/colors";

interface MoviePosterCardProps {
  movie: Movie;
}

const MoviePosterCard = ({ movie }: MoviePosterCardProps) => {
  // Tính rating dưới dạng 1 chữ số thập phân
  const rating = movie.vote_average?.toFixed(1) ?? "N/A";
  // Lấy năm phát hành hoặc N/A
  const year = movie.release_date?.split("-")[0] ?? "N/A";

  return (
    <Link href={`/movie/${movie.id}`} asChild>
      <TouchableOpacity
        className="mr-3"
        style={{ width: 150 }}
        activeOpacity={0.85}
      >
        {/* Khung poster */}
        <View
          className="overflow-hidden mb-2"
          style={{
            width: 150,
            height: 225,
            borderRadius: 16,
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

          {/* Badge điểm PĐ */}
          <View
            className="absolute bottom-2 left-2 px-2 py-1 rounded"
            style={{ backgroundColor: "rgba(224,142,254,0.9)" }}
          >
            <Text
              className="font-bold"
              style={{ fontSize: 10, color: Colors.onPrimary }}
            >
              PĐ.{rating}
            </Text>
          </View>
        </View>

        {/* Tiêu đề phim */}
        <Text
          className="text-white font-bold uppercase"
          style={{ fontSize: 13 }}
          numberOfLines={1}
        >
          {movie.title}
        </Text>

        {/* Dòng phụ: rating và năm */}
        <Text
          className="text-on-surface-variant uppercase font-medium mt-0.5"
          style={{ fontSize: 10 }}
        >
          {rating} • {year}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MoviePosterCard;
