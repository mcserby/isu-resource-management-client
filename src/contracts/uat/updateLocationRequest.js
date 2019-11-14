// Location contract

class UpdateLocationRequest {
  constructor(id, name, coordinates, pointsOfInterest) {
    this.id = id;
    this.name = name;
    this.coordinates = coordinates;
    this.pointsOfInterest = pointsOfInterest;
  }
}

export default UpdateLocationRequest;
