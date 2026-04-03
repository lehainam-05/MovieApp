// Trang home chính của app.
// Chức năng:
// - Lấy danh sách thể loại và phim từ API
// - Người dùng chọn 1 thể loại => auto load phim tương ứng
// - Hiển thị HeroBanner, top 10, phim US-UK, phim Asia
// - Header bị mờ khi cuộn

import { useEffect, useMemo, useState, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";

import { Colors } from "@/constants/colors";
import { ALL_GENRE, POPULAR_GENRES, GenreChip } from "@/constants/genres";

import useFetch from "@/hooks/useFetch";
import {
  fetchGenres,
  fetchMoviesByGenre,
  fetchMoviesByRegionLanguage,
} from "@/services/api";

import CategoryChips from "@/components/home/CategoryChips";
import HeroBanner from "@/components/home/HeroBanner";
import MoviePosterCard from "@/components/home/MoviePosterCard";
import RankingCard from "@/components/home/RankingCard";

const HEADER_HEIGHT = Platform.OS === "ios" ? 100 : 80;

const Index = () => {
  const router = useRouter(); // có thể dùng router nếu cần navigate để mở chi tiết
  // id thể loại đang chọn, mặc định ALL_GENRE
  const [selectedGenreId, setSelectedGenreId] = useState<number>(ALL_GENRE.id);
  // trạng thái đã cuộn để điều chỉnh header blur
  const [scrolled, setScrolled] = useState(false);

  // ─── Data fetching ──────────────────────────────────────
  // lấy genre list (auto khi render)
  const { data: genres } = useFetch(fetchGenres);

  // lấy phim theo thể loại, fetch tự động khi selectedGenreId đổi (useEffect phía dưới call loadGenreMovies)
  const {
    data: genreMovies,
    loading: genreMoviesLoading,
    refetch: loadGenreMovies,
  } = useFetch(
    () =>
      fetchMoviesByGenre(
        selectedGenreId === ALL_GENRE.id ? undefined : selectedGenreId
      ),
    true
  );

  // lấy phim US-UK (không thay đổi)
  const { data: usUkMovies, loading: usUkLoading } = useFetch(() =>
    fetchMoviesByRegionLanguage({ region: "US" })
  );

  // lấy phim châu Á (JP)
  const { data: asianMovies, loading: asianLoading } = useFetch(() =>
    fetchMoviesByRegionLanguage({ region: "JP", language: "ja" })
  );

  // khi selectedGenreId thay đổi thì load lại danh sách phim tương ứng
  useEffect(() => {
    loadGenreMovies();
  }, [selectedGenreId]);

  // ─── Derived data ───────────────────────────────────────
  // 1) xây chip thể loại để hiển thị từ genre API data
  const chips: GenreChip[] = useMemo(() => {
    if (!genres || genres.length === 0) return POPULAR_GENRES;
    const mapped = genres.map((g) => ({ id: g.id, name: g.name }));
    return [ALL_GENRE, ...mapped];
  }, [genres]);

  // 2) phim đầu tiên dùng cho hero banner
  const heroMovie = genreMovies?.[0] ?? null;
  // 3) top 10 movie danh sách từ thứ 2 đến 11
  const top10Movies = (genreMovies ?? []).slice(1, 11);
  // loading ban đầu khi chưa có dữ liệu
  const isInitialLoading = genreMoviesLoading && !genreMovies;

  // ─── Scroll handler ────────────────────────────────────
  // dùng để set trạng thái scrolled cho header
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      setScrolled(offsetY > 10);
    },
    []
  );

  // ─── Section header ────────────────────────────────────
  // component nhỏ dùng chung cho các section
  const SectionHeader = useCallback(
    ({ title }: { title: string }) => (
      <View className="flex-row justify-between items-center mb-5">
        <Text
          className="text-white font-black uppercase"
          style={{ fontSize: 20, letterSpacing: -0.3 }}
        >
          {title}
        </Text>
        <Text className="text-on-surface-variant text-xl">›</Text>
      </View>
    ),
    []
  );

  // ─── Render ─────────────────────────────────────────────
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      {/* Sticky header cố định trên cùng */}
      <View style={styles.stickyHeader}>
        {scrolled ? (
          <BlurView
            intensity={60}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
        ) : null}

        {/* Overlay nền nếu chưa cuộn hoặc làm mờ khi scrolled */}
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: scrolled
                ? "rgba(14,14,14,0.7)"
                : "transparent",
            },
          ]}
        />

        <View style={styles.headerContent}>
          <Text
            className="font-black uppercase"
            style={{
              fontSize: 24,
              letterSpacing: -1.5,
              color: Colors.primary,
            }}
          >
            CINEMA
          </Text>

          {/* Avatar đơn giản */}
          <View
            className="rounded-full overflow-hidden"
            style={{
              width: 34,
              height: 34,
              borderWidth: 2,
              borderColor: "rgba(224,142,254,0.2)",
              backgroundColor: Colors.surfaceContainerHigh,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}>👤</Text>
          </View>
        </View>
      </View>

      {/* Nội dung chính cuộn */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: HEADER_HEIGHT,
          paddingBottom: 120,
        }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View className="px-5 py-3">
          <CategoryChips
            chips={chips}
            selectedId={selectedGenreId}
            onSelect={setSelectedGenreId}
          />
        </View>

        {isInitialLoading ? (
          <ActivityIndicator
            size="large"
            color={Colors.primary}
            style={{ marginTop: 40 }}
          />
        ) : (
          <>
            {/* Hero Banner gọi component */}
            {heroMovie && (
              <View className="px-5 mt-2 mb-8">
                <HeroBanner movie={heroMovie} />
              </View>
            )}

            {/* Top 10 Today */}
            {top10Movies.length > 0 && (
              <View className="py-6 px-5">
                <SectionHeader title="Top 10 Today" />
                <FlatList
                  horizontal
                  data={top10Movies}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item, index }) => (
                    <RankingCard movie={item} index={index} />
                  )}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingRight: 20 }}
                />
              </View>
            )}

            {/* New US-UK Movies */}
            <View className="py-6 px-5">
              <SectionHeader title="New US-UK Movies" />
              {usUkLoading ? (
                <ActivityIndicator color={Colors.primary} />
              ) : (
                <FlatList
                  horizontal
                  data={(usUkMovies ?? []).slice(0, 10)}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => <MoviePosterCard movie={item} />}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingRight: 20 }}
                />
              )}
            </View>

            {/* New Asian Movies */}
            <View
              className="py-6 px-5"
              style={{ backgroundColor: Colors.black }}
            >
              <SectionHeader title="New Asian Movies" />
              {asianLoading ? (
                <ActivityIndicator color={Colors.primary} />
              ) : (
                <FlatList
                  horizontal
                  data={(asianMovies ?? []).slice(0, 10)}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => <MoviePosterCard movie={item} />}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingRight: 20 }}
                />
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  stickyHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 50,
    overflow: "hidden",
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 50 : 30,
  },
});

export default Index;
