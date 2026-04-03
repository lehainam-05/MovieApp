// HeroBanner: banner lớn ở đầu screen, hiển thị phim nổi bật.
// Input: movie (data phim), totalDots, activeDot để tạo chỉ báo trang.
// Output: ảnh nền, thông tin cơ bản, nút Watch Now/Info và các dot ngang.
import { View, Text, ImageBackground, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Colors } from "@/constants/colors";

interface HeroBannerProps {
  movie: Movie;
  /** Tổng số dấu chấm trong thanh phân trang */
  totalDots?: number;
  /** Chỉ số dot đang active (0-based) */
  activeDot?: number;
}

// Lấy kích thước màn hình để xác định chiều cao tùy biến
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const HeroBanner = ({ movie, totalDots = 5, activeDot = 0 }: HeroBannerProps) => {
  // Lấy năm phát hành từ release_date, nếu không có thì N/A
  const releaseYear = movie.release_date?.split("-")[0] ?? "N/A";
  // Lấy rating thành số 1 chữ số, nếu không hợp lệ thì N/A
  const rating = Number.isFinite(movie.vote_average)
    ? movie.vote_average.toFixed(1)
    : "N/A";

  return (
    <View>
      {/* Banner image */}
      <View className="w-full rounded-[28px] overflow-hidden" style={{ height: SCREEN_WIDTH * 1.15 }}>
        <ImageBackground
          source={{
            uri: movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
              : `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          className="w-full h-full"
          resizeMode="cover"
        >
          {/* Gradient đen mờ ở phía trên để chữ dễ đọc */}
          <LinearGradient
            colors={["rgba(14,14,14,0.35)", "transparent"]}
            style={{ position: "absolute", top: 0, left: 0, right: 0, height: 120 }}
          />

          {/* Gradient đậm ở phía dưới để nội dung nổi bật */}
          <LinearGradient
            colors={["transparent", "rgba(14,14,14,0.85)", Colors.background]}
            locations={[0.3, 0.7, 1]}
            style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 280 }}
          />

          {/* Nội dung overlay nằm trên ảnh */}
          <View className="flex-1 justify-end items-center pb-8 px-6">
            {/* Tiêu đề phim */}
            <Text
              className="text-white text-center font-black uppercase leading-tight"
              style={{ fontSize: 36, letterSpacing: -1.5 }}
              numberOfLines={3}
            >
              {movie.title}
            </Text>

            {/* Dòng badge bao gồm IMDb score, tuổi và năm */}
            <View className="flex-row items-center mt-4 gap-2">
              <View
                className="px-3 py-1.5 rounded"
                style={{ backgroundColor: "rgba(224,142,254,0.2)", borderWidth: 1, borderColor: "rgba(224,142,254,0.3)" }}
              >
                <Text className="text-white font-bold uppercase" style={{ fontSize: 10, letterSpacing: 1.2 }}>
                  IMDb {rating}
                </Text>
              </View>

              <View
                className="px-3 py-1.5 rounded"
                style={{ backgroundColor: "rgba(31,31,31,0.6)" }}
              >
                <Text className="text-white font-bold uppercase" style={{ fontSize: 10, letterSpacing: 1.2 }}>
                  T16
                </Text>
              </View>

              <View
                className="px-3 py-1.5 rounded"
                style={{ backgroundColor: "rgba(31,31,31,0.6)" }}
              >
                <Text className="text-white font-bold uppercase" style={{ fontSize: 10, letterSpacing: 1.2 }}>
                  {releaseYear}
                </Text>
              </View>
            </View>

            {/* Nút hành động */}
            <View className="flex-row mt-6 gap-3">
              <Link href={`/movie/${movie.id}`} asChild>
                <TouchableOpacity
                  className="flex-row items-center px-8 py-4 rounded-2xl"
                  style={{
                    backgroundColor: Colors.primary,
                    shadowColor: Colors.primary,
                    shadowOffset: { width: 0, height: 12 },
                    shadowOpacity: 0.35,
                    shadowRadius: 20,
                    elevation: 12,
                  }}
                  activeOpacity={0.85}
                >
                  <Text className="mr-2 text-lg" style={{ color: Colors.onPrimary }}>
                    ▶
                  </Text>
                  <Text className="font-bold text-base" style={{ color: Colors.onPrimary }}>
                    Watch Now
                  </Text>
                </TouchableOpacity>
              </Link>

              <Link href={`/movie/${movie.id}`} asChild>
                <TouchableOpacity
                  className="flex-row items-center px-6 py-4 rounded-2xl"
                  style={{
                    backgroundColor: "rgba(31,31,31,0.6)",
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.1)",
                  }}
                  activeOpacity={0.85}
                >
                  <Text className="text-white font-bold text-base">ⓘ Info</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* Dấu chấm phân trang */}
      <View className="flex-row justify-center items-center mt-5 gap-2">
        {Array.from({ length: totalDots }).map((_, i) => (
          <View
            key={i}
            style={{
              width: i === activeDot ? 32 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: i === activeDot ? Colors.primary : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default HeroBanner;
