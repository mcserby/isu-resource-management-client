// Resource contract

class Resource {
  constructor(vehicleType, plateNumber, identificationNumber, captain, crew, status, type) {
    this.id = createUUID();
    this.vehicleType = vehicleType;
    this.plateNumber = plateNumber;
    this.identificationNumber = identificationNumber;
    this.captain = captain;
    this.crew = crew;
    this.status = status;
    this.type = type;
  }
}

function createUUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (dt + Math.random()*16)%16 | 0;
    dt = Math.floor(dt/16);
    return (c==='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

export default Resource;

