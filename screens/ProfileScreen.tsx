/**
 * screens/ProfileScreen.tsx
 *
 * @purpose Màn hình Hồ Sơ cá nhân — chứa toàn bộ UI và logic hiển thị.
 * @why Tách khỏi Router `app/(tabs)/profile.tsx` để đảm bảo Clean Architecture.
 *      Router chỉ đóng vai trò Entry Point (2 dòng), toàn bộ xương thịt nằm ở đây.
 */
import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Platform } from 'react-native';
import { Colors } from '@/constants/colors';
import UserInfoCard from '@/components/profile/UserInfoCard';
import PreferencesMenu from '@/components/profile/PreferencesMenu';
import WatchlistPosterCard from '@/components/common/WatchlistPosterCard';
import { Ionicons } from '@expo/vector-icons';
import { useWatchlist } from '@/store/WatchlistContext';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const { watchlist } = useWatchlist();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#0B0B0C' }}>

      {/* Header CINEMA */}
      <View style={{ paddingTop: Platform.OS === 'ios' ? 60 : 44, paddingHorizontal: 24, paddingBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: Colors.primary, fontSize: 24, fontWeight: '900', letterSpacing: -1.5 }}>
          CINEMA
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Thẻ Thông Tin Người Dùng */}
        <View className="mt-4">
          <UserInfoCard />
        </View>

        {/* Thẻ Nâng Cấp Gói */}
        <View className="px-5 mb-8">
          <View className="p-6 pb-7 mt-4" style={{ backgroundColor: '#D48BFF', borderRadius: 32 }}>
            <Text className="text-[#3A1459] font-black text-[22px] mb-1">Nâng Cấp Gói</Text>
            <Text className="text-[#3A1459]/80 font-medium text-[13px] leading-tight mb-6 pr-8">
              Trải nghiệm độ phân giải 8K và âm thanh vòm trên mọi thiết bị.
            </Text>
            <TouchableOpacity
              className="h-12 rounded-full items-center justify-center border border-[#3A1459]/10"
              style={{ backgroundColor: 'rgba(255,255,255,0.3)', width: '100%' }}
            >
              <Text className="text-white font-bold text-[12px] uppercase tracking-[2px]">
                XEM CÁC GÓI
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Phim Đã Lưu (tối đa 5, có nút Xem Tất Cả) */}
        <View className="mb-8">
          <View className="px-5 flex-row items-end justify-between mb-4">
            <View>
              <Text className="text-neutral-500 uppercase tracking-[2px] text-[9px] font-bold mb-1">BỘ SƯU TẬP</Text>
              <Text className="text-white font-bold text-[22px] tracking-tight">Phim Đã Lưu</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/watchlist' as any)}>
              <Text className="font-bold text-[15px] uppercase tracking-[2px]" style={{ color: Colors.primary }}>
                XEM TẤT CẢ
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}>
            {watchlist.length > 0 ? (
              <>
                {watchlist.slice(0, 5).map((movie) => (
                  <WatchlistPosterCard
                    key={movie.id}
                    movie={movie}
                    onPress={() => router.push(`/movie/${movie.id}`)}
                  />
                ))}
                {/* Nút xem thêm */}
                {watchlist.length > 5 && (
                  <TouchableOpacity
                    onPress={() => router.push('/watchlist' as any)}
                    className="w-28 items-center justify-center mb-2"
                    style={{
                      height: 144 * 1.44,
                      borderRadius: 20,
                      backgroundColor: '#131315',
                      borderWidth: 1,
                      borderColor: 'rgba(255,255,255,0.05)',
                    }}
                  >
                    <Text style={{ color: Colors.primary, fontSize: 24, fontWeight: '800' }}>+{watchlist.length - 5}</Text>
                    <Text className="text-neutral-500 text-[10px] font-bold mt-1">Xem thêm</Text>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <View className="items-center justify-center py-10 px-6">
                <Text className="text-neutral-500 text-sm text-center">
                  Chưa có phim nào được lưu.{'\n'}Hãy khám phá và thêm phim yêu thích!
                </Text>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Menu Tuỳ Chỉnh */}
        <PreferencesMenu />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
