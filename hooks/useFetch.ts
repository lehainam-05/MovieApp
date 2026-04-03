// Custom hook dùng để gọi API và giữ state data/loading/error
// Input: fetchFunction - hàm trả Promise, autoFetch (true/false) để tự gọi ngay
// Output: đối tượng { data, loading, error, refetch, reset }

import { useState, useEffect } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  // data lưu kết quả trả về từ API
  const [data, setData] = useState<T | null>(null);
  // trạng thái đang load
  const [loading, setLoading] = useState(false);
  // lưu lỗi nếu có
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Thực hiện gọi API
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      // Nếu err là Error thì set trực tiếp, không thì tạo lỗi chung
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  // Reset về trạng thái ban đầu nếu muốn
  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  // Tự gọi khi mount nếu autoFetch=true
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
