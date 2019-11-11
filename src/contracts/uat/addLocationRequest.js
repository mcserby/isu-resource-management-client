// Location contract

class AddLocationRequest {
  constructor(name, coordinates, pointsOfInterest) {
    this.name = name;
    this.coordinates = coordinates;
    this.pointsOfInterest = pointsOfInterest;
  }
}

export default AddLocationRequest;
