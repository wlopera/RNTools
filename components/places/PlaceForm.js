import { useCallback, useState } from "react";
import { TextInput, ScrollView, View, Text, StyleSheet } from "react-native";

import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/places";

function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  function changeTitleHandler(enteredtext) {
    setEnteredTitle(enteredtext);
  }

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  // Para evitar que se caiga en ciclo infinito
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  function savePlaceHandler() {
    // console.log("enteredTitle:", enteredTitle);
    // console.log("selectedImage:", selectedImage);
    // console.log("pickedLocation:", pickedLocation);
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Titulo</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Agregar Lugar</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
