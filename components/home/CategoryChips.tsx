import { LinearGradient } from "expo-linear-gradient";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

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
          <TouchableOpacity onPress={() => onSelect(item.id)} activeOpacity={0.9}>
            {isActive ? (
              <LinearGradient
                colors={["#9D50BB", "#AB57AC", "#C084FC"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="px-6 py-3 rounded-full shadow-lg"
                style={{
                  shadowColor: "#AB57AC",
                  shadowOpacity: 0.35,
                  shadowRadius: 14,
                  shadowOffset: { width: 0, height: 8 },
                  elevation: 7,
                }}
              >
                <Text className="text-[#120f1b] text-xs uppercase tracking-wider font-extrabold">
                  {item.name}
                </Text>
              </LinearGradient>
            ) : (
              <View className="px-6 py-3 rounded-full border border-white/10 bg-white/[0.07]">
                <Text className="text-xs uppercase tracking-wider font-semibold text-white/80">
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
