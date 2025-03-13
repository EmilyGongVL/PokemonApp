import React from "react";
import { Stack } from "expo-router";
import { FavoriteProvider } from "@/contexts/favoritePokemon";

const Layout = () => {
  //Stack is a component that will help us to navigate between pages
  return (
    <FavoriteProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#f4511e" },
          headerTintColor: "#fff",
        }}
      >
        {/* this is where we define and customize the pages */}
        <Stack.Screen name="index" options={{ title: "PokePool" }} />
        <Stack.Screen name="(pokemon)/[id]" options={{ title: "" }} />
      </Stack>
    </FavoriteProvider>
  );
};

export default Layout;
