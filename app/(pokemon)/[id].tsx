import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getPokemonDetails } from "@/api/pokeapi";
import { Pokemon } from "@/interfaces/pokemon";
import { useFavorite } from "@/contexts/favoritePokemon";

const PokemonDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { favoritePokemon, toggleFavorite } = useFavorite();
  const navigation = useNavigation();
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [currentSpriteIndex, setCurrentSpriteIndex] = useState(0);

  useEffect(() => {
    getPokemonDetails(id).then((data) => setPokemon(data));
    if (pokemon) {
      navigation.setOptions({
        title: pokemon?.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        headerRight: () => (
          <TouchableOpacity onPress={() => toggleFavorite(pokemon.id)}>
            <Ionicons
              name={
                favoritePokemon.includes(pokemon.id) ? "heart" : "heart-outline"
              }
              size={24}
              color="white"
            />
          </TouchableOpacity>
        ),
      });
    }
  }, [pokemon, favoritePokemon]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpriteIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 1000); // Change sprite every 1 second

    return () => clearInterval(interval);
  }, []);

  const getCurrentSprite = () => {
    if (!pokemon?.sprites) return "";
    const sprites = [
      pokemon.sprites.front_default,
      pokemon.sprites.front_shiny,
      pokemon.sprites.back_shiny,
      pokemon.sprites.back_default,
    ];
    return sprites[currentSpriteIndex] || sprites[0];
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{pokemon?.name}</Text>
      </View>
      <View style={styles.card}>
        <Image source={{ uri: getCurrentSprite() }} style={styles.image} />
      </View>
      <View style={styles.card}>
        <Text>Height</Text>
        <Text>{pokemon?.height}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
  },
  card: {
    marginTop: 10,
    padding: 15,
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "capitalize",
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});
export default PokemonDetail;
