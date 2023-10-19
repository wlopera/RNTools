import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";

const PlaceDetails = ({ route }) => {
  function showOnMapHandler() {
    
  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {}, [selectedPlaceId]);

  return (
    <ScrollView>
      <Image style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>PlaceDetails: {selectedPlaceId}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          Ver el Mapa
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
