import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

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
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full h-full z-0" resizeMode="cover" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="px-5 pt-16">
          <Text className="text-accent text-4xl font-black tracking-wider">CINEMA</Text>

          <View className="mt-5">
            <CategoryChips
              chips={chips}
              selectedId={selectedGenreId}
              onSelect={setSelectedGenreId}
            />
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color="#AB8BFF" className="mt-10" />
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
                <Text className="text-white text-3xl font-black mb-4">TOP 10 TODAY</Text>
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
                <Text className="text-white text-3xl font-black mb-4">NEW US-UK MOVIES</Text>
                <View className="flex-row flex-wrap justify-between gap-y-6">
                  {(usUkMovies ?? []).slice(0, 4).map((movie) => (
                    <MoviePosterCard key={movie.id} movie={movie} />
                  ))}
                </View>
              </View>

              <View className="mt-12">
                <Text className="text-white text-3xl font-black mb-4">NEW ASIAN MOVIES</Text>
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
