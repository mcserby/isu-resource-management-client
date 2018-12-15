// Unit contract

class Unit {
  constructor(name, resources, lastUpdate, equipment) {
    this.name = name;
    this.resources = resources;
    this.isLocked = false;
    this.lastUpdate = lastUpdate;
    if (equipment){
      this.equipment = equipment;
    } else {
      this.equipment = [];
    }
  }
}

export default Unit;

