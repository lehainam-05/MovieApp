import { FlatList, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
            className="rounded-full overflow-hidden"
            onPress={() => onSelect(item.id)}
          >
            <LinearGradient
              colors={isActive ? ["#F0D9FF", "#C8A2FF"] : ["#181528", "#0F0D23"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className={`px-6 py-3 border rounded-full ${isActive ? "border-accent/40" : "border-dark-100"}`}
            >
              <Text
                className={`text-xs uppercase tracking-wider font-semibold ${
                  isActive ? "text-secondary" : "text-light-200"
                }`}
              >
                {item.name}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default CategoryChips;
