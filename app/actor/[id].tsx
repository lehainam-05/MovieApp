/**
 * app/actor/[id].tsx
 *
 * @purpose Trang Controller (Điều khiển chính) cho giao diện Hồ sơ cá nhân diễn viên.
 * @why Đã được tái cấu trúc thành các component con độc lập để tách biệt phần logic layout 
 *      ra khỏi thuật toán điều hướng và fetching API tĩnh. File hiện tại chỉ có nhiệm vụ 
 *      gọi dữ liệu và quy định "cái gì" được render chứ không quan tâm "render như thế nào".
 */

import { useState, useCallback } from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Text,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/colors";
import useFetch from "@/hooks/useFetch";
import { fetchActorDetails, fetchActorMovies } from "@/services/api";

import StickyHeader from "@/components/common/StickyHeader";
import HeroBackdrop from "@/components/common/HeroBackdrop";
import ActorIdentity from "@/components/actor/ActorIdentity";
import ActorBio from "@/components/actor/ActorBio";
import ActorWorks from "@/components/actor/ActorWorks";

const ActorProfile = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // API Fetches
  const { data: actor, loading: loadingActor } = useFetch(() =>
    fetchActorDetails(id as string)
  );
  const { data: movies, loading: loadingMovies } = useFetch(() =>
    fetchActorMovies(id as string)
  );

  const [scrolled, setScrolled] = useState(false);

  // Dynamic Glassmorphism effect trigger
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      setScrolled(offsetY > 10);
    },
    []
  );

  if (loadingActor) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: Colors.background }}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // Graceful failure fallback
  if (!actor) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "white" }}>Actor not found.</Text>
      </View>
    );
  }

  // Name Parsing
  const nameParts = actor.name.split(" ");
  const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : "";
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : nameParts[0];

  const profileUrl = actor.profile_path
    ? `https://image.tmdb.org/t/p/h632${actor.profile_path}`
    : "https://via.placeholder.com/600";

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StickyHeader
        scrolled={scrolled}
        onBackPress={router.back}
        titleNode={
          <Text className="font-bold text-white text-xs tracking-widest uppercase">
            ACTOR PROFILE
          </Text>
        }
        rightNode={
          <>
            <TouchableOpacity>
              <Ionicons name="share-social-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={26} color="white" />
            </TouchableOpacity>
          </>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
          paddingTop: Platform.OS === "ios" ? 100 : 80,
        }}
        bounces={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <HeroBackdrop imageUrl={profileUrl} height={500} />

        <ActorIdentity
          firstName={firstName}
          lastName={lastName}
          popularity={actor.popularity}
          department={actor.known_for_department}
        />

        <ActorBio
          biography={actor.biography}
          birthday={actor.birthday}
          placeOfBirth={actor.place_of_birth}
        />

        <ActorWorks
          movies={movies}
          loading={loadingMovies}
          firstName={firstName}
          lastName={lastName}
        />
      </ScrollView>
    </View>
  );
};

export default ActorProfile;
