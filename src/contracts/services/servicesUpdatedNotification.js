// Service contract

class ServicesUpdatedNotification {
  constructor(services, lastUpdateToday, lastUpdateTomorrow) {
    this.services = services;
    this.lastUpdateToday = lastUpdateToday;
    this.lastUpdateTomorrow = lastUpdateTomorrow;
  }
}

export default ServicesUpdatedNotification;
