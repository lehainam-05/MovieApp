/**
 * services/trendingService.ts
 *
 * @purpose Quản lý dữ liệu Trending (lượt tìm kiếm phim) trên JSON Server.
 * @why     Thay thế hoàn toàn services/appwrite.ts. Dữ liệu được lưu vào
 *          bảng `metrics` trong file backend/db.json.
 */
import { API_BASE_URL } from "@/constants/backend";

/**
 * Cập nhật hoặc tạo mới bản ghi tìm kiếm.
 * - Nếu searchTerm đã tồn tại → PATCH tăng count.
 * - Nếu chưa tồn tại → POST tạo document mới với count = 1.
 */
export const updateSearchCount = async (
    query: string,
    movie: Movie
): Promise<void> => {
    try {
        // Tìm xem đã có bản ghi nào trùng searchTerm chưa
        const searchRes = await fetch(
            `${API_BASE_URL}/metrics?searchTerm=${encodeURIComponent(query)}`
        );
        const existing = await searchRes.json();

        if (existing.length > 0) {
            // Đã tồn tại → tăng count lên 1
            const doc = existing[0];
            await fetch(`${API_BASE_URL}/metrics/${doc.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ count: doc.count + 1 }),
            });
        } else {
            // Chưa tồn tại → tạo mới
            await fetch(`${API_BASE_URL}/metrics`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    searchTerm: query,
                    movie_id: movie.id,
                    title: movie.title,
                    count: 1,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }),
            });
        }
    } catch (error) {
        console.error("Error updating search count:", error);
    }
};

/**
 * Lấy danh sách Top 5 phim trending — sắp xếp theo `count` giảm dần.
 */
export const getTrendingMovies = async (): Promise<
    TrendingMovie[] | undefined
> => {
    try {
        const res = await fetch(
            `${API_BASE_URL}/metrics?_sort=count&_order=desc&_limit=5`
        );
        const data = await res.json();
        return data as TrendingMovie[];
    } catch (error) {
        console.error("Error fetching trending movies:", error);
        return undefined;
    }
};
