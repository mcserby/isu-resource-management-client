// Unit contract

class Unit {
  constructor(name, resources, lastUpdate, equipment) {
    this.name = name;
    this.resources = resources;
    this.isLocked = false;
    this.lastUpdate = lastUpdate;
    this.equipment = equipment;
  }
}

export default Unit;

