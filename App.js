import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllPlace from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import { useEffect, useState } from "react";

import { init } from "./util/database";
import { Text, View } from "react-native";
import PlaceDetails from "./screens/PlaceDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log("Error inicializando DB:", err);
      });
  }, []);

  if (!dbInitialized) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "pink",
        }}
      >
        <Text
          style={{
            fontSize: 30,
          }}
        >
          Cargando...
        </Text>
      </View>
    );
  }

  if (dbInitialized) {
    return (
      <>
        <StatusBar style="dark" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: Colors.primary500 },
              headerTintColor: Colors.gray700,
              contentStyle: { backgroundColor: Colors.gray700 },
            }}
          >
            <Stack.Screen
              name="AllPlaces"
              component={AllPlace}
              options={({ navigation }) => ({
                title: "Lugares Favoritos",
                headerRight: ({ tintColor }) => (
                  <IconButton
                    icon="add"
                    size={24}
                    color={tintColor}
                    onPress={() => {
                      navigation.navigate("AppPlace");
                    }}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="AppPlace"
              component={AddPlace}
              options={{
                title: "Agregar un Lugar",
              }}
            />
            <Stack.Screen
              name="map"
              component={Map}
              options={{
                title: "Mapa",
              }}
            />
            <Stack.Screen
              name="PlaceDetails"
              component={PlaceDetails}
              options={{
                title: "Detalle del Lugar",
              }}
            ></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
