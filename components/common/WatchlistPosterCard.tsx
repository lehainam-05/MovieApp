/**
 * components/common/WatchlistPosterCard.tsx
 *
 * @purpose Thẻ Poster phim tái sử dụng cho mọi nơi hiển thị phim đã lưu.
 * @why Tránh copy-paste cùng một khối UI (poster + badge điểm + tên + năm)
 *      ở nhiều màn hình khác nhau (Profile, Watchlist, ...).
 */
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

interface WatchlistPosterCardProps {
  movie: Movie;
  onPress: () => void;
  /** Chiều rộng tuỳ chỉnh, mặc định 144 (w-36) */
  width?: number;
}

const WatchlistPosterCard = ({ movie, onPress, width = 144 }: WatchlistPosterCardProps) => {
  const posterUri = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/300x450/1C1C1E/666.png?text=No+Image';

  return (
    <TouchableOpacity onPress={onPress} style={{ width }}>
      {/* Khung Poster */}
      <View style={[styles.posterBox, { width, height: width * 1.44 }]}>
        <Image source={{ uri: posterUri }} style={styles.posterImage} resizeMode="cover" />
        {/* Badge điểm góc dưới trái */}
        <View style={styles.badge}>
          <Text style={styles.badgePrefix}>PD.</Text>
          <Text style={styles.badgeScore}>{movie.vote_average?.toFixed(1)}</Text>
        </View>
      </View>

      {/* Thông tin phim */}
      <Text style={[styles.title, { width }]} numberOfLines={1}>{movie.title}</Text>
      <Text style={styles.meta}>
        {movie.vote_average?.toFixed(1)} • {movie.release_date?.split('-')[0]}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  posterBox: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1C1C1E',
    marginBottom: 8,
    position: 'relative',
  },
  posterImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgePrefix: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: '800',
  },
  badgeScore: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  meta: {
    color: '#888',
    fontSize: 11,
    fontWeight: '600',
  },
});

export default WatchlistPosterCard;
