import { Pokemon } from "@/interfaces/pokemon";
export const getPokemon = async (limit: number = 151): Promise<Pokemon[]> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
  );
  const data = await response.json();
  return data.results.map((item: Pokemon, index: number) => ({
    ...item,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`,
    id: index + 1,
  }));
};

export const getPokemonDetails = async (id: string): Promise<Pokemon> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return {
    ...data,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
  };
};
