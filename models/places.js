class Place {
  constructor(title, imageUri, address, location) {
    this.id = new Date().getDate().toString() + Math.random().toString();
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; //{lat:0.12345, lng: 127.455}
  }
}
