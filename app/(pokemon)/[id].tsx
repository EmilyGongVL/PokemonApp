import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getPokemonDetails } from "@/api/pokeapi";
import { Pokemon } from "@/interfaces/pokemon";

const PokemonDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon>();
  useEffect(() => {
    getPokemonDetails(id).then((data) => setPokemon(data));
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pokemon?.name}</Text>
      <Image source={{ uri: pokemon?.image }} style={styles.image} />
      <Text style={styles.text}>Height: {pokemon?.height}</Text>
      <Text style={styles.text}>
        Abilities:{" "}
        {pokemon?.abilities?.map((ability) => ability.ability.name).join(", ")}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
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
