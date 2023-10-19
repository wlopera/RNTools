import { useIsFocused } from "@react-navigation/native";
import PlaceList from "../components/Places/PlaceList";
import { useEffect, useState } from "react";
import { fetchPlaces } from "../util/database";

const AllPlaces = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    // Refactor del codigo
    // if (isFocused && route.params) {
    //   setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    // }
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return <PlaceList places={loadedPlaces} />;
};

export default AllPlaces;
