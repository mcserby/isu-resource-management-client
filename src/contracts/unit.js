// Unit contract

class Unit {
  constructor(name, resources, lastUpdate) {
    this.name = name;
    this.resources = resources;
    this.isLocked = false;
    this.lastUpdate = lastUpdate;
  }
}

export default Unit;

