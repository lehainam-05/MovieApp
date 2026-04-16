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

  // Yêu cầu ImagePicker tự trả về base64 - hoạt động cả trên Native (Expo Go) và Web (PC)
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
      base64: true, // <-- Tự đính kèm base64 vào kết quả, không cần đọc file thủ công
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      if (asset.base64) {
        const dataUri = `data:image/jpeg;base64,${asset.base64}`;
        updateProfile(dataUri, nickname);
      } else {
        // Fallback nếu base64 không có (hiếm gặp)
        updateProfile(asset.uri, nickname);
      }
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
          <View style={{ width: 96, height: 96, position: 'relative', marginRight: 24 }}>
            {/* Vòng sáng (Glow) quanh Avatar */}
            <View style={{ position: 'absolute', top: -4, bottom: -4, left: -4, right: -4, borderRadius: 9999, opacity: 0.2, backgroundColor: Colors.primary }} />
            <Image
              source={avatarUri ? { uri: avatarUri } : { uri: "https://i.pravatar.cc/300" }}
              style={{ width: 96, height: 96, borderRadius: 48, borderWidth: 1.5, borderColor: Colors.primary }}
            />
            {/* Nút Edit Pencil theo thiết kế Aether */}
            <TouchableOpacity onPress={pickImage} style={{ position: 'absolute', bottom: -4, right: -4, width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' }}>
              <MaterialCommunityIcons name="pencil" size={18} color="#131315" />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', paddingVertical: 4 }}>
            <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold', marginBottom: 6 }}>{nickname}</Text>
            <Text style={{ color: '#A3A3A3', fontSize: 15, fontWeight: '500', marginBottom: 16 }}>{user?.email || "alex.auteur@cinema.com"}</Text>
            <View style={{ alignSelf: 'flex-start', borderRadius: 9999, paddingHorizontal: 16, paddingVertical: 6, borderWidth: 1, backgroundColor: 'rgba(212, 139, 255, 0.05)', borderColor: 'rgba(212, 139, 255, 0.3)' }}>
              <Text style={{ color: Colors.primary, fontSize: 10, fontWeight: '700', letterSpacing: 1.5 }}>PREMIUM MEMBER</Text>
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

        {/* Khối 2: Subscription Plan */}
        <View className="mb-8">
          <Text className="text-white font-bold text-[17px] mb-1">Gói Đăng Ký</Text>
          <Text className="text-neutral-500 text-[10px] uppercase font-bold tracking-[2px] mb-4">THANH TOÁN - THÀNH VIÊN</Text>

          <View className="rounded-[24px] p-5 relative" style={{ backgroundColor: '#131315', overflow: 'hidden' }}>
            <View className="absolute bottom-0 left-0 right-0 h-20 opacity-20" style={{ backgroundColor: Colors.primary, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, transform: [{ scaleY: 1.5 }] }} />

            <View className="flex-row justify-between items-start mb-5 z-10">
              <View>
                <Text style={{ color: Colors.primary, fontSize: 10, fontWeight: '800', letterSpacing: 2, marginBottom: 4 }}>GÓI HIỆN TẠI</Text>
                <Text className="text-white font-black text-2xl mb-1">Cao Cấp 4K</Text>
                <Text className="text-neutral-500 text-xs">Thanh toán tiếp: <Text className="text-white font-bold">12/10/2023</Text></Text>
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
          <Text className="text-neutral-500 text-[10px] uppercase font-bold tracking-[2px] mb-4">THÔNG BÁO - CHẤT LƯỢNG</Text>
          <View className="rounded-[24px] overflow-hidden" style={{ backgroundColor: '#131315' }}>
            <SettingRow icon="bell-outline" title="Thông báo đẩy" type="toggle" toggleValue={isNotificationsEnabled} onToggle={setIsNotificationsEnabled} />
            <SettingRow icon="quality-high" title="Chất lượng tải xuống" value="Ultra HD (4K)" valueColor={Colors.primary} hideBorder />
          </View>
        </View>

        {/* Khối 4: Security & Privacy */}
        <View className="mb-8">
          <Text className="text-white font-bold text-[17px] mb-1">Bảo Mật & Quyền Riêng Tư</Text>
          <Text className="text-neutral-500 text-[10px] uppercase font-bold tracking-[2px] mb-4">BẢO VỆ - TRUY CẬP</Text>
          <View className="rounded-[24px] overflow-hidden" style={{ backgroundColor: '#131315' }}>
            <SettingRow icon="lock-outline" title="Đổi mật khẩu" />
            <SettingRow icon="fingerprint" title="Đăng nhập sinh trắc" type="toggle" toggleValue={isBiometricEnabled} onToggle={setIsBiometricEnabled} hideBorder />
          </View>
        </View>

        <TouchableOpacity
          onPress={logout}
          className="flex-row items-center justify-center"
          style={{
            height: 56,
            marginTop: 16,
            marginBottom: 48,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: 'rgba(255, 59, 48, 0.2)',
            backgroundColor: 'rgba(255, 59, 48, 0.08)'
          }}
        >
          <MaterialCommunityIcons name="logout" size={20} color="#FF3B30" />
          <Text style={{ color: '#FF3B30', fontSize: 13, fontWeight: '700', marginLeft: 8 }}>Đăng xuất khỏi Cinema</Text>
        </TouchableOpacity>

        {/* Version Footer */}
        <View className="items-center pb-8 opacity-30">
          <Text style={{ color: 'white', fontSize: 11, fontWeight: '800', letterSpacing: 4 }}>PHIÊN BẢN 4.2.1</Text>
        </View>

      </ScrollView>

      {/* MODAL: Đổi Nickname */}
      <Modal visible={isEditNameVisible} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24, backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <View style={{ padding: 24, borderRadius: 24, backgroundColor: '#131315', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, marginBottom: 16, textAlign: 'center' }}>Đổi Biệt Danh</Text>

            <TextInput
              autoFocus
              value={tempName}
              onChangeText={setTempName}
              placeholder="Nhập biệt danh mới"
              placeholderTextColor="#666"
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: 16,
                paddingHorizontal: 20,
                height: 56,
                borderRadius: 16,
                marginBottom: 24,
                borderWidth: 1,
                backgroundColor: '#1C1C1E',
                borderColor: 'rgba(212, 139, 255, 0.5)'
              }}
            />

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => setIsEditNameVisible(false)}
                style={{
                  flex: 1,
                  height: 48,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#333333',
                  marginRight: 16
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Huỷ</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSaveNickname}
                style={{
                  flex: 1,
                  height: 48,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.primary
                }}
              >
                <Text style={{ color: 'black', fontWeight: '900', fontSize: 15 }}>Lưu Thay Đổi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default AccountSettingsScreen;
