import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

const SERVER_IP = 'http://localhost';
const PORT_NUMBER = 8345;
const RESOURCE_PATH = 'resources-ws';

let instance = null;

class WebsocketClient {

  constructor() {
    if (!instance) {
      instance = this;
      this.connected = false;
      this.stompClient = null;
    }

    return instance;
  }

  connect = function () {
    if (!this.connected){
      this.socket = new SockJS(SERVER_IP + ':' + PORT_NUMBER + '/' + RESOURCE_PATH);
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect({'id': 'sub-1'}, response => {
        console.log(response);
        this.connected = true;
      }, error => {
        console.log(error);
        this.connected = false;
      });
    }
  }

  subscribe = function (topicName) {
    if (this.stompClient) {
      this.stompClient.subscribe("/topic/" + topicName, response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
    }
  }

  send(endpoint, payload) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(endpoint, payload, {})
    }
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
    this.connected = false;
  }
}

export default WebsocketClient;

