import { Pressable, Image, View, Text, StyleSheet } from "react-native";

function PlaceItem(place, onSelect) {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
        <Text>{place.location}</Text>
      </View>
    </Pressable>
  );
}
export default PlaceItem;

const styles = StyleSheet.create({});
