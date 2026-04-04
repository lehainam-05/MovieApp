/**
 * components/profile/UpgradeTierBanner.tsx
 * 
 * @purpose Vẽ dải Banner Quảng cáo / Mời gọi nâng cấp hạng thành viên lên gói trả phí (Premium).
 * @why Những thành phần dạng Promos (khuyến mãi) kiểu này thường xuyên bị thay đổi để A/B Testing 
 *      hoặc bị ẩn đi nếu người dùng thực sự đã mua gói Premium. Phải tách rời.
 */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const UpgradeTierBanner = () => {
  return (
    <View className="px-5 mb-8">
      <View className="rounded-[28px] p-6" style={{ backgroundColor: "#D48BFF" }}>
        <Text className="font-black text-xl text-black mb-2 tracking-tight">Cấp Bậc Premium</Text>
        <Text className="text-black/70 text-xs font-semibold leading-relaxed mb-4">
          Nâng cấp để trải nghiệm xem phim chất lượng 8K nét căng và âm thanh vòm spatial audio đa chiều.
        </Text>

        <TouchableOpacity className="bg-white/40 rounded-full py-3 items-center justify-center">
          <Text className="text-white font-black text-xs uppercase tracking-widest">Xem Cấu Hình Gói</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpgradeTierBanner;
