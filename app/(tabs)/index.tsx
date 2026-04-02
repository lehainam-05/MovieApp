import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { images } from "@/constants/images";
import { ALL_GENRE, GenreChip } from "@/constants/genres";

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

const SectionHeader = ({ title }: { title: string }) => (
  <View className="flex-row items-center justify-between mb-4">
    <Text className="text-white text-[32px] font-black">{title}</Text>
    <Ionicons name="chevron-forward" size={18} color="#7f8089" />
  </View>
);

const Index = () => {
  const [selectedGenreId, setSelectedGenreId] = useState<number>(ALL_GENRE.id);

  const {
    data: genres,
    loading: genresLoading,
    error: genresError,
  } = useFetch(fetchGenres);

  const {
    data: genreMovies,
    loading: genreMoviesLoading,
    error: genreMoviesError,
    refetch: loadGenreMovies,
  } = useFetch(
    () => fetchMoviesByGenre(selectedGenreId === ALL_GENRE.id ? undefined : selectedGenreId),
    false
  );

  const {
    data: usUkMovies,
    loading: usUkLoading,
    error: usUkError,
  } = useFetch(() => fetchMoviesByRegionLanguage({ region: "US" }));

  const {
    data: asianMovies,
    loading: asianLoading,
    error: asianError,
  } = useFetch(() =>
    fetchMoviesByRegionLanguage({ region: "JP", language: "ja" })
  );

  useEffect(() => {
    loadGenreMovies();
  }, [selectedGenreId]);

  const chips: GenreChip[] = useMemo(() => {
    const mapped = (genres ?? []).map((genre) => ({
      id: genre.id,
      name: genre.name,
    }));

    return [ALL_GENRE, ...mapped];
  }, [genres]);

  const heroMovie = genreMovies?.[0];

  const isLoading = genresLoading || genreMoviesLoading || usUkLoading || asianLoading;
  const error = genresError || genreMoviesError || usUkError || asianError;

  return (
    <View className="flex-1 bg-[#050508]">
      <Image source={images.bg} className="absolute w-full h-full opacity-30" resizeMode="cover" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 124 }}
      >
        <View className="px-5 pt-14">
          <View className="flex-row items-center justify-between mb-5">
            <View className="flex-row items-center gap-3">
              <Ionicons name="menu" size={21} color="#ffffff" />
              <Text className="text-[38px] font-black tracking-wider text-[#d772ff]">CINEMA</Text>
            </View>

            <View className="flex-row items-center gap-3">
              <Ionicons name="notifications" size={19} color="#f8f8f8" />
              <View className="w-8 h-8 rounded-full bg-[#1e1f27] border border-[#2d2e39]" />
            </View>
          </View>

          <CategoryChips
            chips={chips}
            selectedId={selectedGenreId}
            onSelect={setSelectedGenreId}
          />

          {isLoading ? (
            <ActivityIndicator size="large" color="#d772ff" className="mt-10" />
          ) : error ? (
            <Text className="text-red-400 mt-8">Error: {error.message}</Text>
          ) : (
            <>
              {heroMovie ? (
                <View className="mt-5">
                  <HeroBanner movie={heroMovie} />
                </View>
              ) : null}

              <View className="mt-12">
                <SectionHeader title="TOP 10 TODAY" />
                <FlatList
                  horizontal
                  data={(genreMovies ?? []).slice(0, 10)}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item, index }) => <RankingCard movie={item} index={index} />}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 14, paddingRight: 14 }}
                />
              </View>

              <View className="mt-12">
                <SectionHeader title="NEW US-UK MOVIES" />
                <View className="flex-row flex-wrap justify-between gap-y-6">
                  {(usUkMovies ?? []).slice(0, 4).map((movie) => (
                    <MoviePosterCard key={movie.id} movie={movie} />
                  ))}
                </View>
              </View>

              <View className="mt-12">
                <SectionHeader title="NEW ASIAN MOVIES" />
                <View className="flex-row flex-wrap justify-between gap-y-6">
                  {(asianMovies ?? []).slice(0, 4).map((movie) => (
                    <MoviePosterCard key={movie.id} movie={movie} />
                  ))}
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;
