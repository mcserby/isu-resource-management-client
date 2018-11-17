
class WebsocketSubscribe {

  constructor(topicName, successCallbackFunction, errorCallbackFunction) {
    this.topicName = topicName;
    this.successCallbackFunction = successCallbackFunction;
    this.errorCallbackFunction = errorCallbackFunction;
  }
}

export default WebsocketSubscribe;
