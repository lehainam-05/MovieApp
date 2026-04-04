/**
 * components/home/HeroBanner.tsx
 *
 * @purpose Hiển thị thanh Banner quảng cáo khổng lồ chạy ngang đầu trang chủ (Hiển thị phim Top Trending).
 * @why Carousel (cuộn ngang) giúp tiết kiệm diện tích màn hình điện thoại mà vẫn đập ngay vào mắt 
 *      người dùng những bộ phim cháy khách nhất hiện tại.
 */
import { View, Text, ImageBackground, TouchableOpacity, Dimensions, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Colors } from "@/constants/colors";

interface HeroBannerProps {
  movie: Movie;
}

// Lấy kích thước màn hình để xác định chiều cao tùy biến
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const HeroBanner = ({ movie }: HeroBannerProps) => {
  // Lấy năm phát hành từ release_date, nếu không có thì N/A
  const releaseYear = movie.release_date?.split("-")[0] ?? "N/A";
  // Lấy rating thành số 1 chữ số, nếu không hợp lệ thì N/A
  const rating = Number.isFinite(movie.vote_average)
    ? movie.vote_average.toFixed(1)
    : "N/A";

  // Limit width and height on Web so it doesn't stretch and crop the poster drastically
  const isWeb = Platform.OS === "web";
  const itemWidth = isWeb ? Math.min(SCREEN_WIDTH, 500) : SCREEN_WIDTH;
  const bannerHeight = itemWidth * 1.15;

  return (
    <View className="w-full items-center">
      {/* Banner image */}
      <View 
        className="w-full rounded-[28px] overflow-hidden" 
        style={{ 
          height: bannerHeight, 
          maxWidth: isWeb ? 500 : "100%",
        }}
      >
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
                <Text className="text-primary-dim font-bold uppercase" style={{ fontSize: 10, letterSpacing: 1.2 }}>
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
                    XEM NGAY
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
                  <Text className="text-white font-bold text-base">ⓘ CHI TIẾT</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default HeroBanner;
