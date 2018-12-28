class UpdateSubUnitRequest {
  constructor(subUnit) {
    subUnit.resources.forEach(r => delete r.id);
    this.subUnit = subUnit;
  }
}

export default UpdateSubUnitRequest;

