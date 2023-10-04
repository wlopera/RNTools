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



