// Resource contract

class Resource {
  constructor(vehicleType, plateNumber, identificationNumber, crew) {
    this.vehicleType = vehicleType;
    this.plateNumber = plateNumber;
    this.identificationNumber = identificationNumber;
    this.captain = crew[0];
    this.crew = crew.splice(0, 1);

  }
}

export default Resource;

