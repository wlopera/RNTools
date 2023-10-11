export class Place {
  constructor(title, imageUri, location) {
    this.id = new Date().getDate().toString() + Math.random().toString();
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: latitud.lng }; //{lat:0.12345, lng: 127.455}
  }
}
