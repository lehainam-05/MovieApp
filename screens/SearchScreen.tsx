/**
 * screens/SearchScreen.tsx
 *
 * @purpose Trang Tìm Kiếm — thiết kế Premium với Popular Keywords + Recommended Grid.
 * @why Khi chưa tìm kiếm: hiển thị Từ Khoá Phổ Biến + Gợi Ý Cho Bạn (phim trending).
 *      Khi đang tìm: hiển thị kết quả dạng lưới 2 cột.
 */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Colors } from "@/constants/colors";
import useFetch from "@/hooks/useFetch";
import { fetchMovies, fetchGenres } from "@/services/api";
import { updateSearchCount, getTrendingMovies } from "@/services/trendingService";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_GAP = 12;
const CARD_WIDTH = (SCREEN_WIDTH - 40 - CARD_GAP) / 2;

/** Từ khoá mặc định khi chưa có dữ liệu trending */
const DEFAULT_KEYWORDS = ["Hành Động", "Kinh Dị", "Khoa Học Viễn Tưởng"];

const SearchScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // ── Genre map để hiển thị tên thể loại ─────────────────
  const { data: genres } = useFetch(fetchGenres);
  const genreMap = useMemo(() => {
    const map: Record<number, string> = {};
    (genres ?? []).forEach((g) => {
      map[g.id] = g.name;
    });
    return map;
  }, [genres]);

  // ── Trending khi chưa tìm (lấy từ JSON Server) ─────────
  const {
    data: trendingMovies,
    loading: trendingLoading,
    refetch: refetchTrending,
  } = useFetch(getTrendingMovies);

  // Từ khoá phổ biến — lấy từ dữ liệu trending thực tế
  const popularKeywords = useMemo(() => {
    if (!trendingMovies || trendingMovies.length === 0) return DEFAULT_KEYWORDS;
    return (trendingMovies as TrendingMovie[]).map((m) => m.searchTerm);
  }, [trendingMovies]);

  // ── Kết quả tìm kiếm ──────────────────────────────────
  const {
    data: searchResults = [],
    loading: searchLoading,
    refetch: loadSearch,
    reset: resetSearch,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  // Debounced search — chỉ gọi API tìm kiếm
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        loadSearch();
      } else {
        resetSearch();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Tracking — ghi nhận lượt tìm khi có kết quả trả về, rồi cập nhật lại trending
  useEffect(() => {
    if (searchQuery.trim() && searchResults && searchResults.length > 0) {
      updateSearchCount(searchQuery, searchResults[0] as Movie).then(() => {
        refetchTrending();
      });
    }
  }, [searchResults]);

  const handleKeywordPress = (keyword: string) => {
    setSearchQuery(keyword);
  };

  const getGenreLabel = (movie: Movie): string => {
    if (movie.genre_ids?.length > 0 && genreMap[movie.genre_ids[0]]) {
      return genreMap[movie.genre_ids[0]];
    }
    return "Phim";
  };

  const getYear = (movie: Movie): string => {
    return movie.release_date?.split("-")[0] || "";
  };

  // ── Phim Featured (đầu tiên của trending từ JSON Server) ──
  const featuredMovie = (trendingMovies ?? [])[0] as TrendingMovie | undefined;
  const gridMovies = ((trendingMovies ?? []) as TrendingMovie[]).slice(1, 5);

  // ── Hàm render 1 card kết quả tìm kiếm ────────────────
  const renderSearchResultCard = useCallback(
    ({ item: movie }: { item: Movie }) => (
      <TouchableOpacity
        style={styles.gridCard}
        activeOpacity={0.8}
        onPress={() => router.push(`/movie/${movie.id}`)}
      >
        <Image
          source={{
            uri: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://placehold.co/300x450/1C1C1E/666.png?text=No+Image",
          }}
          style={styles.gridCardImage}
          resizeMode="cover"
        />
        {/* Overlay gradient */}
        <View style={styles.gridCardOverlay} />
        <View style={styles.gridCardInfo}>
          <Text style={styles.gridCardTitle} numberOfLines={1}>
            {movie.title}
          </Text>
          <Text style={styles.gridCardMeta}>
            {getGenreLabel(movie)} • {getYear(movie)}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [genreMap]
  );

  // ── Idle State: Popular Keywords + Recommended ──────────
  const renderIdleContent = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      {/* Popular Keywords */}
      <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
        <Text style={styles.sectionLabel}>TỪ KHOÁ PHỔ BIẾN</Text>
        <View style={styles.chipsRow}>
          {popularKeywords.map((kw) => (
            <TouchableOpacity
              key={kw}
              style={styles.chip}
              activeOpacity={0.7}
              onPress={() => handleKeywordPress(kw)}
            >
              <Text style={styles.chipText}>{kw}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recommended for You */}
      <View style={{ paddingHorizontal: 20, marginTop: 32 }}>
        <Text style={styles.recommendedTitle}>Gợi Ý Cho Bạn</Text>
      </View>

      {trendingLoading ? (
        <ActivityIndicator
          color={Colors.primary}
          size="large"
          style={{ marginTop: 40 }}
        />
      ) : (
        <>
          {/* Featured Card — phim trending #1 từ JSON Server */}
          {featuredMovie && (
            <TouchableOpacity
              style={styles.featuredCard}
              activeOpacity={0.85}
              onPress={() => router.push(`/movie/${featuredMovie.movie_id}`)}
            >
              <Image
                source={{ uri: featuredMovie.poster_url }}
                style={styles.featuredImage}
                resizeMode="cover"
              />
              <View style={styles.featuredOverlay} />
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredLabel}>🔥 ĐANG THỊNH HÀNH</Text>
                <Text style={styles.featuredName}>
                  {featuredMovie.title?.toUpperCase()}
                </Text>
                <Text style={styles.featuredDesc} numberOfLines={1}>
                  Đã được tìm {featuredMovie.count} lần - "{featuredMovie.searchTerm}"
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {/* 2x2 Grid */}
          <View style={styles.gridContainer}>
            {gridMovies.map((movie, index) => {
              // Hàng đầu: card trái thấp, card phải cao. Hàng dưới ngược lại.
              const isLeftColumn = index % 2 === 0;
              const isFirstRow = index < 2;
              const cardHeight =
                isFirstRow
                  ? isLeftColumn
                    ? 160
                    : 200
                  : isLeftColumn
                    ? 200
                    : 160;

              return (
                <TouchableOpacity
                  key={movie.movie_id}
                  style={[styles.gridCard, { height: cardHeight }]}
                  activeOpacity={0.8}
                  onPress={() => router.push(`/movie/${movie.movie_id}`)}
                >
                  <Image
                    source={{ uri: movie.poster_url }}
                    style={styles.gridCardImage}
                    resizeMode="cover"
                  />
                  <View style={styles.gridCardOverlay} />
                  <View style={styles.gridCardInfo}>
                    <Text style={styles.gridCardTitle} numberOfLines={1}>
                      {movie.title}
                    </Text>
                    <Text style={styles.gridCardMeta}>
                      {movie.count} lượt tìm
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}
    </ScrollView>
  );

  // ── Search Results State ────────────────────────────────
  const renderSearchResults = () => (
    <FlatList
      data={searchResults as Movie[]}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120, paddingTop: 16 }}
      columnWrapperStyle={{ gap: CARD_GAP, marginBottom: CARD_GAP }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.recommendedTitle}>
            Kết quả cho <Text style={{ color: Colors.primary }}>"{searchQuery}"</Text>
          </Text>
        </View>
      }
      renderItem={renderSearchResultCard}
      ListEmptyComponent={
        !searchLoading ? (
          <View style={{ alignItems: "center", paddingTop: 60 }}>
            <Ionicons name="search-outline" size={48} color="#333" />
            <Text style={{ color: "#666", fontSize: 14, marginTop: 16, textAlign: "center" }}>
              Không tìm thấy phim nào.{"\n"}Thử từ khoá khác nhé!
            </Text>
          </View>
        ) : null
      }
    />
  );

  // ── Main Render ─────────────────────────────────────────
  return (
    <View style={{ flex: 1, backgroundColor: "#0B0B0C" }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>CINEMA</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm đạo diễn, phim, thể loại..."
            placeholderTextColor="#555"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#555" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Loading indicator */}
      {searchLoading && (
        <ActivityIndicator color={Colors.primary} style={{ paddingVertical: 12 }} />
      )}

      {/* Content */}
      {searchQuery.trim() ? renderSearchResults() : renderIdleContent()}
    </View>
  );
};

// ── Styles ─────────────────────────────────────────────────
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 44,
    paddingBottom: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(171,139,255,0.15)",
    borderWidth: 1.5,
    borderColor: "rgba(171,139,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    color: Colors.primary,
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -1.5,
  },
  searchBarContainer: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
  },
  searchInput: {
    flex: 1,
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  sectionLabel: {
    color: "#777",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 14,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  chipText: {
    color: "#ccc",
    fontSize: 12,
    fontWeight: "600",
  },
  recommendedTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  // ── Featured Card ────────────────────
  featuredCard: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    overflow: "hidden",
    height: 220,
    position: "relative",
  },
  featuredImage: {
    width: "100%",
    height: "100%",
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
    // Gradient giả bằng overlay
  },
  featuredInfo: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  featuredLabel: {
    color: Colors.primary,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 6,
  },
  featuredName: {
    color: "white",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  featuredDesc: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "500",
  },
  // ── 2x2 Grid ────────────────────────
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: CARD_GAP,
    marginTop: 16,
  },
  gridCard: {
    width: CARD_WIDTH,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    height: 180,
  },
  gridCardImage: {
    width: "100%",
    height: "100%",
  },
  gridCardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  gridCardInfo: {
    position: "absolute",
    bottom: 14,
    left: 14,
    right: 14,
  },
  gridCardTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 2,
  },
  gridCardMeta: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 11,
    fontWeight: "600",
  },
});

export default SearchScreen;
