import A from "../../constants/actions";
import M from "../../constants/mutations";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import AppConfig from "../../config/appConfig";
import { stat } from "fs";

function stompConnect() {
  const socket = new SockJS(AppConfig.server.websocketUrl);
  state.websocketStompClient = Stomp.over(socket);
  state.websocketStompClient.connect(
    { id: "sub-1" },
    response => {
      console.log(response);
      state.connected = true;
      state.subscriptions = [];
    },
    error => {
      console.log(error);
      state.connectionError = error;
      state.connected = false;
      state.subscriptions = [];
      setTimeout(stompConnect(), 1000);
    }
  );
}

const state = {
  websocketStompClient: null,
  connectionError: null,
  connected: false,
  subscriptions: []
};

const actions = {
  [A.WEBSOCKET_CONNECT]({ commit }) {
    commit(M.WEBSOCKET_CONNECT);
  },
  [A.WEBSOCKET_DISCONNECT]({ commit }) {
    commit(M.WEBSOCKET_DISCONNECT);
  },
  [A.WEBSOCKET_SUBSCRIBE]({ commit }, websocketSubscribe) {
    commit(M.WEBSOCKET_SUBSCRIBE, websocketSubscribe);
  },
  [A.WEBSOCKET_UNSUBSCRIBE]({ commit }, websocketUnsubscribe) {
    commit(M.WEBSOCKET_UNSUBSCRIBE, websocketUnsubscribe);
  },
  [A.WEBSOCKET_SUBSCRIBE_USER]({ commit }, websocketSubscribe) {
    commit(M.WEBSOCKET_SUBSCRIBE_USER, websocketSubscribe);
  },
  [A.WEBSOCKET_SEND]({ commit }, websocketSend) {
    commit(M.WEBSOCKET_SEND, websocketSend);
  }
};

const mutations = {
  [M.WEBSOCKET_CONNECT](state) {
    if (!state.connected) {
      stompConnect();
    }
  },
  [M.WEBSOCKET_DISCONNECT](state) {
    if (state.websocketStompClient) {
      state.websocketStompClient.disconnect();
    }
    state.connected = false;
  },
  [M.WEBSOCKET_SUBSCRIBE](state, websocketSubscribe) {
    var sendSubscribe = setInterval(websocketSend => {
      if (state.websocketStompClient && state.connected === true) {
        var subscription = state.websocketStompClient.subscribe(
          "/topic/" + websocketSubscribe.topicName,
          websocketSubscribe.successCallbackFunction,
          websocketSubscribe.errorCallbackFunction
        );
        if (subscription != null) {
          state.subscriptions[websocketSubscribe.topicName] = subscription;
        }

        clearInterval(sendSubscribe);
      } else {
        console.log("Not connected to websocket yet!!!");
      }
    }, 100);
  },
  [M.WEBSOCKET_SUBSCRIBE_USER](state, websocketSubscribe) {
    var sendSubscribe = setInterval(websocketSend => {
      if (state.websocketStompClient && state.connected === true) {
        state.websocketStompClient.subscribe(
          "/user/queue/" + websocketSubscribe.topicName,
          websocketSubscribe.successCallbackFunction,
          websocketSubscribe.errorCallbackFunction
        );
        clearInterval(sendSubscribe);
      } else {
        console.log("Not connected to websocket yet!!!");
      }
    }, 100);
  },
  [M.WEBSOCKET_UNSUBSCRIBE](state, websocketUnsubscribe) {
    var sendUnsubscribe = setInterval(websocketSend => {
      if (state.websocketStompClient && state.connected === true) {
        var subscription = state.subscriptions[websocketUnsubscribe.topicName];
        subscription.unsubscribe();
        clearInterval(sendUnsubscribe);
      } else {
        console.log("Not connected to websocket yet!!!");
      }
    }, 100);
  },
  [M.WEBSOCKET_SEND](state, websocketSend) {
    if (state.websocketStompClient && state.websocketStompClient.connected) {
      state.websocketStompClient.send(
        "/topic/" + websocketSend.topicName,
        JSON.stringify(websocketSend.payload, {})
      );
    }
  }
};

const getters = {};

export default {
  state,
  actions,
  getters,
  mutations
};
