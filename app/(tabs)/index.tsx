import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
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
  const router = useRouter();
  const [selectedGenreId, setSelectedGenreId] = useState<number>(ALL_GENRE.id);
  const [scrolled, setScrolled] = useState(false);

  // ─── Data fetching ──────────────────────────────────────
  const { data: genres } = useFetch(fetchGenres);

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

  const { data: usUkMovies, loading: usUkLoading } = useFetch(() =>
    fetchMoviesByRegionLanguage({ region: "US" })
  );

  const { data: asianMovies, loading: asianLoading } = useFetch(() =>
    fetchMoviesByRegionLanguage({ region: "JP", language: "ja" })
  );

  useEffect(() => {
    loadGenreMovies();
  }, [selectedGenreId]);

  // ─── Derived data ───────────────────────────────────────
  const chips: GenreChip[] = useMemo(() => {
    if (!genres || genres.length === 0) return POPULAR_GENRES;
    const mapped = genres.map((g) => ({ id: g.id, name: g.name }));
    return [ALL_GENRE, ...mapped];
  }, [genres]);

  const heroMovie = genreMovies?.[0] ?? null;
  const top10Movies = (genreMovies ?? []).slice(1, 11);
  const isInitialLoading = genreMoviesLoading && !genreMovies;

  // ─── Scroll handler ────────────────────────────────────
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      setScrolled(offsetY > 10);
    },
    []
  );

  // ─── Section header ────────────────────────────────────
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
      {/* ── Sticky Header with Blur ── */}
      <View style={styles.stickyHeader}>
        {scrolled ? (
          <BlurView
            intensity={60}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
        ) : null}

        {/* Background overlay for when not blurred or as fallback */}
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
          {/* CINEMA logo */}
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

          {/* Avatar */}
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

      {/* ── Main Scrollable Content ── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: HEADER_HEIGHT,
          paddingBottom: 120,
        }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Category Chips */}
        <View className="px-5 py-3">
          <CategoryChips
            chips={chips}
            selectedId={selectedGenreId}
            onSelect={setSelectedGenreId}
          />
        </View>

        {/* Loading state */}
        {isInitialLoading ? (
          <ActivityIndicator
            size="large"
            color={Colors.primary}
            style={{ marginTop: 40 }}
          />
        ) : (
          <>
            {/* Hero Banner */}
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
