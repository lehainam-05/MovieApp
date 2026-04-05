// Component hiển thị 1 thẻ phim trong lưới
// Khi người dùng nhấn vào thẻ sẽ điều hướng đến trang chi tiết phim.

// Link từ Expo Router để xử lý điều hướng trong app.
import { Link } from "expo-router";
// Text, Image, TouchableOpacity, View là các component cơ bản của React Native.
import { Text, Image, TouchableOpacity, View } from "react-native";

// icons chứa icon được import từ thư mục constants.
import { icons } from "@/constants/icons";

// Component MovieCard nhận props là thông tin phim (Movie type) và trả về UI.
// Input:
// - id: mã phim
// - poster_path: đường dẫn ảnh poster (nếu có)
// - title: tên phim
// - vote_average: điểm đánh giá
// - release_date: ngày phát hành
// Output:
// - JSX hiển thị hình, tên, rating, năm và nhấn chuyển sang màn chi tiết.
const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  // Dùng Link + asChild để làm TouchableOpacity thành link
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              // Nếu không có poster thì dùng ảnh placeholder
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title} {/* Tên phim, chỉ 1 dòng nếu quá dài */}
        </Text>

        {/* Rating dạng sao và điểm */}
        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" style={{ width: 16, height: 16 }} />
          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(vote_average / 2)} {/* Chuyển 10 điểm về 5 sao và làm tròn */}
          </Text>
        </View>

        {/* Dòng phụ chứa năm phát hành và nhãn Movie */}
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0] /* Lấy năm từ ngày YYYY-MM-DD */}
          </Text>
          <Text className="text-xs font-medium text-light-300 uppercase">
            Movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
