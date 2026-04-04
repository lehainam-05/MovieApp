import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { useRouter } from 'expo-router';
import { useAuth } from '@/store/AuthContext';

const PreferencesMenu = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const MenuItem = ({ icon, title, subtitle, isLogout = false, onPress }: any) => (
    <TouchableOpacity 
      activeOpacity={0.7}
      onPress={onPress}
      className={`flex-row items-center justify-between p-4 ${!isLogout ? 'border-b border-white/5' : ''}`}
    >
      <View className="flex-row items-center flex-1 pr-4">
        <View 
          className="w-12 h-12 rounded-2xl items-center justify-center mr-4"
          style={{ backgroundColor: isLogout ? 'rgba(255, 59, 48, 0.05)' : 'rgba(212, 139, 255, 0.05)' }}
        >
          {isLogout ? (
            <MaterialCommunityIcons name="logout" size={20} color="#FF3B30" />
          ) : (
            <MaterialCommunityIcons name={icon} size={20} color={title === 'App Preferences' ? '#FF8BE6' : (title === 'Help & Support' ? '#FFA58B' : Colors.primary)} />
          )}
        </View>
        <View className="flex-1">
          <Text className="text-white font-bold text-[15px] mb-0.5">{title}</Text>
          <Text className="text-neutral-500 text-[11px] leading-tight" numberOfLines={2}>{subtitle}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#666" />
    </TouchableOpacity>
  );

  return (
    <View className="px-5 mb-8">
      <Text className="text-white font-bold text-[22px] mb-5 tracking-tight">Tuỳ Chỉnh</Text>
      
      <View className="rounded-[24px] overflow-hidden border border-white/5" style={{ backgroundColor: '#131315' }}>
        <MenuItem 
          icon="account-circle" 
          title="Cài Đặt Tài Khoản" 
          subtitle="Email, mật khẩu và thanh toán gói dịch vụ" 
          onPress={() => router.push('/settings/account')}
        />
        <MenuItem 
          icon="tune-variant" 
          title="Tuỳ Chỉnh Ứng Dụng" 
          subtitle="Chất lượng tải, phát lại và thông báo" 
        />
        <MenuItem 
          icon="help-box" 
          title="Trợ Giúp & Hỗ Trợ" 
          subtitle="Câu hỏi thường gặp, hỗ trợ khách hàng" 
        />
        <MenuItem 
          isLogout 
          title="Đăng Xuất" 
          subtitle="Thoát tài khoản trên thiết bị này" 
          onPress={logout}
        />
      </View>
    </View>
  );
};

export default PreferencesMenu;
