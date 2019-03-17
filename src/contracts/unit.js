// Unit contract

class Unit {
  constructor (id,
               name,
               resources,
               equipment,
               lastUpdateFirstInterventionResource,
               lastUpdateOtherResource,
               lastUpdateEquipment,
               lastUpdateReserveResource) {
    this.id = id
    this.name = name
    this.resources = resources
    this.lastUpdateFirstInterventionResource = lastUpdateFirstInterventionResource
    this.lastUpdateOtherResource = lastUpdateOtherResource
    this.lastUpdateEquipment = lastUpdateEquipment
    this.lastUpdateReserveResource = lastUpdateReserveResource
    if (equipment) {
      this.equipment = equipment
    } else {
      this.equipment = []
    }
  }
}

export default Unit
