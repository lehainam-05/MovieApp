/**
 * components/home/CategoryChips.tsx
 *
 * @purpose Danh sách các nút tròn bo góc (Chip) để lọc phim theo thể loại (Action, Romance,...).
 * @why Việc cho phép người dùng lướt ngang và chạm (Tap) để lọc phim nhanh hơn rất nhiều so với 
 *      việc phải bắt họ mở 1 cái danh sách (Dropdown) rườm rà.
 */
import { FlatList, Text, TouchableOpacity } from "react-native";
import { GenreChip } from "@/constants/genres";

interface CategoryChipsProps {
  chips: GenreChip[];
  selectedId: number;
  onSelect: (id: number) => void;
}

const CategoryChips = ({ chips, selectedId, onSelect }: CategoryChipsProps) => {
  return (
    <FlatList
      horizontal // cuộn theo hàng ngang
      data={chips}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ gap: 10, paddingRight: 20 }}
      renderItem={({ item }) => {
        const isActive = item.id === selectedId; // kiểm tra xem chip có đang chọn

        return (
          <TouchableOpacity
            className={`px-5 py-2.5 rounded-full border ${
              isActive
                ? "bg-white border-white"
                : "border-white/5"
            }`}
            style={
              !isActive
                ? { backgroundColor: "rgba(31,31,31,0.9)" }
                : undefined
            }
            onPress={() => onSelect(item.id)} // bấm chọn thể loại
            activeOpacity={0.7}
          >
            <Text
              className={`font-bold uppercase ${
                isActive ? "text-black" : "text-on-surface-variant"
              }`}
              style={{ fontSize: 11, letterSpacing: 1.5 }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default CategoryChips;
