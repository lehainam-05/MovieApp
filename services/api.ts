// API helper gọi TMDB.
// Chỉ đưa headers sẵn và xử lý lỗi HTTP, trả data JSON.

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

// Hàm chung gọi GET và check error
const tmdbGet = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${TMDB_CONFIG.BASE_URL}${endpoint}`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.statusText}`);
  }

  return response.json();
};

// Tìm phim theo query hoặc nếu query rỗng thì trả danh sách phổ biến.
export const fetchMovies = async ({
  query,
}: {
  query: string;
}): Promise<Movie[]> => {
  const endpoint = query
    ? `/search/movie?query=${encodeURIComponent(query)}`
    : "/discover/movie?sort_by=popularity.desc";

  const data = await tmdbGet<{ results: Movie[] }>(endpoint);
  return data.results;
};

// Lấy danh sách thể loại phim
export const fetchGenres = async (): Promise<{ id: number; name: string }[]> => {
  const data = await tmdbGet<{ genres: { id: number; name: string }[] }>(
    "/genre/movie/list?language=en-US"
  );

  return data.genres;
};

// Lấy phim theo thể loại (genreId có thể undefined -> danh sách chung)
export const fetchMoviesByGenre = async (genreId?: number): Promise<Movie[]> => {
  const endpoint = genreId
    ? `/discover/movie?sort_by=popularity.desc&with_genres=${genreId}`
    : "/discover/movie?sort_by=popularity.desc";

  const data = await tmdbGet<{ results: Movie[] }>(endpoint);
  return data.results;
};

// Lấy phim theo vùng/language, dùng URLSearchParams để escape giá trị
export const fetchMoviesByRegionLanguage = async ({
  region,
  language,
}: {
  region: string;
  language?: string;
}): Promise<Movie[]> => {
  const params = new URLSearchParams({
    sort_by: "popularity.desc",
    with_origin_country: region,
  });

  if (language) {
    params.append("with_original_language", language);
  }

  const data = await tmdbGet<{ results: Movie[] }>(`/discover/movie?${params.toString()}`);
  return data.results;
};

// Lấy chi tiết phim theo id
export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    return await tmdbGet<MovieDetails>(`/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
