// Unit contract

class Unit {
  constructor(
    id,
    name,
    resources,
    equipment,
    lastUpdateFirstInterventionResource,
    lastUpdateOtherResource,
    lastUpdateEquipment
  ) {
    this.id = id;
    this.name = name;
    this.resources = resources;
    this.lastUpdateFirstInterventionResource = lastUpdateFirstInterventionResource;
    this.lastUpdateOtherResource = lastUpdateOtherResource;
    this.lastUpdateEquipment = lastUpdateEquipment;
    if (equipment) {
      this.equipment = equipment;
    } else {
      this.equipment = [];
    }
  }
}

export default Unit;
