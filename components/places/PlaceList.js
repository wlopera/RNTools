import { FlatList } from "react-native";
import PlaceItem from "./PlaceItem";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

const PlaceList = ({ places }) => {
  // Importar el gancho de navegacion para tener acceso a los componentes de navegacion
  const navigation = useNavigation();

  function selectPlaceHandler(id) {
    navigation.navigate("PlaceDetails", {
      placeId: id,
    });
  }

  if (places && places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No existen lugares agregados todavía.
        </Text>
        <Text style={styles.fallbackText}>Comience agregando alguno!</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        //<PlaceItem place={item} onSelect={()=>selectPlaceHandler(item.id)} />
        <PlaceItem place={item} onSelect={selectPlaceHandler} />
      )}
    />
  );
};

export default PlaceList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.primary200,
  },
});
