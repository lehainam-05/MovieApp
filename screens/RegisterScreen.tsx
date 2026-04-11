/**
 * screens/RegisterScreen.tsx
 * 
 * @purpose Trang Đăng Ký (Create Account) dựa trên thiết kế mẫu.
 */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { useRouter } from 'expo-router';

const RegisterScreen = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitLoading, setSubmitLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !password || password !== confirmPassword) return;
    setSubmitLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitLoading(false);
      router.replace('/login');
    }, 1500);
  };

  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop" }}
      blurRadius={15}
      style={{ flex: 1, backgroundColor: '#000' }}
    >
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.7)' }]} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

          {/* Header Background (trong suốt lửng lơ) */}
          <View className="items-center justify-center pb-8" style={{ paddingTop: 110 }}>
            <Text style={{ color: Colors.primary, fontSize: 36, fontWeight: '900', letterSpacing: 2 }}>
              CINEMA
            </Text>
            <Text style={{ color: '#888', fontSize: 10, letterSpacing: 1.5, fontWeight: '600', marginTop: 8 }}>
              TRẢI NGHIỆM ĐIỆN ẢNH SỐ
            </Text>
          </View>

          <View className="px-6 py-8 w-full max-w-[400px] self-center flex-1">
            {/* Title & Subtitle */}
            <View className="items-center mb-8">
              <Text style={{ color: 'white', fontSize: 24, fontWeight: '700', marginBottom: 8 }}>
                Tạo Tài Khoản
              </Text>
              <Text style={{ color: '#888', fontSize: 13, fontWeight: '500' }}>
                Gia nhập thế giới điện ảnh đỉnh cao
              </Text>
            </View>

            {/* Inputs */}
            <View className="mb-4">
              <View style={{ backgroundColor: '#18181a', height: 50, borderRadius: 16, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                <Ionicons name="person" size={18} color="#555" style={{ marginRight: 16 }} />
                <TextInput
                  placeholder="Họ và Tên"
                  placeholderTextColor="#555"
                  style={{ flex: 1, color: 'white', fontSize: 15 }}
                  autoCapitalize="words"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
            </View>

            <View className="mb-4">
              <View style={{ backgroundColor: '#18181a', height: 50, borderRadius: 16, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                <Text style={{ color: '#555', fontSize: 20, fontWeight: 'bold', marginRight: 16 }}>@</Text>
                <TextInput
                  placeholder="Địa chỉ Email"
                  placeholderTextColor="#555"
                  style={{ flex: 1, color: 'white', fontSize: 15 }}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View className="mb-4">
              <View style={{ backgroundColor: '#18181a', height: 50, borderRadius: 16, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                <Ionicons name="lock-closed" size={18} color="#555" style={{ marginRight: 16 }} />
                <TextInput
                  placeholder="Mật khẩu"
                  placeholderTextColor="#555"
                  style={{ flex: 1, color: 'white', fontSize: 15 }}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="#555" />
                </TouchableOpacity>
              </View>
            </View>

            <View className="mb-6">
              <View style={{
                backgroundColor: '#18181a',
                height: 50,
                borderRadius: 16,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
                borderWidth: confirmPassword.length > 0 && confirmPassword !== password ? 1 : 0,
                borderColor: '#ef4444'
              }}>
                <Ionicons name="shield-checkmark" size={18} color="#555" style={{ marginRight: 16 }} />
                <TextInput
                  placeholder="Xác nhận Mật khẩu"
                  placeholderTextColor="#555"
                  style={{ flex: 1, color: 'white', fontSize: 15 }}
                  secureTextEntry={!showPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>
              {confirmPassword.length > 0 && confirmPassword !== password && (
                <Text style={{ color: '#ef4444', fontSize: 12, marginTop: 8, marginLeft: 16 }}>
                  Mật khẩu không khớp
                </Text>
              )}
            </View>

            {/* Nút Sign Up */}
            <TouchableOpacity
              onPress={handleRegister}
              disabled={isSubmitLoading}
              activeOpacity={0.8}
              style={{
                backgroundColor: Colors.primary, // "#e08efe"
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
                <Text style={{ color: '#000', fontSize: 16, fontWeight: '700' }}>Đăng ký</Text>
              )}
            </TouchableOpacity>

            {/* Dải phân cách */}
            <View className="flex-row items-center justify-center mb-6">
              <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.05)' }} />
              <Text style={{ color: '#555', fontSize: 10, letterSpacing: 1, marginHorizontal: 16, fontWeight: '600' }}>
                HOẶC ĐĂNG KÝ VỚI
              </Text>
              <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.05)' }} />
            </View>

            {/* Third-party Logins */}
            <View className="flex-row gap-4 mb-10">
              <TouchableOpacity style={{ flex: 1, backgroundColor: '#18181a', height: 48, borderRadius: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="logo-google" size={16} color="#aaa" />
                <Text style={{ color: '#aaa', fontSize: 13, fontWeight: '600', marginLeft: 10 }}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, backgroundColor: '#18181a', height: 48, borderRadius: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="logo-apple" size={16} color="#aaa" />
                <Text style={{ color: '#aaa', fontSize: 13, fontWeight: '600', marginLeft: 10 }}>Apple</Text>
              </TouchableOpacity>
            </View>

            {/* Đăng nhập */}
            <View className="flex-row items-center justify-center mb-10">
              <Text style={{ color: '#888', fontSize: 13, fontWeight: '500' }}>Đã có tài khoản? </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={{ color: Colors.primary, fontSize: 13, fontWeight: '700' }}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>

            <View className="items-center mt-auto pb-4">
              <Text style={{ color: '#555', fontSize: 9, textAlign: 'center', lineHeight: 14 }}>
                BẰNG VIỆC ĐĂNG KÝ, BẠN ĐỒNG Ý VỚI CÁC{'\n'}
                <Text style={{ color: '#666', fontWeight: '700' }}>ĐIỀU KHOẢN DỊCH VỤ</Text> VÀ <Text style={{ color: '#666', fontWeight: '700' }}>CHÍNH SÁCH BẢO MẬT</Text>.
              </Text>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default RegisterScreen;
