import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import IconButton from "../components/UI/IconButton";

const Map = ({ navigation, route }) => {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };

  const [seletedLocation, setSeletedLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 8.998971410573342, // Eje Norte-Sur -> centro
    longitude: initialLocation ? initialLocation.lng : -79.52239288938559, // Eje Este-Oeste -> centro
    latitudeDelta: 0.0922, // Area Norte-Sur a ver - acercamiento - nivel de zoom
    longitudeDelta: 0.0421, // Area Este-Oeste a ver - acercamiento - nivel de zoom
  };

  function selectLocationHandler(event) {
    if (initialLocation) {
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSeletedLocation({ lat: lat, lng: lng });
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

  // Funcion efecto para evitar llamas innecesarias o bucles infinitos, utilizar useCallbak
  // en la funcion que se llama en el useLayoutEffect
  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }

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
  }, [navigation, savePickedLocationhandler, initialLocation]);

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
            latitude: seletedLocation.lat,
            longitude: seletedLocation.lng,
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
