/**
 * services/api.ts
 *
 * @purpose Đây là file "nhà kho" xử lý toàn bộ logic giao tiếp với máy chủ phim (TMDB API).
 * @why Tách riêng việc chọc API khỏi giao diện. Mọi giao thức mạng (Network Request) 
 *      sẽ đi qua đây, nếu mai mốt đổi tên biến API Key thì chỉ sửa một mình file này là xong!
 */

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3", // Khối xương sống URL của kho phim
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`, // Thẻ căn cước định danh của mình trên máy TMDB
  },
};

/**
 * Hàm Trọng Tâm (Core Function) giải quyết việc fetch data GET để tái sử dụng
 * Thay vì hàm nào cũng copy+paste chục dòng cấu hình Header, ta tạo con robot chuyển phát nhanh (tmdbGet).
 * 
 * @param endpoint Đuôi URL con (VD: "/movie/popular")
 * @returns Dữ liệu trả về theo khuôn chuẩn <T>
 */
const tmdbGet = async <T>(endpoint: string): Promise<T> => {
  // Tự động gài cắm thẻ ngôn ngữ Tiếng Việt (language=vi) vào mọi HTTP Request.
  // Tuy nhiên, mảng tiểu sử Diễn Viên trên TMDB 99% là chưa có ai dịch tiếng Việt (Sẽ báo rỗng).
  // Nên ta phải chừa API '/person/id' ra và cho nó xài 'en-US' để giữ nguyên tiểu sử tiếng Anh gốc.
  const isActorProfile = endpoint.startsWith('/person/') && !endpoint.includes('movie_credits');
  const lang = isActorProfile ? 'en-US' : 'vi';

  const separator = endpoint.includes('?') ? '&' : '?';
  const localizedEndpoint = `${endpoint}${separator}language=${lang}`;

  const response = await fetch(`${TMDB_CONFIG.BASE_URL}${localizedEndpoint}`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  // Chặn bắt lỗi nếu status code sập hầm (như 401 do sai thẻ cào API, hoặc 404 do phim chết)
  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.statusText}`);
  }

  return response.json(); // Ép tài nguyên dạng Byte thô sơ thành file JSON (Object chuẩn chỉ)
};

/**
 * Hàm tìm phim chung (Qua keyword)
 * Logic: Có query thì xài endpoint Search, rỗng tuếch thì lấy danh sách Trending mượt mà nhất.
 */
export const fetchMovies = async ({
  query,
}: {
  query: string;
}): Promise<Movie[]> => {
  const endpoint = query
    ? `/search/movie?query=${encodeURIComponent(query)}` // Mã hoá lỡ người dùng gõ chuỗi kí tự hack mạng
    : "/discover/movie?sort_by=popularity.desc";

  const data = await tmdbGet<{ results: Movie[] }>(endpoint);
  return data.results;
};

/**
 * Tải kho ngân hàng Thể Loại Phim (Hành động, ma quỷ, tâm lý hình sự...)
 */
export const fetchGenres = async (): Promise<{ id: number; name: string }[]> => {
  const data = await tmdbGet<{ genres: { id: number; name: string }[] }>(
    "/genre/movie/list"
  );
  return data.genres;
};

/**
 * Lọc phim theo đúng chuẩn một Hệ Loại (`genreId`) ấn định.
 * Nếu ID bị kẹt (undefined), trả lại toàn bộ kho!
 */
export const fetchMoviesByGenre = async (genreId?: number): Promise<Movie[]> => {
  const endpoint = genreId
    ? `/discover/movie?sort_by=popularity.desc&with_genres=${genreId}`
    : "/discover/movie?sort_by=popularity.desc";

  const data = await tmdbGet<{ results: Movie[] }>(endpoint);
  return data.results;
};

/**
 * Lọc phim theo chuẩn Tôn giáo / Vùng miền lãnh thổ
 * Nâng cao: Dùng `URLSearchParams` để máy tự escape và phân dải Params tránh lỗi URL độc.
 */
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
    params.append("with_original_language", language); // Ghép đuôi language cực mượt
  }

  const data = await tmdbGet<{ results: Movie[] }>(`/discover/movie?${params.toString()}`);
  return data.results;
};

/**
 * Truy vấn tận gốc lý lịch của từng bộ phim (MovieDetails) theo thẻ ID.
 */
export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    return await tmdbGet<MovieDetails>(`/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`);
  } catch (error) {
    console.error("Lỗi khi tải chi tiết phim:", error);
    throw error;
  }
};

/**
 * Vét cạn danh sách Dàn Diễn Viên góp mặt trong 1 bộ phim
 */
export const fetchMovieCast = async (movieId: string): Promise<Cast[]> => {
  try {
    const data = await tmdbGet<{ cast: Cast[] }>(
      `/movie/${movieId}/credits?api_key=${TMDB_CONFIG.API_KEY}`
    );
    return data.cast;
  } catch (error) {
    console.error("Lỗi nạp dàn diễn viên:", error);
    return [];
  }
};

/**
 * Gợi ý list phim liên quan cùng hệ mâm (Similar) với phim đang coi.
 */
export const fetchSimilarMovies = async (movieId: string): Promise<Movie[]> => {
  try {
    const data = await tmdbGet<{ results: Movie[] }>(
      `/movie/${movieId}/similar?api_key=${TMDB_CONFIG.API_KEY}`
    );
    return data.results;
  } catch (error) {
    console.error("Lỗi lấy phim tương tự:", error);
    return [];
  }
};

/**
 * Tìm trọn vẹn tiểu sử, ngày sinh, của anh Diễn Viên theo ID
 */
export const fetchActorDetails = async (actorId: string): Promise<ActorDetails | null> => {
  try {
    return await tmdbGet<ActorDetails>(`/person/${actorId}?api_key=${TMDB_CONFIG.API_KEY}`);
  } catch (error) {
    console.error("Lỗi tra tiểu sử nhân vật:", error);
    return null;
  }
};

/**
 * Sàng lọc ra hàng chục tựa phim đình đám mà nam/nữ diễn viên đó đạt giải.
 */
export const fetchActorMovies = async (actorId: string): Promise<Movie[]> => {
  try {
    const data = await tmdbGet<{ cast: Movie[] }>(`/person/${actorId}/movie_credits?api_key=${TMDB_CONFIG.API_KEY}`);
    return data.cast;
  } catch (error) {
    console.error("Lỗi khai quật dải phim cũ diễn viên:", error);
    return [];
  }
};
