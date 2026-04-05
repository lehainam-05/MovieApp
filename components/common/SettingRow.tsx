/**
 * components/common/SettingRow.tsx
 *
 * @purpose Hàng cài đặt tái sử dụng: Icon + Tiêu đề + Giá trị/Toggle/Chevron.
 * @why Dùng chung cho mọi trang cài đặt (Account, App, Security...).
 *      Tách riêng để khi thay đổi kiểu dáng chỉ cần sửa 1 file duy nhất.
 */
import React from 'react';
import { View, Text, TouchableOpacity, Switch, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

interface SettingRowProps {
  /** Tên icon từ MaterialCommunityIcons */
  icon: string;
  /** Tiêu đề hiển thị */
  title: string;
  /** Giá trị phụ bên phải (tuỳ chọn) */
  value?: string;
  /** Màu của giá trị phụ */
  valueColor?: string;
  /** Loại hiển thị bên phải: 'chevron' (mũi tên) hoặc 'toggle' (công tắc) */
  type?: 'chevron' | 'toggle';
  /** Trạng thái bật/tắt (chỉ dùng khi type = 'toggle') */
  toggleValue?: boolean;
  /** Callback khi toggle thay đổi */
  onToggle?: (value: boolean) => void;
  /** Ẩn đường viền dưới (dùng cho item cuối cùng) */
  hideBorder?: boolean;
  /** Callback khi bấm vào hàng */
  onPress?: () => void;
}

const SettingRow = ({
  icon,
  title,
  value,
  valueColor = '#888',
  type = 'chevron',
  toggleValue,
  onToggle,
  hideBorder,
  onPress,
}: SettingRowProps) => (
  <TouchableOpacity
    activeOpacity={type === 'chevron' ? 0.7 : 1}
    onPress={onPress}
    className={`flex-row items-center justify-between py-4 px-5 ${!hideBorder ? 'border-b border-white/5' : ''}`}
  >
    <View className="flex-row items-center">
      <MaterialCommunityIcons name={icon as any} size={22} color="#A1A1AA" />
      <Text className="text-white font-semibold text-[15px] ml-4">{title}</Text>
    </View>

    <View className="flex-row items-center">
      {value && (
        <Text
          style={{
            color: valueColor,
            fontWeight: valueColor === Colors.primary ? '700' : '400',
            fontSize: 13,
            marginRight: type === 'chevron' ? 8 : 0,
          }}
        >
          {value}
        </Text>
      )}
      {type === 'chevron' && <Ionicons name="chevron-forward" size={18} color="#666" />}
      {type === 'toggle' && (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ false: '#333', true: Colors.primary }}
          thumbColor={Platform.OS === 'ios' ? '#fff' : toggleValue ? '#fff' : '#f4f3f4'}
          style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
        />
      )}
    </View>
  </TouchableOpacity>
);

export default SettingRow;
