// Service contract

class AddServiceRequest {
  constructor(name, title, role, contact, day) {
    this.name = name;
    this.title = title;
    this.role = role;
    this.contact = contact;
    this.day = day;
  }
}

export default AddServiceRequest;
