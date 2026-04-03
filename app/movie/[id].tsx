/**
 * app/movie/[id].tsx
 *
 * @purpose Trang Controller (Điều khiển hiển thị chính) cho giao diện Chi Tiết Bộ Phim.
 * @why Bằng việc đẩy DOM UI xuống các component con, file này tuân thủ chặt Nguyên Tắc Đơn Nhiệm 
 *      (Single Responsibility): Gánh trách nhiệm phân giải parameter, xử lý mượt mà toạ độ cuộn lưới
 *      cho Animation Header, và giải quyết Data theo trạng thái API mà không dính líu chi tiết CSS.
 */

import { useState, useCallback } from "react";
import { View, ActivityIndicator, ScrollView, Platform, NativeSyntheticEvent, NativeScrollEvent, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { Colors } from "@/constants/colors";
import useFetch from "@/hooks/useFetch";
import { fetchMovieDetails, fetchMovieCast, fetchSimilarMovies } from "@/services/api";

import StickyHeader from "@/components/common/StickyHeader";
import HeroBackdrop from "@/components/common/HeroBackdrop";
import Footer from "@/components/common/Footer";
import MovieInfo from "@/components/movie_detail/MovieInfo";
import MovieCastList from "@/components/movie_detail/MovieCastList";
import MovieSimilarList from "@/components/movie_detail/MovieSimilarList";

const MovieDetail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Mảng xử lý Data Layer: tách riêng với UI/Component logic
  const { data: movie, loading: loadingMovie } = useFetch(() =>
    fetchMovieDetails(id as string)
  );
  const { data: cast, loading: loadingCast } = useFetch(() =>
    fetchMovieCast(id as string)
  );
  const { data: similarMovies, loading: loadingSimilar } = useFetch(() =>
    fetchSimilarMovies(id as string)
  );

  const [scrolled, setScrolled] = useState(false);

  /**
   * Tính toán cờ `scrolled` dựa trên tọa độ Y để thay đổi background thanh Header thành thuỷ tinh mờ (glassmorphism)
   */
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      setScrolled(offsetY > 10);
    },
    []
  );

  const handleActorPress = (actorId: number) => {
    router.push(`/actor/${actorId}` as any);
  };

  /**
   * Trạng thái tải: Hiện Indicator khi đang đợi dữ liệu API
   */
  if (loadingMovie) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: Colors.background }}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // Trường hợp hi hữu tải thất bại
  if (!movie) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "white" }}>Movie not found.</Text>
      </View>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : "https://via.placeholder.com/1280";

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StickyHeader
        scrolled={scrolled}
        onBackPress={router.back}
        titleNode={
          <Text
            className="font-black uppercase"
            style={{
              fontSize: 24,
              letterSpacing: -1.5,
              color: Colors.primary,
              marginTop: 2,
            }}
          >
            CINEMA
          </Text>
        }
        rightNode={
          <>
            <View
              className="rounded-full overflow-hidden"
              style={{ 
                width: 34, 
                height: 34, 
                backgroundColor: Colors.surfaceContainerHigh, 
                justifyContent: "center", 
                alignItems: "center", 
                borderWidth: 2, 
                borderColor: "rgba(224,142,254,0.2)",
                marginLeft: 8
              }}
            >
              <Text style={{ fontSize: 16 }}>👤</Text>
            </View>
          </>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
          paddingTop: Platform.OS === "ios" ? 100 : 80,
        }}
        bounces={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <HeroBackdrop imageUrl={backdropUrl} height={600} />

        <MovieInfo movie={movie} />

        {loadingCast ? (
          <ActivityIndicator color={Colors.primary} className="my-10" />
        ) : (
          <MovieCastList cast={cast || []} onActorPress={handleActorPress} />
        )}

        {loadingSimilar ? (
          <ActivityIndicator color={Colors.primary} className="my-10" />
        ) : (
          <MovieSimilarList movies={similarMovies || []} />
        )}

        <Footer />
      </ScrollView>
    </View>
  );
};

export default MovieDetail;
