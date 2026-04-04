/**
 * screens/AccountSettingsScreen.tsx
 * 
 * @purpose Trang tinh chỉnh Cấu hình (Account Settings) được Clone tỉ lệ 1:1 theo bản vẽ AETHER.
 * @why Tách riêng biệt khỏi bộ Router. Tái hiện từng pixel của các khối Glass Card, 
 *      các Subtitle "IDENTITY • CUSTOMIZATION" và hệ thống nút bấm, toggle siêu việt.
 */
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, TextInput, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { useRouter } from 'expo-router';
import { useAuth } from '@/store/AuthContext';
import SettingRow from '@/components/common/SettingRow';
import * as ImagePicker from 'expo-image-picker';

const AccountSettingsScreen = () => {
  const router = useRouter();
  const { user, logout, avatarUri, nickname, updateProfile } = useAuth();

  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);

  // Trạng thái cho Edit Nickname Modal
  const [isEditNameVisible, setIsEditNameVisible] = useState(false);
  const [tempName, setTempName] = useState("");

  // Hàm móc vào Thư viện Ảnh của điện thoại
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Cho phép người dùng Crop thành hình vuông
      aspect: [1, 1],
      quality: 0.5, // Nén ảnh nhẹ cho mượt Máy
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      updateProfile(uri, nickname); // Cập nhật hình lên Tầng cao nhất
    }
  };

  const handleSaveNickname = async () => {
    if (tempName.trim().length > 0) {
      updateProfile(avatarUri, tempName.trim());
    }
    setIsEditNameVisible(false);
  };

  // (SettingRow đã được tách ra components/common/SettingRow.tsx)

  return (
    <View style={{ flex: 1, backgroundColor: '#0B0B0C' }}>
      {/* Header Điều Hướng */}
      <View style={{ paddingTop: Platform.OS === 'ios' ? 60 : 44, paddingHorizontal: 24, paddingBottom: 16, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ color: Colors.primary, fontSize: 22, fontWeight: '700' }}>Cài Đặt Tài Khoản</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160, paddingHorizontal: 20 }}
      >
        {/* Khối Profile Card Phát Sáng */}
        <View className="flex-row items-center rounded-3xl p-5 mb-8" style={{ backgroundColor: '#131315', shadowColor: Colors.primary, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20 }}>
          <View className="relative mr-4">
            {/* Vòng sáng (Glow) quanh Avatar */}
            <View className="absolute -inset-1 rounded-full opacity-30" style={{ backgroundColor: Colors.primary }} />
            <Image
              source={{ uri: avatarUri }}
              className="w-20 h-20 rounded-full border-2"
              style={{ borderColor: Colors.primary }}
            />
            {/* Nút Edit Pencil nhỏ xíu cắm đè lên góc */}
            <TouchableOpacity onPress={pickImage} className="absolute bottom-0 right-0 w-7 h-7 rounded-full items-center justify-center border-2 border-[#131315]" style={{ backgroundColor: Colors.primary }}>
              <MaterialCommunityIcons name="pencil" size={12} color="black" />
            </TouchableOpacity>
          </View>
          <View className="flex-1 justify-center">
            <Text className="text-white font-bold text-xl">{nickname}</Text>
            <Text className="text-white text-[13px] font-medium mt-1 mb-2">{user?.email || "alex.auteur@cinema.com"}</Text>
            <View className="self-start rounded-full px-3 py-1 border" style={{ backgroundColor: 'rgba(212, 139, 255, 0.1)', borderColor: 'rgba(212, 139, 255, 0.2)' }}>
              <Text style={{ color: Colors.primary, fontSize: 9, fontWeight: '800', letterSpacing: 1 }}>THÀNH VIÊN CAO CẤP</Text>
            </View>
          </View>
        </View>

        {/* Khối 1: Profile & Personalization */}
        <View className="mb-8">
          <Text className="text-white font-bold text-[17px] mb-1">Hồ Sơ & Cá Nhân Hoá</Text>
          <Text className="text-neutral-500 text-[10px] uppercase font-bold tracking-[2px] mb-4">DANH TÍNH • TUỲ BIẾN</Text>
          <View className="rounded-[24px] overflow-hidden" style={{ backgroundColor: '#131315' }}>
            <SettingRow icon="face-man-profile" title="Đổi ảnh đại diện" onPress={pickImage} />
            <SettingRow
              icon="badge-account-horizontal-outline"
              title="Đổi biệt danh"
              value={nickname}
              hideBorder
              onPress={() => {
                setTempName(nickname);
                setIsEditNameVisible(true);
              }}
            />
          </View>
        </View>

        {/* Khối 2: Subscription Plan (Phiên bản Thẻ Nhấn Cực Mạnh) */}
        <View className="mb-8">
          <Text className="text-white font-bold text-[17px] mb-1">Gói Đăng Ký</Text>
          <Text className="text-neutral-500 text-[10px] uppercase font-bold tracking-[2px] mb-4">THANH TOÁN • THÀNH VIÊN</Text>

          <View className="rounded-[24px] p-5 relative" style={{ backgroundColor: '#131315', overflow: 'hidden' }}>
            {/* Glow ngầm dưới viền mờ */}
            <View className="absolute bottom-0 left-0 right-0 h-20 opacity-20" style={{ backgroundColor: Colors.primary, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, transform: [{ scaleY: 1.5 }] }} />

            <View className="flex-row justify-between items-start mb-5 z-10">
              <View>
                <Text style={{ color: Colors.primary, fontSize: 10, fontWeight: '800', letterSpacing: 2, marginBottom: 4 }}>GÓI HIỆN TẠI</Text>
                <Text className="text-white font-black text-2xl mb-1">Cao Cấp 4K</Text>
                <Text className="text-neutral-400 text-xs">Thanh toán tiếp: <Text className="text-white font-bold">12/10/2023</Text></Text>
              </View>
              <View className="w-12 h-12 rounded-2xl items-center justify-center bg-[#1C1C1E]">
                <MaterialCommunityIcons name="monitor-shimmer" size={24} color={Colors.primary} />
              </View>
            </View>

            <TouchableOpacity className="h-12 rounded-full items-center justify-center z-10" style={{ backgroundColor: Colors.primary }}>
              <Text className="text-black font-bold text-[15px]">Quản Lý Gói</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Khối 3: App Settings */}
        <View className="mb-8">
          <Text className="text-white font-bold text-[17px] mb-1">Cài Đặt Ứng Dụng</Text>
          <Text className="text-neutral-500 text-[10px] uppercase font-bold tracking-[2px] mb-4">THÔNG BÁO • CHẤT LƯỢNG</Text>
          <View className="rounded-[24px] overflow-hidden" style={{ backgroundColor: '#131315' }}>
            <SettingRow icon="bell-outline" title="Thông báo đẩy" type="toggle" toggleValue={isNotificationsEnabled} onToggle={setIsNotificationsEnabled} />
            <SettingRow icon="quality-high" title="Chất lượng tải xuống" value="Ultra HD (4K)" valueColor={Colors.primary} hideBorder />
          </View>
        </View>

        {/* Khối 4: Security & Privacy */}
        <View className="mb-8">
          <Text className="text-white font-bold text-[17px] mb-1">Bảo Mật & Quyền Riêng Tư</Text>
          <Text className="text-neutral-500 text-[10px] uppercase font-bold tracking-[2px] mb-4">BẢO VỆ • TRUY CẬP</Text>
          <View className="rounded-[24px] overflow-hidden" style={{ backgroundColor: '#131315' }}>
            <SettingRow icon="lock-outline" title="Đổi mật khẩu" />
            <SettingRow icon="fingerprint" title="Đăng nhập sinh trắc" type="toggle" toggleValue={isBiometricEnabled} onToggle={setIsBiometricEnabled} hideBorder />
          </View>
        </View>

        <TouchableOpacity
          onPress={logout}
          className="h-14 rounded-2xl flex-row items-center justify-center border border-red-500/20 mb-12 mt-4"
          style={{ backgroundColor: 'rgba(255, 59, 48, 0.08)' }}
        >
          <MaterialCommunityIcons name="logout" size={20} color="#FF3B30" />
          <Text style={{ color: '#FF3B30', fontSize: 13, fontWeight: '700', marginLeft: 8 }}>Đăng xuất khỏi Aether</Text>
        </TouchableOpacity>

        {/* Version Footer */}
        <View className="items-center pb-8 opacity-30">
          <Text style={{ color: 'white', fontSize: 11, fontWeight: '800', letterSpacing: 4 }}>PHIÊN BẢN 4.2.1</Text>
        </View>

      </ScrollView>

      {/* MODAL: Đổi Nickname đúc bằng bóng đêm */}
      <Modal visible={isEditNameVisible} transparent animationType="fade">
        <View className="flex-1 justify-center px-6" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <View className="p-6 rounded-3xl" style={{ backgroundColor: '#131315', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' }}>
            <Text className="text-white font-bold text-lg mb-4 text-center">Đổi Biệt Danh</Text>

            <TextInput
              autoFocus
              value={tempName}
              onChangeText={setTempName}
              placeholder="Nhập biệt danh mới"
              placeholderTextColor="#666"
              className="text-white font-semibold text-base px-5 h-14 rounded-2xl mb-6 border"
              style={{ backgroundColor: '#1C1C1E', borderColor: Colors.primary + '50' }} // Focus hắt màu tím
            />

            <View className="flex-row gap-4">
              <TouchableOpacity
                onPress={() => setIsEditNameVisible(false)}
                className="flex-1 h-12 rounded-xl items-center justify-center bg-[#1C1C1E]"
              >
                <Text className="text-white font-bold text-sm">Huỷ</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSaveNickname}
                className="flex-1 h-12 rounded-xl items-center justify-center"
                style={{ backgroundColor: Colors.primary }}
              >
                <Text className="text-black font-black text-sm">Lưu Thay Đổi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default AccountSettingsScreen;
