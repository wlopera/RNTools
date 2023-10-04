import { FlatList } from "react-native";
import PlaceItem from "./PlaceItem";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const PlaceList = ({ places }) => {
  
  if (!places || places.length === 0) {
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
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
    />
  );
};

export default PlaceList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.primary200
  },
});
