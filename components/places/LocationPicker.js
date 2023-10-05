import { Alert, StyleSheet, Text, View } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";

const LocationPicker = () => {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  async function verifyPermissions(params) {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const responsePermission = await requestPermission();

      return responsePermission.granted; // true/false: otorga o no el permiso
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Permisos Insuficientes",
        "Necesitas otorgar permisos de localización para utilizar esta APP"
      );
      return false;
    }
    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (hasPermission) {
      const location = await getCurrentPositionAsync();
      console.log("Localizacion del dispositivo:", location);
    }
  }

  function pickOnMapHandler() {}

  return (
    <View>
      <View style={styles.mapPreview}>
        <Text>Actualmente no existe Localización</Text>
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Localización del Usuario
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Elegir en el Mapa
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
