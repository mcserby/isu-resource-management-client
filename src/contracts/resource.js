// Resource contract

class Resource {
  constructor(id, vehicleType, plateNumber, identificationNumber, captain, crew, status, type) {
    this.id = id;
    this.vehicleType = vehicleType;
    this.plateNumber = plateNumber;
    this.identificationNumber = identificationNumber;
    this.captain = captain;
    this.crew = crew;
    this.status = status;
    this.type = type;
  }
}

export default Resource;

