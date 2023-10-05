import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export const getMapPreview = ({ title, description, latitude, longitude }) => {
  return (
    <MapView
      style={styles.image}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: latitude, // 8.998971410573342,
        longitude: longitude, // -79.52239288938559,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      }}
    >
      <Marker
        key={1}
        coordinate={{
          latitude: latitude,
          longitude: longitude,
        }}
        title={title}
        description={description}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});
