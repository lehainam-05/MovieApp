/**
 * hooks/useFetch.ts
 * 
 * @purpose Đây là một Custom Hook (Công cụ tự chế) dùng để quản lý quá trình gọi API.
 * @why Thường thì khi gọi API (như tải phim), chúng ta sẽ cần làm 3 việc: 
 *      1. Bật cờ "đang tải" (loading)
 *      2. Lưu dữ liệu lấy được (data)
 *      3. Lưu lỗi nếu rớt mạng (error)
 *      Thay vì lặp lại 3 việc này ở MỌI trang, ta gói nó vào Hook này để dùng chung cho sướng.
 * 
 * @example 
 * const { data: movies, loading } = useFetch(() => fetchMovies('Batman'));
 */

import { useState, useEffect } from "react";

/**
 * @param {Function} fetchFunction - Hàm chứa API gọi dữ liệu (VD: () => fetchMovies()). Hàm này phải trả về Promise.
 * @param {boolean} autoFetch - Cờ gạt (Mặc định là true). Khai báo ứng dụng có nên tự động lấy dữ liệu ngay khi mở hay không.
 * @returns Trả về một block (Object) chứa dữ liệu (`data`), cờ báo tình trạng tải (`loading`), lỗi (`error`) và hàm gọi lại nếu cần (`refetch`).
 */
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  // Kho chứa dữ liệu: Ban đầu là rỗng (null), khi tải xong sẽ nhét data vào đây
  const [data, setData] = useState<T | null>(null);

  // Cờ báo hiệu: True = đang quay đều tải data. False = Tải xong xuôi, hoặc dính lỗi.
  const [loading, setLoading] = useState(false);

  // Kho chứa lỗi báo đỏ: Nếu API nổ (rớt mạng, sai mã API), sẽ nhét lỗi vào đây để vứt thẳng ra màn hình.
  const [error, setError] = useState<Error | null>(null);

  /**
   * Khối logic cốt lõi đảm nhiệm gọi fetchFunction và theo dõi tiến độ
   */
  const fetchData = async () => {
    try {
      // 1. Quá trình bắt đầu: Bật cờ tải (loading = true) và Dọn sạch rác lỗi cũ
      setLoading(true);
      setError(null);

      // 2. Tạm dừng code chờ kết quả từ máy chủ TMDB dội về
      const result = await fetchFunction();
      
      // 3. Có kết quả, lưu ngay vào kho data!
      setData(result);
    } catch (err) {
      // Nếu có biến: Biến đó chuẩn Error thì lưu vào, ko thì đúc ra lỗi chung
      setError(
        err instanceof Error ? err : new Error("Đã xảy ra sự cố không rõ nguyên nhân!")
      );
    } finally {
      // Cuối cùng: Chạy thành công hoặc sập mạng đi nữa thì cũng CHẮC CHẮN phải tắt loading
      setLoading(false);
    }
  };

  /**
   * Reset trạng thái ứng dụng về số 0 tròn trĩnh, dọn sạch bộ nhớ nếu người dùng back app.
   */
  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  /**
   * Hiệu ứng vòng đời (Lifecycle): Cứ hễ component xuất hiện là hàm này chọc API giúp lấy data luôn.
   */
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
