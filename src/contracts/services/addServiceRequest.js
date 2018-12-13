// Service contract

class AddServiceRequest {
  constructor(name, title, role, contact) {
    this.name = name;
    this.title = title;
    this.role = role;
    this.contact = contact;
  }
}

export default AddServiceRequest;
