/**
 * app/(tabs)/movies.tsx
 *
 * @purpose Trang "Explore Library" - chứa kho phim khổng lồ dưới định dạng Grid.
 * @why Có hệ thống phân bộ lọc Tên thể loại (ALL, ACTION) và phân trang (LOAD MORE) để 
 *      người dùng có thể lướt miết không chán.
 */
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { BlurView } from "expo-blur";
import { Colors } from "@/constants/colors";

import { ALL_GENRE, POPULAR_GENRES, GenreChip } from "@/constants/genres";
import { fetchGenres, fetchMoviesByGenre } from "@/services/api";
import useFetch from "@/hooks/useFetch";

import CategoryChips from "@/components/home/CategoryChips";
import MovieGridCard from "@/components/explore/MovieGridCard";

const HEADER_HEIGHT = Platform.OS === "ios" ? 100 : 80;

const MoviesTab = () => {
  // --- States quản lý dữ liệu và bộ lọc ---
  const [selectedGenreId, setSelectedGenreId] = useState<number>(ALL_GENRE.id);
  // Sort theo Tên độ hot hoặc Ngày cực tươi
  const [sortBy, setSortBy] = useState<"popularity.desc" | "primary_release_date.desc" | "vote_average.desc">("popularity.desc");
  const [isSortOpen, setIsSortOpen] = useState(false); // Quản lý trạng thái mở Dropdown

  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAppending, setIsAppending] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false); // Theo dõi mức độ lướt

  // Lấy list categories động từ API
  const { data: genres } = useFetch(fetchGenres);
  const chips: GenreChip[] = useMemo(() => {
    if (!genres || genres.length === 0) return POPULAR_GENRES;
    const mapped = genres.map((g) => ({ id: g.id, name: g.name }));
    return [ALL_GENRE, ...mapped];
  }, [genres]);

  /**
   * Gọi đò lên TMDB để bốc phim về.
   */
  const loadData = async (reset: boolean = false) => {
    if (reset) {
      setIsLoading(true);
      setPage(1);
      setMovies([]); // Xoá luồng phim cũ ngay lập tức để lấy chỗ cho Loading Indicator
    } else {
      setIsAppending(true);
    }

    try {
      const pageToFetch = reset ? 1 : page + 1;
      const results = await fetchMoviesByGenre(
        selectedGenreId === ALL_GENRE.id ? undefined : selectedGenreId,
        pageToFetch,
        sortBy
      );

      if (reset) {
        setMovies(results);
      } else {
        setMovies((prev) => [...prev, ...results]);
        setPage(pageToFetch);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsAppending(false);
    }
  };

  // Kích hoạt nạp dữ liệu khi lỡ chọn Bộ Lọc mới
  useEffect(() => {
    loadData(true);
  }, [selectedGenreId, sortBy]);

  const handleSelectSort = (value: "popularity.desc" | "primary_release_date.desc" | "vote_average.desc") => {
    setSortBy(value);
    setIsSortOpen(false); // Đóng menu sau khi chọn
  };
  
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      setScrolled(offsetY > 10);
    },
    []
  );

  // --- Render Sections ---
  const renderHeader = () => (
    <View className="mb-2">
      {/* Khoảng trống nhường chỗ cho khối Sticky Header cố định */}
      <View style={{ height: 20 }} />

      {/* Cụm Tiêu đề và nút Dropdown Thả Xuống */}
      <View className="px-5 mb-6 flex-row justify-between items-start">
        <View>
          <Text style={{ color: "#9e9eb3", fontSize: 11, fontWeight: "600", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
            Khám phá điện ảnh
          </Text>
          <Text className="text-white font-black" style={{ fontSize: 32, letterSpacing: -1 }}>
            Kho Phim
          </Text>
        </View>

        {/* Khối Dropdown động */}
        <View style={{ backgroundColor: "rgba(255,255,255,0.06)", paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, minWidth: 120, zIndex: 10 }}>
          <TouchableOpacity 
            onPress={() => setIsSortOpen(!isSortOpen)}
            className="flex-row items-center justify-between gap-4"
          >
            <Text style={{ color: "#9e9eb3", fontSize: 11, fontWeight: "600", letterSpacing: 0.5 }}>
              {sortBy === "popularity.desc" ? "LƯỢT THÍCH" : sortBy === "primary_release_date.desc" ? "MỚI NHẤT" : "ĐIỂM CAO"}
            </Text>
            <Text style={{ color: "#9e9eb3", fontSize: 10 }}>{isSortOpen ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {/* Dàn Item khi xổ xuống */}
          {isSortOpen && (
            <View style={{ marginTop: 16, gap: 14 }}>
              <TouchableOpacity onPress={() => handleSelectSort("popularity.desc")}>
                <Text style={{ color: sortBy === "popularity.desc" ? Colors.primary : "white", fontSize: 11, fontWeight: "600" }}>LƯỢT THÍCH</Text>
              </TouchableOpacity>
              <View style={{ height: 1, backgroundColor: "rgba(255,255,255,0.1)" }} />
              <TouchableOpacity onPress={() => handleSelectSort("primary_release_date.desc")}>
                <Text style={{ color: sortBy === "primary_release_date.desc" ? Colors.primary : "white", fontSize: 11, fontWeight: "600" }}>MỚI NHẤT</Text>
              </TouchableOpacity>
              <View style={{ height: 1, backgroundColor: "rgba(255,255,255,0.1)" }} />
              <TouchableOpacity onPress={() => handleSelectSort("vote_average.desc")}>
                <Text style={{ color: sortBy === "vote_average.desc" ? Colors.primary : "white", fontSize: 11, fontWeight: "600" }}>ĐIỂM CAO</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Bộ Thanh Lọc Category (Scroll ngang) */}
      <View className="px-5 mb-4">
        <CategoryChips chips={chips} selectedId={selectedGenreId} onSelect={setSelectedGenreId} />
      </View>
    </View>
  );

  const renderFooter = () => (
    <View className="px-5 py-8 pb-32 mt-4">
      {isAppending ? (
        <ActivityIndicator color={Colors.primary} size="large" />
      ) : movies.length > 0 ? (
        <TouchableOpacity
          onPress={() => loadData(false)}
          activeOpacity={0.8}
          style={{
            backgroundColor: Colors.primary,
            paddingVertical: 18,
            borderRadius: 30,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#1a1a1a", fontWeight: "900", fontSize: 14, letterSpacing: 1 }}>
            TẢI THÊM (LOAD MORE)
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      {/* Sticky Header - Fix cố định ở rìa trên màng hình  */}
      <View style={styles.stickyHeader}>
        {scrolled ? (
          <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill} />
        ) : null}
        
        <View style={[StyleSheet.absoluteFill, { backgroundColor: scrolled ? "rgba(14,14,14,0.7)" : "transparent" }]} />

        <View style={styles.headerContent}>
          {/* Cục CINEMA đẩy hẳn sang trái */}
          <Text className="font-black uppercase" style={{ fontSize: 24, letterSpacing: -1.5, color: Colors.primary }}>
            CINEMA
          </Text>

          {/* Avatar đem sang sát biên phải */}
          <View
            className="rounded-full overflow-hidden"
            style={{ width: 34, height: 34, backgroundColor: Colors.surfaceContainerHigh, justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "rgba(224,142,254,0.2)" }}
          >
            <Text style={{ fontSize: 16 }}>👤</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={movies}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        contentContainerStyle={{ flexGrow: 1, paddingTop: HEADER_HEIGHT }}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        columnWrapperStyle={{ paddingHorizontal: 12 }}
        renderItem={({ item }) => <MovieGridCard movie={item} />}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListEmptyComponent={() => (
          isLoading ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 80 }}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 80 }}>
              <Text style={{ color: "gray" }}>Không có phim nào.</Text>
            </View>
          )
        )}
      />
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

export default MoviesTab;
