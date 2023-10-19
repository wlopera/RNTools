import * as SQLite from "expo-sqlite";

import { Place } from "../models/places";

const database = SQLite.openDatabase("places.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        )`,
        [],
        () => {
          console.log("DB y Tabla activas")
          resolve();
        },
        (_, error) => {
          console.log("Error DB o Tabla:", error)
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          console.log("Insertando lugar:", result)
          resolve(result);
        },
        (_, error) => {
          console.log("Error Insertando lugar: ", error)
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places",
        [],
        (_, result) => {
          const places = [];

          for (const dp of result.rows._array) {
            places.push(
              new Place(
                dp.title,
                dp.imageUri,
                {
                  address: dp.address,
                  lat: dp.lat,
                  lng: dp.lng,
                },
                dp.id
              )
            );
          }
          console.log("Consultar lugares:", places)
          resolve(places);
        },
        (_, error) => {
          console.log("Error consultando lugares:", error)
          reject(error);
        }
      );
    });
  });

  return promise;
}
