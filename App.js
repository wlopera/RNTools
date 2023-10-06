import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllPlace from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {backgroundColor: Colors.primary500},
          headerTintColor: Colors.gray700,
          contentStyle: {backgroundColor: Colors.gray700},
        }}>
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
