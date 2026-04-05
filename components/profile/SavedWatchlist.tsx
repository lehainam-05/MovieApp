/**
 * components/profile/SavedWatchlist.tsx
 * 
 * @purpose Nơi hiển thị lưới trượt ngang (Carousel) bao gồm toàn bộ phim mà người dùng đã thả tim từ Context.
 * @why Khu vực này phụ thuộc cực nặng vào mảng State `watchlist`. Thay vì để Màn hình chính re-render cả trang
 *      sau mỗi lần thêm phim, đặt nó độc lập tại đây giúp React chỉ kiểm tra và render lại mỗi khu vực này.
 */
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useWatchlist } from '@/store/WatchlistContext';
import MoviePosterCard from '@/components/home/MoviePosterCard';

const SavedWatchlist = () => {
  const { watchlist } = useWatchlist();
  const router = useRouter();

  return (
    <View className="mb-10">
      <View className="px-5 mb-4 flex-row justify-between items-end">
        <View>
          <Text className="text-light-200 text-[10px] uppercase font-bold tracking-widest mb-1">Kho Tuyển Chọn</Text>
          <Text className="text-white font-bold text-[22px] tracking-tight">Phim Đã Lưu Của Tôi</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-primary text-[10px] font-black uppercase tracking-widest">Xem Tất Cả</Text>
        </TouchableOpacity>
      </View>

      {/* Hiển thị danh sách ngang nếu có Phim yêu thích */}
      {watchlist.length > 0 ? (
        <FlatList
          horizontal
          data={watchlist}
          keyExtractor={(item, index) => item.id.toString() + index}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push(`/movie/${item.id}` as any)} style={{ width: 140 }}>
              <MoviePosterCard movie={item} />
            </TouchableOpacity>
          )}
        />
      ) : (
        // Hiển thị khung sườn ảo (Empty Placeholder State) khi giỏ rỗng
        <View className="px-5 py-8 bg-dark-200 mx-5 rounded-[24px] items-center border border-dark-100 border-dashed">
          <Ionicons name="film-outline" size={40} color="#ababab" />
          <Text className="text-light-100 text-sm mt-3 text-center px-4 leading-relaxed">
            Kho phim của bạn đang rỗng. Hãy dạo quanh ứng dụng và thả tim lưu vài bộ phim yêu thích nhé!
          </Text>
        </View>
      )}
    </View>
  );
};

export default SavedWatchlist;
