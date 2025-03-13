import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { getPokemon } from "@/api/pokeapi";
import { Pokemon } from "@/interfaces/pokemon";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFavorite } from "@/contexts/favoritePokemon";
const Home = () => {
  const { favoritePokemon, toggleFavorite } = useFavorite();
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  useEffect(() => {
    getPokemon().then((data) => setPokemon(data));
  }, []);
  return (
    <View style={{ padding: 15 }}>
      <FlatList
        data={pokemon}
        renderItem={({ item }) => (
          <Link href={`${item.id}`}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Image
                source={{
                  uri: item.image,
                }}
                style={{ width: 100, height: 100 }}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: 10,
                  marginLeft: 10,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {item.name}
                </Text>
                {favoritePokemon.includes(item.id) && (
                  <Ionicons name="heart" size={24} color="red" />
                )}
              </View>
              <Ionicons name="chevron-forward" size={24} color="black" />
            </View>
          </Link>
        )}
      />
    </View>
  );
};

export default Home;
