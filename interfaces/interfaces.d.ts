/**
 * interfaces/interfaces.d.ts
 *
 * @purpose Đây là bộ Khung Biên Dịch (TypeScript Interfaces) định hình toàn bộ cục dữ liệu chạy trong App.
 * @why Nếu không có bộ khung này, khi chọc API lấy phim về, máy sẽ không biết "phim" đó có hình thù ra sao 
 *      (có tên là `title` hay `name`, có ảnh là `poster_path` hay `image`). Nhờ định nghĩa sẵn 
 *      các khung này, code editor sẽ bắt lỗi ngay nếu ta lỡ gõ sai biến!
 */

/**
 * Bản thiết kế chuẩn của 1 BỘ PHIM cơ bản (Trả về từ danh sách tìm kiếm, trang chủ)
 */
interface Movie {
  id: number;
  title: string;
  adult: boolean; // Có gắn cấm trẻ em 18+ không?
  backdrop_path: string; // Tên file ảnh bìa (Hero Banner cỡ lớn)
  genre_ids: number[]; // Tập hợp ID của thể loại phim (Ví dụ: [28, 12] tức là Action, Adventure)
  original_language: string;
  original_title: string;
  overview: string; // Nội dung/Cốt truyện tóm tắt
  popularity: number; // Chỉ số phổ biến thuật toán TMDB chấm
  poster_path: string; // Tên file poster dọc (in trên vé màn hình ngoài)
  release_date: string;
  video: boolean;
  vote_average: number; // Điểm đánh giá (VD: 8.5)
  vote_count: number;
}

/**
 * Phiên bản "Phim Thịnh Hành" - Thường dùng khi lưu thẳng vào CSDL Appwrite thay vì gọi API liên tục
 */
interface TrendingMovie {
  searchTerm: string; // Chuỗi tìm kiếm dẫn đến phim này
  movie_id: number;
  title: string;
  count: number; // Số lượt search từ người dùng App
  poster_url: string; // Link URL đầy đủ của ảnh, dễ dàng tải luôn
}

/**
 * Khung dữ liệu cực kỳ khổng lồ chứa MỌI CHI TIẾT của 1 bộ phim (Trả về khi bấm vô chữ "Info")
 */
interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number; // Ngân sách làm phim (USD)
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: {   // Hãng phim sản xuất (VD: Marvel Studios)
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number; // Doanh thu phòng vé toàn cầu
  runtime: number | null; // Độ dài phim (Phút)
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string; // Trạng thái: "Đã phát hành" hay "Đang quay"
  tagline: string | null; // Slogan của bộ phim (Ví dụ: "I am Iron Man")
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

/**
 * Props chuẩn truyền vào the Component Thẻ Phim Thịnh Hành
 */
interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}

/**
 * Lý lịch trích ngang của một diễn viên phụ/chính trong khuôn khổ BỘ PHIM
 */
interface Cast {
  id: number;
  name: string; // Tên thật diễn viên (VD: Christian Bale)
  original_name: string;
  profile_path: string | null; // Hình chân dung
  character: string; // Tên nhân vật đảm nhiệm (VD: Batman / Bruce Wayne)
}

/**
 * Hồ sơ Full-HD của một diễn viên chuyên nghiệp
 */
interface ActorDetails {
  id: number;
  name: string;
  biography: string; // Dòng đời/tiểu sử wikipedia dài lê thê
  birthday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string; // Ngành nghề chính: Acting (Diễn xuất) hay Directing (Đạo diễn)
  popularity: number;
}
