// Resource contract

class Equipment {
  constructor(equipmentId, equipmentType, usable, reserves, unusable, resourceType) {
    this.equipmentId = equipmentId;
    this.equipmentType = equipmentType;
    this.usable = usable;
    this.resourceType = resourceType;
    this.reserves = reserves;
    this.unusable = unusable;
  }
}

export default Equipment;

