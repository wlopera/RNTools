import { Alert, Image, Platform, StyleSheet, Text, View } from "react-native";
import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

const ImagePicker = () => {
  const [pickedImage, setPickedImage] = useState();

  // Permisos para IOS
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermission() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const responsePermission = await requestPermission();

      return responsePermission.granted; // true/false: otorga o no el permiso
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Permisos Insuficientes",
        "Necesitas otorgar permisos a la camara para utilizar esta APP"
      );
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    console.log(11111)
    // Solo para IOS
    const hasPermission = await verifyPermission();

    if (hasPermission || Platform.OS === "android") {
      const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });
      setPickedImage(image.assets[0].uri);
      console.log("Imagen:", image.assets[0]);
    }
  }

  let imagePreview = <Text>No existe imagen tomada todavía</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Tomar Imagen
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
