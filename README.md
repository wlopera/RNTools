# RNTools
APP React native usar herramientas del dispositivo. Camara, Posición Geográfica

### APP React Native Tools. Herramientas del dispositivo móvil

##### Crear proyecto RNTools
* expo init RNTools

##### Ver documento: doc/React Native - RNTools.docx

  ![image](https://github.com/wlopera/RNTools/assets/7141537/9d66778d-796c-4082-9f4d-caeef2bac4fc)

* Agregar librería de navegación
* npm install @react-navigation/native @react-navigation/native-stack
* Se agregan al package.json

```
…
"dependencies": {
    "@react-navigation/native": "^6.1.8",
    "@react-navigation/native-stack": "^6.9.14",
    "expo": "~49.0.13",
    "expo-status-bar": "~1.6.0",
    "react": "18.2.0",
    "react-native": "0.72.5"
  },
…
```

* Agregar navegación en App.js

```
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllPlace from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="AllPlaces" component={AllPlace} />
          <Stack.Screen name="AppPlaces" component={AddPlace} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
```

![image](https://github.com/wlopera/RNTools/assets/7141537/4a379762-b144-4b4b-9dd4-1d4623effb00)

### Uso de la cámara del dispositivo

#### Consultar la documentación
* https://docs.expo.dev/versions/latest/sdk/camera/

![image](https://github.com/wlopera/RNTools/assets/7141537/e0f533ea-10ee-4c9b-a887-d25065f6d9cb)

* El paquete permite controlar la cámara, incluso crear nuestra propia interface
* El Paquete ImagePicker permite abrir las fotos o iniciar la cámara
  -- npx expo install expo-image-picker

![image](https://github.com/wlopera/RNTools/assets/7141537/551de7d6-60c8-4bd3-84d5-1a0a1dbb9328)

* Configurar permisos. Por ejemplo si una App quiere usar la cámara el usuario debe dar el permiso

![image](https://github.com/wlopera/RNTools/assets/7141537/7cadff5f-d6a7-4171-91f4-3ea3a758747b)

* Agregar plugin al app.json para configurar la cámara

```
{
  "expo": {
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "La aplicación accede a tus fotos para permitirte compartirlas con tus amigos."
        }
      ]
    ]
  }
}
```
* Se genera un componente que utilizara la función asíncrona (promesa):  launchCameraAsync que espera hasta que se tome la foto
* Opciones para con figurar la cámara

  ![image](https://github.com/wlopera/RNTools/assets/7141537/603ef73b-2bc2-4765-a06f-d0d13b86cf24)
  ![image](https://github.com/wlopera/RNTools/assets/7141537/d783bc2b-bb76-4de4-a95b-ec8913b45550)

#### Llamar el componente ImagePicker en PlaceForm.js y probar
![image](https://github.com/wlopera/RNTools/assets/7141537/910726fe-280a-435f-9bb0-152c922fc96a)
![image](https://github.com/wlopera/RNTools/assets/7141537/972f6a0b-809b-4298-b87a-2d6348b4ae11)
![image](https://github.com/wlopera/RNTools/assets/7141537/7b5f421f-4b30-4395-80d5-6ad4b7493b03)
![image](https://github.com/wlopera/RNTools/assets/7141537/8df68124-4580-4da7-a9d9-e302ba910ef2)

### Presione Crop para tomar la foto

```
Imagen: [{"assetId": null, "base64": null, "duration": null, "exif": null, "height": 540, "rotation": null, "type": "image", "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FRNTools-13541773-1f74-4886-97ac-4ab57efe2d39/ImagePicker/36d41ff9-9e9b-40f5-815c-443d073ba0e3.jpeg", "width": 960}]
```

* Si al tomar la foto da el error:
* Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead
* Se debe cambiar console.log(“Imagen:”, image)  console.log(“Imagen:”, image.assets)

*	Para IOS se debe permitir el uso de la cámara vía programación

  ![image](https://github.com/wlopera/RNTools/assets/7141537/41f3241f-ff2c-4cda-bf5a-7982f169b354)

* Nota si el simulador no tiene simulador de cámara va a enviar error

###### Prueba desde mi celular personal – Android
![image](https://github.com/wlopera/RNTools/assets/7141537/e9348a0d-9339-4a3d-adf7-cdf3381448c2)
![image](https://github.com/wlopera/RNTools/assets/7141537/7ec930ca-45c6-4db6-a549-7aa2acb18768)
![image](https://github.com/wlopera/RNTools/assets/7141537/8c036002-7bbb-42b2-b282-f8f28a43de56)
![image](https://github.com/wlopera/RNTools/assets/7141537/7430798a-250d-490c-bc69-162d577ea077)

* Agregar un Botón personalizado. Permite agregar estilos e imagen asociadas al botón

![image](https://github.com/wlopera/RNTools/assets/7141537/8cad5931-21e5-4015-ba3c-dcd65a90aac3)
![image](https://github.com/wlopera/RNTools/assets/7141537/88843906-1cf0-4480-a4e8-d02591ef7e17)


#### Location Picker

```
Agregar componente LocationPicker.js

import { StyleSheet, Text, View } from "react-native";
import OutlinedButton from "./OutlinedButton";
import { Colors } from "../../constants/colors";

const LocationPicker = () => {
  function getLocationHandler() {}
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
```

* Agregar al formulario PlaceForm.js el componente LocationPicker

```
...
 <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Titulo</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker />
      <LocationPicker />
    </ScrollView>
  );
``` 

![image](https://github.com/wlopera/RNTools/assets/7141537/9edf11b3-c36c-414d-9a5c-98035111844e)

### Consultar la documentación
https://docs.expo.dev/versions/latest/sdk/location/

![image](https://github.com/wlopera/RNTools/assets/7141537/7a5cc5e5-45ab-4cca-a014-fcaefa77f75c)

*	Esta librería permite buscar geolocalización del dispositivo
*	Instalamos el paquete: npx expo install expo-location

 ![image](https://github.com/wlopera/RNTools/assets/7141537/c3b8d07c-995a-4cc2-8143-98e67c83e8c2)

*	Definir o solicitar permisos especiales al usuario para usar geolocalización mientras el dispositivo está en segundo plano

 ![image](https://github.com/wlopera/RNTools/assets/7141537/2fd6de05-01ea-41e0-ae70-b2fc1c980789)
 ![image](https://github.com/wlopera/RNTools/assets/7141537/ba67ae9e-6d32-46ce-bdcd-d6dc6ba0d599)

*	Uso de la función getCurrentPositionAsync que nos permite obtener la ubicación actual del dispositivo
![image](https://github.com/wlopera/RNTools/assets/7141537/08c28058-666f-4309-a837-ee9a41a640ff)

 
*	Agrego función para validar permisos o solicitarlos al usuario para la localización del dispositivo

```
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
```

* 	Corre APP y presionar botón de Localización de Usuario. Aceptar y dar los permisos

  ![image](https://github.com/wlopera/RNTools/assets/7141537/6e61ee86-748a-437d-9437-6d2a146d38a0)

* Al aceptar los permisos me envía la localización del dispositivo

```
LOG  Localizacion del dispositivo: {"coords": {"accuracy": 600, "altitude": 0, "altitudeAccuracy": 0, "heading": 0, "latitude": 37.4220936, "longitude": -122.083922, "speed": 0}, "mocked": false, "timestamp": 1696517443968}
```

*Pero si el dispositivo (emulador) no lo permite, se debe configurar otro simulador


### Uso de Google Map para mostrar una vista con la localización del dispositivo

*	Uso de Api de Google Map
 -- https://developers.google.com/maps/documentation/maps-static/overview?hl=es-419

 ![image](https://github.com/wlopera/RNTools/assets/7141537/3a89fcd3-ae51-42f3-9628-3275b40f41b8)

* Como no quiero invertir en Google Map voy a utilizar otra librería como ejercicio

### Uso de React Native Maps

* Vamos a mapear la ubicación de mi dispositivo mediante el uso de la librería RN maps
* > npm install react-native-maps

* Crear componente para manejar imágenes de localización (location.js)

```
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
```

* El simulador posiblemente no muestre el mapa correctamente. 

 ![image](https://github.com/wlopera/RNTools/assets/7141537/a0762f1f-679b-4454-88a6-e88114f04e50)

* Probando en mi celular. Se puede ver la imagen y las coordenadas correcta

![image](https://github.com/wlopera/RNTools/assets/7141537/697748e0-627a-4659-bb72-fa646c70a4d4)

``` 
Localizacion del dispositivo: {"coords": {"accuracy": 77.31300354003906, "altitude": 29, "altitudeAccuracy": 2.3575026988983154, "heading": 0, "latitude": 8.9988368, "longitude": -79.5234054, "speed": 0}, "mocked": false, "timestamp": 1696538668122}
```

### Crear un Mapa de la localización consultada

* Uso de MapView
* Genero el componente Map.js

```
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
```

#### Notas: 
1.	Evitar ciclos de renderizados innecesarios incluso evitar bucles infinitos para ello se crea una función flecha envuelta en un Callback, devolución de llamada, que nos permite garantizar que una función definida dentro de un componente no cree llamadas innecesariamente o llamadas múltiples de la función 
2.	El componente Map.js como viene de una llamada de navegación, recibe el objeto navigation que permite el control de la navegación sobre el componente 
const Map = ({ navigation }) => {

3.	Para que el componente Map.js realice un back al componente que lo llamo y se dese pasar parámetros es mejor utilizar el objeto navigation y agregar los parámetros que quiero regresar a la pantalla que lo llamo previamente
 navigation.navigate("AppPlace", {
      pickedLat: seletedLocation.lat,
      pickedLng: seletedLocation.lng,
    });

* Agregar la opción de navegación “Map” al App.js

```
…
 <Stack.Screen
            name="map"
            component={Map}
            options={{
              title: "Mapa",
            }}
          />
…
```

* Salidas para probar Componente Map.js, Ubicación de información sobre el mapa y control de botón si se realizó una nueva ubicación sobre el map (click)

![image](https://github.com/wlopera/RNTools/assets/7141537/7b883d54-2a4a-4183-b4cf-6f93c0cd21be)
![image](https://github.com/wlopera/RNTools/assets/7141537/3062a627-f2e0-41cd-9475-c410b7e100b8)
![image](https://github.com/wlopera/RNTools/assets/7141537/b82a40f4-7e64-48ab-80b6-1f9f6d630acf)

* Al dar click sobre el mapa (nueva ubicación) y dar a botón (Guardar), debe regresar a la vista inicial y pasar los parámetros para redibujar el mapa solicitado

#### Mapear la ubicación seleccionada en el área MAP

* Uso de librerías de react-native para obtener los parámetros enviados por el componente Map

```
… 
 const route = useRoute();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const mapPikedLocation = route.params && {
    lat: route.params.pickedLat,
    lng: route.params.pickedLng,
  };

  useEffect(() => {
    if (mapPikedLocation) {
      setPickedLocation(mapPikedLocation);
    }
  }, [mapPikedLocation]);
…
```

* Cuando se pasan parámetros con Stack Navigation de una pantalla a otra, la nueva pantalla pasa al principio de la pila de pantallas por lo que los parámetros son visibles, ya que se mantienen todos los valores de las pantallas anteriores. Pero cuando venimos de una pantalla a otra a través de una llamada entre pantallas el componente final no recrean los parámetros así que deben pasarse los parámetros mediante navigation
* Se debe utilizar, useIsFocused(), useNavigation() y useRoute() para poder consultar los parámetros
* Para Componente Map.js
```
…
navigation.navigate("AppPlace", {
      pickedLat: seletedLocation.latitud,
      pickedLng: seletedLocation.longitude,
    });
…
```

* Se debe agregar un parámetro que permita obtener los parámetros cuando la vista esta activa 
const isFocused = useIsFocused();

```
 …
const [pickedLocation, setPickedLocation] = useState();

  // Sera cierto si solo si el componente de pantalla al que pertenece este componente
  // sea la pantalla principal, sino falso
  const isFocused = useIsFocused();

  const navigation = useNavigation();

  const route = useRoute();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  useEffect(() => {
    if (isFocused && route.params) {
      setPickedLocation({
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      });
    }
  }, [route, isFocused]);
…
```

* Probando. Primero seleccione su localización y tome una imagen. Luego en Mapa seleccione un punto y luego click en botón save se muestra esa nueva ubicación en la localización. 

![image](https://github.com/wlopera/RNTools/assets/7141537/7c51dc71-2085-4a2a-b8ad-b09c7f9fe210)
![image](https://github.com/wlopera/RNTools/assets/7141537/e5bf279d-871e-444c-ac03-1461ceeb6019)
![image](https://github.com/wlopera/RNTools/assets/7141537/98604c69-1fa7-413f-a8d2-6ce3564642b5)

### Botón de guardado de los datos de la pantalla

* Creamos componente de botón básico

```
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

export default function Button({ onPress, children }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 4
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.primary50,
  },
});
```

* Actualizamos el PlaceForm.js

```
…
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
    console.log("enteredTitle:", enteredTitle);
    console.log("selectedImage:", selectedImage);
    console.log("pickedLocation:", pickedLocation);
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
…
```

### Uso de API Google Map para traducir un par de coordenadas geográficas en una dirección legible. Como no quiero cuenta de API Google Map, voy a simular una respuesta address.

* Crear utilitario que debería llamar un API asíncrono de Google Map que retorna la dirección dado la latitud y longitud.
* Modificar location.js

```  
…
export const getAddress = (latitude, longitude) => {
  return `Dirección API - conversión: latitud: ${latitude} - longitud:${longitude}`;
};
…
```

* Modificar LocationPicker.js

```
…
  useEffect(() => {
    if (pickedLocation) {
      const address = getAddress(pickedLocation.lat, pickedLocation.lng);
      onPickLocation({ ...pickedLocation, address: address });
    }
  }, [pickedLocation, onPickLocation]);
…
```

* Probar

![image](https://github.com/wlopera/RNTools/assets/7141537/d8fc5a42-5553-4a97-a188-5a18c83f9074)
   
```
LOG  enteredTitle: Carrasquilla - Panamá
LOG  selectedImage: 
file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FRNTools-13541773-1f74-4886-97ac-4ab57efe2d39/ImagePicker/034b23e4-b2a4-4e35-abba-56eec5da58d3.jpeg
LOG  pickedLocation: {"address": "Dirección API - conversión: latitud: 9.0009662516933 - longitud:-79.51103892177343", 
"lat": 9.0009662516933, "lng": -79.51103892177343}
```

### Retornar los datos de la pantalla PlaceForm a la pantalla AllPlace

* Modificamos el modelo o clase place.js

```
export class Place {
  constructor(title, imageUri, location) {
    this.id = new Date().getDate().toString() + Math.random().toString();
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: latitud.lng }; //{lat:0.12345, lng: 127.455}
  }
}
```

* El Botón Agregar Lugar de PlaceForm.js debe retornar los datos en una función que se pasa en los props

```
…
  function savePlaceHandler() {
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  }
…
```

* La pantalla AddPlace.js debe recibir y redireccionar los resultados a la Pantalla AllPlace.js

```
import PlaceForm from "../components/Places/PlaceForm";
function AddPlace({ navigation }) {
  function createPlaceHandler(place) {
    navigation.navigate("AllPlace", { place: place });
  }
  return <PlaceForm onCeatePlace={createPlaceHandler} />;
}
export default AddPlace;
```



