how to make this app

shortcuts:
rnfe -> create a new function component

1. make a new react native project
   npx create-expo-app EmilyPokeApp -t expo-template-blank-typescript
2. install dependencies
   npx expo install expo-router react-native-safe-area-context react-native-screens
3. config navigation
   delete App.tsx
   create a new app folder
   inside app folder, create index.tsx file (this is the home page or we call it root)
   inside packages.json,change "main" value. (this is the entry point of our application, where the app starts)
   ```
   {"main": "expo-router/entry"}
   ```
   inside app.json, add a "scheme"(app url start with this scheme) and "experiments"(this will help us to use relative path in our application):
   ```
   {
    "name": "EmilyPokeApp",
    "scheme": "emilypokeapp",
    "experiments": {
      "tsconfigPaths": true
    }
   }
   ```
   inside babel.config.js, add a "plugins" array:
   ```
   plugins: [
     "expo-router/babel",
   ],
   ```
   test: npx expo
4. config tsconfig.json with adding "paths" array:
   ```
   "paths": {
     "@/*": ["./*"]
   }
   ```
   this will help us to use relative path in our application
5. create \_layout.tsx file under app folder
