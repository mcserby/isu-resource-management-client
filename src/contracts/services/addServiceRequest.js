// Service contract

class AddServiceRequest {
  constructor(name, title, role, subUnit, contact, day) {
    this.name = name;
    this.title = title;
    this.role = role;
    this.subUnit = subUnit;
    this.contact = contact;
    this.day = day;
  }
}

export default AddServiceRequest;
