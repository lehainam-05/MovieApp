/**
 * services/favoriteService.ts
 *
 * @purpose CRUD API cho tính năng Phim Yêu Thích, giao tiếp với json-server.
 * @why     Thay thế AsyncStorage bằng REST API để dữ liệu được lưu trữ trên
 *          server (backend/db.json), không bị mất khi xóa app.
 */
import { API_BASE_URL } from "@/constants/backend";
import { getToken } from "@/services/authService";

/** Cấu trúc 1 bản ghi favorite trả về từ json-server */
export interface FavoriteRecord {
    id: number;           // ID tự động tăng do json-server quản lý
    userId: number;       // Phim này thuộc user nào
    movie_id: number;     // ID phim trên TMDB
    title: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    release_date: string;
    genre_ids: number[];
    overview: string;
    adult: boolean;
    original_language: string;
    original_title: string;
    popularity: number;
    video: boolean;
    vote_count: number;
    createdAt: string;    // Thời điểm lưu
}

/**
 * Lấy toàn bộ phim yêu thích của một user.
 * json-server hỗ trợ filter: GET /favorites?userId=1
 */
export const getFavorites = async (userId: number): Promise<Movie[]> => {
    try {
        const token = await getToken();
        const res = await fetch(
            `${API_BASE_URL}/favorites?userId=${userId}&_sort=id&_order=desc`,
            {
                headers: {
                    "Authorization": token ? `Bearer ${token}` : ""
                }
            }
        );
        const data: FavoriteRecord[] = await res.json();

        // Chuyển FavoriteRecord → Movie để tương thích với WatchlistContext
        return data.map((fav) => ({
            id: fav.movie_id,
            title: fav.title,
            poster_path: fav.poster_path,
            backdrop_path: fav.backdrop_path,
            vote_average: fav.vote_average,
            release_date: fav.release_date,
            genre_ids: fav.genre_ids,
            overview: fav.overview,
            adult: fav.adult,
            original_language: fav.original_language,
            original_title: fav.original_title,
            popularity: fav.popularity,
            video: fav.video,
            vote_count: fav.vote_count,
            // Lưu thêm favoriteId để khi xóa biết xóa record nào
            _favoriteId: fav.id,
        })) as any;
    } catch (error) {
        console.error("Error fetching favorites:", error);
        return [];
    }
};

/**
 * Thêm 1 phim vào danh sách yêu thích của user.
 * Trả về record ID (json-server tự sinh) để dùng khi xóa.
 */
export const addFavorite = async (
    userId: number,
    movie: Movie
): Promise<number | null> => {
    try {
        const token = await getToken();
        const res = await fetch(`${API_BASE_URL}/favorites`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? `Bearer ${token}` : ""
            },
            body: JSON.stringify({
                userId,
                movie_id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                backdrop_path: movie.backdrop_path,
                vote_average: movie.vote_average,
                release_date: movie.release_date,
                genre_ids: movie.genre_ids,
                overview: movie.overview,
                adult: movie.adult,
                original_language: movie.original_language,
                original_title: movie.original_title,
                popularity: movie.popularity,
                video: movie.video,
                vote_count: movie.vote_count,
                createdAt: new Date().toISOString(),
            }),
        });
        const created: FavoriteRecord = await res.json();
        return created.id;
    } catch (error) {
        console.error("Error adding favorite:", error);
        return null;
    }
};

/**
 * Xóa 1 phim khỏi danh sách yêu thích.
 * Cần tìm đúng record ID trên server dựa vào userId + movie_id.
 */
export const removeFavorite = async (
    userId: number,
    movieId: number
): Promise<boolean> => {
    try {
        // Tìm record cần xóa
        const searchRes = await fetch(
            `${API_BASE_URL}/favorites?userId=${userId}&movie_id=${movieId}`
        );
        const records: FavoriteRecord[] = await searchRes.json();

        if (records.length === 0) return false;

        // Xóa record đầu tiên tìm được
        const token = await getToken();
        await fetch(`${API_BASE_URL}/favorites/${records[0].id}`, {
            method: "DELETE",
            headers: {
                "Authorization": token ? `Bearer ${token}` : ""
            }
        });
        return true;
    } catch (error) {
        console.error("Error removing favorite:", error);
        return false;
    }
};
