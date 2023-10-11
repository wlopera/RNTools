import PlaceForm from "../components/Places/PlaceForm";

function AddPlace({ navigation }) {
  function createPlaceHandler(place) {
    navigation.navigate("AllPlace", { place: place });
  }

  return <PlaceForm onCeatePlace={createPlaceHandler} />;
}

export default AddPlace;
