/**
 * store/WatchlistContext.tsx
 * 
 * @purpose Quản lý trạng thái toàn cục (Global State) cho tính năng Lưu Phim Yêu Thích.
 * @why Dữ liệu "Phim đã lưu" cần hiển thị xuyên suốt ở cả trang Chi Tiết Phim (nút ❤️)
 *      và trang Profile (lưới cuộn ngang). Dữ liệu được đồng bộ lên backend (db.json)
 *      thông qua json-server REST API, thay vì chỉ lưu cục bộ AsyncStorage.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFavorites, addFavorite, removeFavorite } from "@/services/favoriteService";
import { useAuth } from "@/store/AuthContext";

interface WatchlistContextType {
  watchlist: Movie[];
  isSaved: (id: number) => boolean;
  toggleWatchlist: (movie: Movie) => Promise<void>;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

/**
 * WatchlistProvider
 * @purpose Đóng vai trò "giỏ" nhúng toàn bộ App bên trong, phân phát state `watchlist` đi khắp nơi.
 * @why Khi App khởi động, nó gọi API lấy danh sách phim yêu thích từ server (db.json)
 *      và nạp vào Memory. Mọi thay đổi (thêm/xóa) đều được đồng bộ ngay lên server.
 */
export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadFavoritesFromServer();
    } else {
      setWatchlist([]); // Xóa danh sách cục bộ khi đăng xuất
    }
  }, [user]);

  /**
   * Load danh sách phim yêu thích từ server khi app khởi động hoặc user đổi.
   */
  const loadFavoritesFromServer = async () => {
    try {
      const userId = user?.id || 1;
      const movies = await getFavorites(userId);
      setWatchlist(movies);
    } catch (e) {
      console.error("Failed to load favorites from server", e);
    }
  };

  /**
   * toggleWatchlist
   * @purpose Hạt nhân logic: bấm thêm/xóa phim khỏi danh sách yêu thích.
   * @highlight Đã có trong danh sách → gọi DELETE API xóa trên server.
   *            Chưa có → gọi POST API thêm vào server.
   *            Cập nhật state cục bộ ngay lập tức (optimistic update) để UI phản hồi nhanh.
   */
  const toggleWatchlist = async (movie: Movie) => {
    try {
      const userId = user?.id || 1;
      const isAlreadySaved = watchlist.some((m) => m.id === movie.id);

      if (isAlreadySaved) {
        // Optimistic update: xóa khỏi state trước
        setWatchlist((prev) => prev.filter((m) => m.id !== movie.id));
        // Gọi API xóa trên server
        await removeFavorite(userId, movie.id);
      } else {
        // Optimistic update: thêm vào đầu danh sách
        setWatchlist((prev) => [movie, ...prev]);
        // Gọi API thêm trên server
        await addFavorite(userId, movie);
      }
    } catch (e) {
      console.error("Failed to update watchlist", e);
      // Nếu lỗi, reload lại từ server để đồng bộ
      await loadFavoritesFromServer();
    }
  };

  const isSaved = (id: number) => {
    return watchlist.some((m) => m.id === id);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, isSaved, toggleWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};
