import React, { createContext, useState, useContext, ReactNode } from "react";

interface FavoriteContextType {
  favoritePokemon: string[];
  toggleFavorite: (id: string) => void;
}

interface FavoriteProviderProps {
  children: ReactNode;
}

const FavoriteContext = createContext<FavoriteContextType>({
  favoritePokemon: [],
  toggleFavorite: () => {},
});

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
};

export const FavoriteProvider: React.FC<FavoriteProviderProps> = ({
  children,
}) => {
  const [favoritePokemon, setFavoritePokemon] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavoritePokemon((prev) => {
      if (prev.includes(id)) {
        return prev.filter((pokemonId) => pokemonId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <FavoriteContext.Provider value={{ favoritePokemon, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
