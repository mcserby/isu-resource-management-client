// Service contract

class ServicesUpdatedNotification {
  constructor(services, lastUpdate) {
    this.services = services;
    this.lastUpdate = lastUpdate;
  }
}

export default ServicesUpdatedNotification;
