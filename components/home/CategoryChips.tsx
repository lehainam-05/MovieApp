import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { GenreChip } from "@/constants/genres";
import { colors } from "@/constants/colors";

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
          <TouchableOpacity onPress={() => onSelect(item.id)}>
            {isActive ? (
              <LinearGradient
                colors={colors.gradient.chip}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{ borderRadius: 999, paddingHorizontal: 22, paddingVertical: 12 }}
              >
                <Text className="text-secondary text-xs uppercase tracking-wider font-bold">
                  {item.name}
                </Text>
              </LinearGradient>
            ) : (
              <View className="px-6 py-3 rounded-full border bg-dark-200 border-dark-100">
                <Text className="text-xs uppercase tracking-wider font-semibold text-light-200">
                  {item.name}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default CategoryChips;
