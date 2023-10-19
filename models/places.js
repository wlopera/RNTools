export class Place {
  constructor(title, imageUri, location, id) {
    this.id = id
      ? id
      : new Date().getDate().toString() + Math.random().toString();
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng }; //{lat:0.12345, lng: 127.455}
  }
}
