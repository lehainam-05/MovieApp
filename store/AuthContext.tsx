/**
 * store/AuthContext.tsx
 * 
 * @purpose Quản lý Session của người dùng trên toàn dải cấu trúc App.
 * @why Cần biến `isAuthenticated` luôn treo ở Root để `_layout.tsx` còn biết đường
 *      đá người ta chặn không cho vào trong khi chưa login, hoặc đá ra ngoài khi ấn Logout.
 */
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { email: string; id?: number } | null;
  avatarUri: string;
  nickname: string;
  login: (email: string, userId?: number) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (avatar: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Tránh chớp nháy Layout khi memory chưa load xong
  const [user, setUser] = useState<{ email: string; id?: number } | null>(null);

  // Trạng thái Hồ sơ cá nhân toàn cục
  const [avatarUri, setAvatarUri] = useState<string>("https://i.pravatar.cc/300");
  const [nickname, setNickname] = useState<string>("Alex Auteur");

  useEffect(() => {
    // Kéo kho vật lý lên Memory RAM
    const checkAuthStatus = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("@authUser");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }

        const savedAvatar = await AsyncStorage.getItem('@userAvatar');
        if (savedAvatar) setAvatarUri(savedAvatar);

        const savedName = await AsyncStorage.getItem('@userNickname');
        if (savedName) setNickname(savedName);
      } catch (e) {
        console.error("Failed to load auth status", e);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  const login = async (email: string, userId?: number) => {
    try {
      const userData = { email, id: userId };
      await AsyncStorage.setItem("@authUser", JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
    } catch (e) {
      console.error("Login failed", e);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@authUser");
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateProfile = async (avatar: string, name: string) => {
    setAvatarUri(avatar);
    setNickname(name);
    await AsyncStorage.setItem('@userAvatar', avatar);
    await AsyncStorage.setItem('@userNickname', name);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, avatarUri, nickname, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
