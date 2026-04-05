/**
 * screens/WatchlistScreen.tsx
 *
 * @purpose Trang hiển thị TOÀN BỘ danh sách phim đã lưu dạng lưới 2 cột.
 * @why Ở tab Profile chỉ hiển thị tối đa 5 poster, bấm "Xem tất cả" sẽ điều hướng đến đây.
 */
import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { useRouter } from 'expo-router';
import { useWatchlist } from '@/store/WatchlistContext';
import WatchlistPosterCard from '@/components/common/WatchlistPosterCard';

const WatchlistScreen = () => {
  const { watchlist } = useWatchlist();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#0B0B0C' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingTop: 60, paddingBottom: 16 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={{ color: Colors.primary, fontSize: 22, fontWeight: '700' }}>Phim Đã Lưu</Text>
        <View style={{ flex: 1 }} />
        <Text style={{ color: '#888', fontSize: 13, fontWeight: '600' }}>{watchlist.length} phim</Text>
      </View>

      <FlatList
        data={watchlist}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        columnWrapperStyle={{ gap: 16, marginBottom: 20 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 100 }}>
            <Ionicons name="heart-outline" size={48} color="#333" />
            <Text style={{ color: '#666', fontSize: 14, marginTop: 16, textAlign: 'center' }}>
              Chưa có phim nào được lưu.{'\n'}Hãy khám phá và thêm phim yêu thích!
            </Text>
          </View>
        }
        renderItem={({ item: movie }) => (
          <View style={{ flex: 1 }}>
            <WatchlistPosterCard
              movie={movie}
              onPress={() => router.push(`/movie/${movie.id}`)}
              width={undefined} // Tự co giãn theo flex
            />
          </View>
        )}
      />
    </View>
  );
};

export default WatchlistScreen;
