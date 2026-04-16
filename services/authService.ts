/**
 * services/authService.ts
 *
 * @purpose Gọi API đến JSON Server Auth để Đăng Ký / Đăng Nhập.
 * @why     Thay thế cho Appwrite Authentication. json-server-auth cung cấp
 *          endpoint POST /register và POST /login, trả về JWT token.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@/constants/backend";

/** Kết quả trả về từ json-server-auth khi login/register thành công */
interface AuthResponse {
    accessToken: string;
    user: {
        id: number;
        email: string;
        fullName?: string;
    };
}

/**
 * Đăng ký tài khoản mới.
 * json-server-auth yêu cầu body phải có `email` và `password`.
 * Trường `fullName` là tuỳ chỉnh thêm.
 */
export const registerUser = async (
    email: string,
    password: string,
    fullName: string
): Promise<AuthResponse> => {
    const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName }),
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Đăng ký thất bại");
    }

    const data: AuthResponse = await res.json();

    // Lưu token xuống bộ nhớ thiết bị
    await AsyncStorage.setItem("@authToken", data.accessToken);

    return data;
};

/**
 * Đăng nhập bằng email + password.
 * Trả về JWT token nếu thành công.
 */
export const loginUser = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Đăng nhập thất bại");
    }

    const data: AuthResponse = await res.json();

    // Lưu token xuống bộ nhớ thiết bị
    await AsyncStorage.setItem("@authToken", data.accessToken);

    return data;
};

/**
 * Lấy JWT token đã lưu (dùng khi cần gửi kèm Authorization header).
 */
export const getToken = async (): Promise<string | null> => {
    return AsyncStorage.getItem("@authToken");
};
