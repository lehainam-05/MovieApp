// Component SearchBar dùng lại cho màn search
// Input: placeholder, value text, callback thay đổi, callback nhấn
// Output: UI thanh tìm kiếm với icon và ô nhập text
import { View, TextInput, Image } from "react-native";

import { icons } from "@/constants/icons";

interface Props {
  placeholder: string; // chữ gợi ý trong ô input
  value?: string; // giá trị text đang nhập
  onChangeText?: (text: string) => void; // callback khi text thay đổi
  onPress?: () => void; // callback khi bấm vào input (nếu cần)
}

const SearchBar = ({ placeholder, value, onChangeText, onPress }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      {/* Icon kính lúp */}
      <Image
        source={icons.search}
        className="w-5 h-5"
        style={{ width: 20, height: 20 }}
        resizeMode="contain"
        tintColor="#AB8BFF"
      />

      {/* Ô nhập tìm kiếm */}
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-white"
        placeholderTextColor="#A8B5DB"
      />
    </View>
  );
};

export default SearchBar;
