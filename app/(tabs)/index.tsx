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
import { LinearGradient } from "expo-linear-gradient";

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
    <Text className="text-white text-[31px] font-black">{title}</Text>
    <View className="size-8 rounded-full bg-white/5 border border-white/10 items-center justify-center">
      <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
    </View>
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
    <View className="flex-1 bg-black">
      <Image source={images.bg} className="absolute w-full h-full z-0 opacity-30" resizeMode="cover" />
      <LinearGradient
        colors={["#030014", "#05030a", "#000000"]}
        locations={[0, 0.52, 1]}
        className="absolute inset-0"
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130 }}
      >
        <View className="px-5 pt-16">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Ionicons name="menu" size={22} color="#FFFFFF" />
              <LinearGradient
                colors={["#9D50BB", "#AB57AC", "#C084FC"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="rounded-full px-4 py-1.5"
              >
                <Text className="text-white text-2xl font-black tracking-wider">CINEMA</Text>
              </LinearGradient>
            </View>

            <View className="flex-row items-center gap-2.5">
              <View className="size-10 rounded-full border border-white/15 bg-white/5 items-center justify-center">
                <Ionicons name="notifications" size={17} color="#FFFFFF" />
              </View>
              <LinearGradient
                colors={["#9D50BB", "#AB57AC"]}
                className="size-10 rounded-full items-center justify-center"
              >
                <Ionicons name="person" size={16} color="#FFFFFF" />
              </LinearGradient>
            </View>
          </View>

          <View className="mt-5">
            <CategoryChips
              chips={chips}
              selectedId={selectedGenreId}
              onSelect={setSelectedGenreId}
            />
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color="#AB57AC" className="mt-10" />
          ) : error ? (
            <Text className="text-red-400 mt-8">Error: {error.message}</Text>
          ) : (
            <>
              {heroMovie ? (
                <View className="mt-6">
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
                  contentContainerStyle={{ gap: 12, paddingRight: 12 }}
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
