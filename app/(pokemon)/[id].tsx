import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getPokemonDetails } from "@/api/pokeapi";
import { Pokemon } from "@/interfaces/pokemon";

const PokemonDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const [pokemon, setPokemon] = useState<Pokemon>();
  useEffect(() => {
    getPokemonDetails(id).then((data) => setPokemon(data));
    if (pokemon) {
      navigation.setOptions({
        title: pokemon?.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
      });
    }
  }, [pokemon]);
  console.log(pokemon);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{pokemon?.name}</Text>
      </View>
      <View style={styles.card}>
        <Image source={{ uri: pokemon?.image }} style={styles.image} />
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
