/**
 * store/WatchlistContext.tsx
 * 
 * @purpose Quản lý trạng thái toàn cục (Global State) cho tính năng Lưu Phim Yêu Thích.
 * @why Dừng lại ở cấp độ màn hình là chưa đủ, dữ liệu "Phim đã lưu" cần hiển thị xuyên suốt
 *      ở cả trang Chi Tiết Phim (để bật nút Trái Tim) và trang Profile (để hiển thị lưới cuộn ngang).
 *      Do đó mảng `watchlist` bắt buộc chui vào một React Context độc lập.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface WatchlistContextType {
  watchlist: Movie[];
  isSaved: (id: number) => boolean;
  toggleWatchlist: (movie: Movie) => Promise<void>;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

/**
 * WatchlistProvider
 * @purpose Đóng vai trò là cái "giỏ" nhúng toàn bộ App vào bên trong, phân phát state `watchlist` đi khắp nơi.
 * @why Khi App khởi động, nó tự động trích xuất JSON phim đã lưu ở `AsyncStorage` (bộ nhớ trong vật lý)
 *      nạp vào Memory. 
 */
export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  useEffect(() => {
    // Load from memory
    const loadFromStorage = async () => {
      try {
        const stored = await AsyncStorage.getItem("@watchlist");
        if (stored) setWatchlist(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load watchlist from storage", e);
      }
    };
    loadFromStorage();
  }, []);

  /**
   * toggleWatchlist
   * @purpose Đóng vai trò hạt nhân logic: ấn thêm/xoá phim khỏi giỏ.
   * @highlight Kĩ thuật đảo ngược: Cứa duyệt mảng kiểm tra trùng lặp (some). Đã có thì xóa (`filter`), 
   * chưa có thì móc nối (`unshift`) lên tận đầu giỏ để người dùng thấy ngay thay đổi.
   * Đồng thời tiến hành đồng bộ dữ liệu vào `AsyncStorage` ngay lập tức.
   */
  const toggleWatchlist = async (movie: Movie) => {
    try {
      let updatedList = [...watchlist];
      const isAlreadySaved = updatedList.some((m) => m.id === movie.id);

      if (isAlreadySaved) {
        updatedList = updatedList.filter((m) => m.id !== movie.id); // Xóa khỏi danh sách
      } else {
        updatedList.unshift(movie); // Thêm lên đầu danh sách
      }

      setWatchlist(updatedList);
      await AsyncStorage.setItem("@watchlist", JSON.stringify(updatedList));
    } catch (e) {
      console.error("Failed to update watchlist", e);
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
