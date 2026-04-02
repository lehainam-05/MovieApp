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
      horizontal
      data={chips}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ gap: 10, paddingRight: 10 }}
      renderItem={({ item }) => {
        const isActive = item.id === selectedId;

        return (
          <TouchableOpacity
            className={`px-6 py-3 rounded-full border ${
              isActive
                ? "bg-white border-white"
                : "bg-[#13131b] border-[#20222c]"
            }`}
            onPress={() => onSelect(item.id)}
          >
            <Text
              className={`text-sm uppercase tracking-[1.4px] font-bold ${
                isActive ? "text-[#15151a]" : "text-[#8d8d98]"
              }`}
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
