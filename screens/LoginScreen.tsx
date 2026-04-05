/**
 * screens/LoginScreen.tsx
 * 
 * @purpose Trang cửa ngõ đăng nhập dựa trên thiết kế mẫu (Aether).
 * @why Sử dụng ImageBackground với lớp phủ xuyên thấu (Glassmorphism) cực sâu, 
 *      cấu trúc Form tối giản không viền và đổ bóng quang học cho nút Sign In.
 */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, ImageBackground, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { useAuth } from '@/store/AuthContext';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitLoading, setSubmitLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password || password.length < 6) return;
    setSubmitLoading(true);
    
    // Giả lập Loading xoay tròn Fetch API 1,5s
    setTimeout(async () => {
      await login(email);
      setSubmitLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop" }} // Hình nền phim mờ
      blurRadius={15}
      style={{ flex: 1, backgroundColor: '#000' }}
    >
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.75)' }]} />

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1 justify-center px-4">

          {/* Thẻ Kính Mờ (Glass Card) lớn bọc ngoài */}
          <View 
            className="rounded-[32px] p-6 pt-10 pb-8" 
            style={{ 
              backgroundColor: 'rgba(20, 20, 22, 0.85)', 
              borderColor: 'rgba(255,255,255,0.03)',
              borderWidth: 1
            }}
          >
            
            {/* Header: Logo chữ */}
            <View className="items-center mb-10">
              <View className="flex-row items-center mb-3">
                <Ionicons name="film" size={28} color={Colors.primary} />
                <Text style={{ color: Colors.primary, fontSize: 28, fontWeight: '900', letterSpacing: 8, marginLeft: 12 }}>
                  AETHER
                </Text>
              </View>
              <Text style={{ color: '#888', fontSize: 10, letterSpacing: 2, fontWeight: '600' }}>
                TRẢI NGHIỆM ĐIỆN ẢNH SỐ
              </Text>
            </View>

            {/* Inputs */}
            <View className="mb-4">
              <TextInput 
                placeholder="Địa chỉ Email" 
                placeholderTextColor="#666" 
                style={{ backgroundColor: '#1C1C1E', color: 'white', height: 56, borderRadius: 16, paddingHorizontal: 20, fontSize: 15 }}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View className="mb-4">
              <TextInput 
                placeholder="Mật khẩu" 
                placeholderTextColor="#666" 
                style={{ backgroundColor: '#1C1C1E', color: 'white', height: 56, borderRadius: 16, paddingHorizontal: 20, fontSize: 15 }}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            
            <TouchableOpacity className="self-end mb-8">
              <Text style={{ color: Colors.primary, fontSize: 12, fontWeight: '600' }}>
                Quên mật khẩu?
              </Text>
            </TouchableOpacity>

            {/* Nút Sign In (Có lớp bo sáng) */}
            <TouchableOpacity 
              onPress={handleLogin}
              disabled={isSubmitLoading}
              activeOpacity={0.8}
              style={{
                backgroundColor: Colors.primary,
                height: 56,
                borderRadius: 28,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: Colors.primary,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.4,
                shadowRadius: 16,
                elevation: 10,
                marginBottom: 28
              }}
            >
              {isSubmitLoading ? (
                <ActivityIndicator color="black" />
              ) : (
                <Text style={{ color: '#000', fontSize: 16, fontWeight: '700' }}>Đăng Nhập</Text>
              )}
            </TouchableOpacity>

            {/* Dải phân cách */}
            <View className="flex-row items-center justify-center mb-6 px-4">
              <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.05)' }} />
              <Text style={{ color: '#666', fontSize: 10, letterSpacing: 1, marginHorizontal: 16, fontWeight: '600' }}>
                HOẶC TIẾP TỤC VỚI
              </Text>
              <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.05)' }} />
            </View>

            {/* Third-party Logins */}
            <View className="flex-row gap-4 mb-8">
              <TouchableOpacity style={{ flex: 1, backgroundColor: '#1C1C1E', height: 48, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="logo-google" size={16} color="#aaa" />
                <Text style={{ color: '#aaa', fontSize: 13, fontWeight: '600', marginLeft: 10 }}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, backgroundColor: '#1C1C1E', height: 48, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="logo-apple" size={16} color="#aaa" />
                <Text style={{ color: '#aaa', fontSize: 13, fontWeight: '600', marginLeft: 10 }}>Apple</Text>
              </TouchableOpacity>
            </View>

            {/* Đăng ký */}
            <View className="flex-row items-center justify-center">
              <Text style={{ color: '#888', fontSize: 13, fontWeight: '500' }}>Chưa có tài khoản? </Text>
              <TouchableOpacity>
                <Text style={{ color: Colors.primary, fontSize: 13, fontWeight: '700' }}>Đăng Ký</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

        {/* Cụm Footer Policy dưới cùng */}
        <View className="items-center justify-center pb-8 opacity-40">
           <View className="flex-row gap-6 mb-2">
             <Text style={{ color: 'white', fontSize: 10, letterSpacing: 2 }}>CHÍNH SÁCH</Text>
             <Text style={{ color: 'white', fontSize: 10, letterSpacing: 2 }}>ĐIỀU KHOẢN</Text>
             <Text style={{ color: 'white', fontSize: 10, letterSpacing: 2 }}>HỖ TRỢ</Text>
           </View>
        </View>
        
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LoginScreen;
