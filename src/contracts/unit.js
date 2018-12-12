// Unit contract

class Unit {
  constructor(name, resources, lastUpdate, equipments) {
    this.name = name;
    this.resources = resources;
    this.equipments = equipments;
    this.isLocked = false;
    this.lastUpdate = lastUpdate;
  }
}

export default Unit;

