/**
 * components/profile/UserInfoCard.tsx
 *
 * @purpose Thẻ thông tin người dùng trên trang Profile.
 * @why Dùng inline style thay vì className trên LinearGradient
 *      vì NativeWind không inject được flex-row lên thư viện bên thứ ba.
 */
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/store/AuthContext';

const UserInfoCard = () => {
  const { avatarUri, nickname, user } = useAuth();
  const displayName = nickname?.trim() || 'Thành Viên\nCao Cấp';

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#2A1D38', '#141217']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        {/* Avatar */}
        <View style={styles.avatarBox}>
          <Image
            source={{ uri: avatarUri }}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </View>

        {/* Cột thông tin */}
        <View style={styles.infoCol}>
          <Text style={styles.emailLabel} numberOfLines={1}>
            {user?.email ? user.email.split('@')[0].toUpperCase() : 'THÀNH VIÊN'}
          </Text>
          <Text style={styles.nickname} numberOfLines={2}>
            {displayName}
          </Text>

          {/* Badge */}
          <View style={styles.badge}>
            <Ionicons name="star" size={10} color="#D48BFF" />
            <Text style={styles.badgeText}>PREMIUM STATUS</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 28,
    overflow: 'hidden',
  },
  avatarBox: {
    width: 80,
    height: 100,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#1C1C1E',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  infoCol: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  emailLabel: {
    color: '#D48BFF',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  nickname: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 30,
    marginBottom: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    backgroundColor: 'rgba(212, 139, 255, 0.15)',
  },
  badgeText: {
    color: '#D48BFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginLeft: 6,
    textTransform: 'uppercase',
  },
});

export default UserInfoCard;
