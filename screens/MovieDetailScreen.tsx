/**
 * screens/MovieDetailScreen.tsx
 *
 * @purpose Trang Chi Tiết Bộ Phim — chứa toàn bộ UI + logic hiển thị.
 * @why Tách toàn bộ ra khỏi Router `app/movie/[id].tsx`.
 *      Router chỉ đóng vai trò Entry Point truyền params vào.
 */
import { useState, useCallback } from "react";
import { View, ActivityIndicator, ScrollView, Platform, NativeSyntheticEvent, NativeScrollEvent, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/colors";
import useFetch from "@/hooks/useFetch";
import { fetchMovieDetails, fetchMovieCast, fetchSimilarMovies } from "@/services/api";

import StickyHeader from "@/components/common/StickyHeader";
import HeroBackdrop from "@/components/common/HeroBackdrop";
import Footer from "@/components/common/Footer";
import MovieInfo from "@/components/movie_detail/MovieInfo";
import MovieCastList from "@/components/movie_detail/MovieCastList";
import MovieSimilarList from "@/components/movie_detail/MovieSimilarList";
import { useWatchlist } from "@/store/WatchlistContext";

const MovieDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { isSaved, toggleWatchlist } = useWatchlist();

  // Data Layer: tách riêng với UI
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

  if (!movie) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "white" }}>Không tìm thấy phim.</Text>
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
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={() => {
                const movieToSave: Movie = {
                  id: movie.id,
                  title: movie.title,
                  poster_path: movie.poster_path || "",
                  backdrop_path: movie.backdrop_path || "",
                  vote_average: movie.vote_average,
                  release_date: movie.release_date || "",
                  genre_ids: movie.genres?.map(g => g.id) || [],
                  overview: movie.overview || "",
                  adult: movie.adult,
                  original_language: movie.original_language || "en",
                  original_title: movie.original_title || movie.title,
                  popularity: movie.popularity || 0,
                  video: false,
                  vote_count: movie.vote_count || 0,
                };
                toggleWatchlist(movieToSave);
              }} 
              className="mr-3 p-2 bg-black/30 rounded-full"
            >
              <Ionicons name={isSaved(movie.id) ? "heart" : "heart-outline"} size={24} color={isSaved(movie.id) ? "#FF0055" : "white"} />
            </TouchableOpacity>

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
              }}
            >
              <Text style={{ fontSize: 16 }}>👤</Text>
            </View>
          </View>
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

export default MovieDetailScreen;
