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
                : "bg-dark-200 border-dark-100"
            }`}
            onPress={() => onSelect(item.id)}
          >
            <Text
              className={`text-xs uppercase tracking-wider font-semibold ${
                isActive ? "text-secondary" : "text-light-200"
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
