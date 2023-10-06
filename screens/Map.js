import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

import IconButton from "../components/UI/IconButton";

const Map = ({ navigation }) => {
  const [seletedLocation, setSeletedLocation] = useState();
  const region = {
    latitude: 37.78, // Eje Norte-Sur -> centro
    longitude: -122.43, // Eje Este-Oeste -> centro
    latitudeDelta: 0.0922, // Area Norte-Sur a ver - acercamiento - nivel de zoom
    longitudeDelta: 0.0421, // Area Este-Oeste a ver - acercamiento - nivel de zoom
  };

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSeletedLocation({ latitud: lat, longitude: lng });
  }

  // Evitar ciclos de renderizados innecesarios incluso evitar bucles infinitos
  // Funcion flecha envuelta en un callback, devolucion de llamada, que nos permite garantizar
  // que una funcion definida dentro de un componente no se cree innecesarimanete multiple veces
  const savePickedLocationhandler = useCallback(() => {
    if (!seletedLocation) {
      Alert.alert(
        "No existe localización seleccionada",
        "Debe seleccionar una localización, sobre el mapa, primero"
      );
      return;
    }
    navigation.navigate("AppPlace", {
      pickedLat: seletedLocation.lat,
      pickedLng: seletedLocation.lng,
    });
  }, [navigation, seletedLocation]);

  // Funcion efecto para evitar llamas innes}cesarias o bucles infinitos, utilizar useCallbak
  // en la funcion que se llama en el useLayoutEffect
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationhandler}
        />
      ),
    });
  }, [navigation, savePickedLocationhandler]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {seletedLocation && (
        <Marker
          title="Ubicación seleccionada"
          coordinate={{
            latitude: seletedLocation.latitud,
            longitude: seletedLocation.longitude,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: { flex: 1 },
});
