import { Link } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ALL_GENRE, GenreChip } from "@/constants/genres";
import useFetch from "@/hooks/useFetch";
import { fetchGenres, fetchMoviesByGenre, fetchMoviesByRegionLanguage } from "@/services/api";

const fallbackChips: string[] = ["Recommended", "TV Series", "Movies", "Genres", "Anime"];

const formatScore = (value?: number) => `PD.${Number.isFinite(value) ? value!.toFixed(1) : "N/A"}`;
const posterUrl = (path?: string | null) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : "https://placehold.co/500x750/101010/FFFFFF.png";
const backdropUrl = (path?: string | null) =>
  path ? `https://image.tmdb.org/t/p/w780${path}` : "https://placehold.co/900x1200/101010/FFFFFF.png";

const SectionTitle = ({ title }: { title: string }) => (
  <View className="mb-5 mt-10 flex-row items-center justify-between">
    <Text className="text-3xl font-black uppercase text-white">{title}</Text>
    <Text className="text-xl text-zinc-500">›</Text>
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
    data: topMovies,
    loading: topLoading,
    error: topError,
    refetch: loadTopMovies,
  } = useFetch(
    () => fetchMoviesByGenre(selectedGenreId === ALL_GENRE.id ? undefined : selectedGenreId),
    false
  );

  const { data: usUkMovies, loading: usUkLoading, error: usUkError } = useFetch(() =>
    fetchMoviesByRegionLanguage({ region: "US" })
  );
  const { data: asianMovies, loading: asianLoading, error: asianError } = useFetch(() =>
    fetchMoviesByRegionLanguage({ region: "JP", language: "ja" })
  );

  useEffect(() => {
    loadTopMovies();
  }, [selectedGenreId]);

  const chips: GenreChip[] = useMemo(() => {
    const mapped = (genres ?? []).map((genre) => ({
      id: genre.id,
      name: genre.name,
    }));

    return [ALL_GENRE, ...mapped];
  }, [genres]);

  const displayChips = chips.length > 1 ? chips.slice(0, 8) : fallbackChips.map((name, index) => ({ id: -(index + 1), name }));

  const heroMovie = topMovies?.[0];
  const isLoading = genresLoading || topLoading || usUkLoading || asianLoading;
  const error = genresError || topError || usUkError || asianError;

  const topTenMovies = useMemo(() => (topMovies ?? []).slice(0, 10), [topMovies]);

  return (
    <View className="flex-1 bg-black">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="px-5 pt-14">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-4">
              <Text className="text-2xl text-white">☰</Text>
              <Text className="text-4xl font-black uppercase tracking-tight text-[#d48fff]">Cinema</Text>
            </View>

            <View className="flex-row items-center gap-3">
              <TouchableOpacity className="rounded-full bg-zinc-900 p-3">
                <Text className="text-lg text-white">🔔</Text>
              </TouchableOpacity>
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgmjByb_n3sZxKa1x32CFXNRfHsa2W_wHzOfrad3Y-PTrx2MEiTxwfn98Ksp8MbWqkr_Q9rlW9znfuNlX50W48aJGqwYSD4HDOLZwX0CJ1Cz40CGtVUW-gMTgzbZfbbg9UUeOfaV4bsJ5vFx2jsGF5jefl4AqsZCLldINIy7lfp_ayyJ5yZMOwbL834F5JL06VfHuAMjTTArj4kGuRxKmEcNqo_0YJUI4onqA3TR4FmMabpdvgLS2ZBFXT4HG790oCyJr3HhefgQ",
                }}
                className="h-11 w-11 rounded-full border border-[#d48fff]/40"
              />
            </View>
          </View>

          <View className="mt-5">
            <FlatList
              horizontal
              data={displayChips}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ gap: 8, paddingRight: 12 }}
              renderItem={({ item }) => {
                const isActive = item.id === selectedGenreId;
                return (
                  <TouchableOpacity
                    className={`rounded-full border px-6 py-3 ${
                      isActive ? "border-white bg-white" : "border-zinc-800 bg-zinc-900"
                    }`}
                    onPress={() => setSelectedGenreId(item.id)}
                  >
                    <Text className={`text-xs font-bold uppercase ${isActive ? "text-black" : "text-zinc-400"}`}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color="#d48fff" className="mt-14" />
          ) : error ? (
            <Text className="mt-10 text-red-400">Error: {error.message}</Text>
          ) : (
            <>
              {heroMovie ? (
                <View className="mt-5">
                  <ImageBackground
                    source={{ uri: backdropUrl(heroMovie.backdrop_path) }}
                    className="h-[540px] w-full overflow-hidden rounded-[40px] justify-end"
                  >
                    <View className="absolute inset-0 bg-black/35" />
                    <View className="px-6 pb-8">
                      <Text className="text-center text-6xl font-black uppercase text-white" numberOfLines={2}>
                        {heroMovie.title}
                      </Text>
                      <View className="mt-4 flex-row items-center justify-center gap-2">
                        <Text className="rounded-md bg-[#d48fff]/30 px-3 py-1 text-[11px] font-bold text-[#f0cfff]">
                          IMDb {heroMovie.vote_average.toFixed(1)}
                        </Text>
                        <Text className="rounded-md bg-zinc-900/90 px-3 py-1 text-[11px] font-bold text-white">T16</Text>
                        <Text className="rounded-md bg-zinc-900/90 px-3 py-1 text-[11px] font-bold text-white">
                          {heroMovie.release_date?.split("-")[0] || "N/A"}
                        </Text>
                      </View>

                      <View className="mt-6 flex-row justify-center gap-4">
                        <Link href={`/movie/${heroMovie.id}`} asChild>
                          <TouchableOpacity className="rounded-3xl bg-[#d48fff] px-10 py-4">
                            <Text className="text-center text-lg font-bold text-black">▶ Watch Now</Text>
                          </TouchableOpacity>
                        </Link>
                        <Link href={`/movie/${heroMovie.id}`} asChild>
                          <TouchableOpacity className="rounded-3xl border border-zinc-700 bg-zinc-900/85 px-8 py-4">
                            <Text className="text-lg font-bold text-white">ⓘ Info</Text>
                          </TouchableOpacity>
                        </Link>
                      </View>
                    </View>
                  </ImageBackground>

                  <View className="mt-6 flex-row justify-center gap-2">
                    <View className="h-2 w-8 rounded-full bg-[#d48fff]" />
                    {[1, 2, 3, 4].map((dot) => (
                      <View key={dot} className="h-2 w-2 rounded-full bg-zinc-700" />
                    ))}
                  </View>
                </View>
              ) : null}

              <SectionTitle title="Top 10 Today" />
              <FlatList
                horizontal
                data={topTenMovies}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 18, paddingRight: 16 }}
                renderItem={({ item, index }) => (
                  <Link href={`/movie/${item.id}`} asChild>
                    <TouchableOpacity className="relative w-[170px]">
                      <Text className="absolute -left-7 bottom-2 text-[130px] font-black leading-none text-zinc-800">
                        {index + 1}
                      </Text>
                      <Image source={{ uri: posterUrl(item.poster_path) }} className="ml-5 h-[260px] w-[150px] rounded-3xl" />
                      <View className="absolute right-3 top-3 rounded-md bg-black/70 px-2 py-1">
                        <Text className="text-[10px] font-bold text-white">{formatScore(item.vote_average)}</Text>
                      </View>
                    </TouchableOpacity>
                  </Link>
                )}
              />

              <SectionTitle title="New US-UK Movies" />
              <FlatList
                horizontal
                data={(usUkMovies ?? []).slice(0, 8)}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 14, paddingRight: 14 }}
                renderItem={({ item }) => (
                  <Link href={`/movie/${item.id}`} asChild>
                    <TouchableOpacity className="w-[165px]">
                      <Image source={{ uri: posterUrl(item.poster_path) }} className="h-[240px] w-full rounded-3xl" />
                      <View className="absolute bottom-[62px] left-2 rounded-md bg-[#d48fff]/90 px-2 py-1">
                        <Text className="text-[10px] font-bold text-black">{formatScore(item.vote_average)}</Text>
                      </View>
                      <Text className="mt-3 text-xl font-black uppercase text-white" numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text className="text-xs uppercase text-zinc-400" numberOfLines={1}>
                        {item.vote_average.toFixed(1)} • {item.release_date?.split("-")[0] || "N/A"}
                      </Text>
                    </TouchableOpacity>
                  </Link>
                )}
              />

              <SectionTitle title="New Asian Movies" />
              <FlatList
                horizontal
                data={(asianMovies ?? []).slice(0, 8)}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 14, paddingRight: 14 }}
                renderItem={({ item }) => (
                  <Link href={`/movie/${item.id}`} asChild>
                    <TouchableOpacity className="w-[165px]">
                      <Image source={{ uri: posterUrl(item.poster_path) }} className="h-[240px] w-full rounded-3xl" />
                      <View className="absolute bottom-[62px] left-2 rounded-md bg-[#d48fff]/90 px-2 py-1">
                        <Text className="text-[10px] font-bold text-black">{formatScore(item.vote_average)}</Text>
                      </View>
                      <Text className="mt-3 text-xl font-black uppercase text-white" numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text className="text-xs uppercase text-zinc-400" numberOfLines={1}>
                        {item.vote_average.toFixed(1)} • {item.release_date?.split("-")[0] || "N/A"}
                      </Text>
                    </TouchableOpacity>
                  </Link>
                )}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;
