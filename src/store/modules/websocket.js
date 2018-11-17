import A from '../../constants/actions'
import M from '../../constants/mutations'
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
import AppConfig from '../../config/appConfig'

const state = {
  websocketStompClient: null,
  connectionError: null,
  connected: false,
}

const actions = {
  [A.WEBSOCKET_CONNECT] ({commit}) {
    commit(M.WEBSOCKET_CONNECT)
  },
  [A.WEBSOCKET_DISCONNECT] ({commit}) {
    commit(M.WEBSOCKET_DISCONNECT)
  },
  [A.WEBSOCKET_SUBSCRIBE] ({commit}, websocketSubscribe) {
    commit(M.WEBSOCKET_SUBSCRIBE, websocketSubscribe)
  },
  [A.WEBSOCKET_SEND] ({commit}, websocketSend) {
    commit(M.WEBSOCKET_SEND, websocketSend)
  },
}

const mutations = {
  [M.WEBSOCKET_CONNECT] (state) {
    if (!state.connected) {
      const socket = new SockJS(AppConfig.server.websocketUrl)
      state.websocketStompClient = Stomp.over(socket)
      state.websocketStompClient.connect({'id': 'sub-1'}, response => {
        console.log(response)
        state.connected = true
      }, error => {
        console.log(error)
        state.connectionError = error
        state.connected = false
      })
    }
  },
  [M.WEBSOCKET_DISCONNECT] (state) {
    if (state.websocketStompClient) {
      state.websocketStompClient.disconnect();
    }
    state.connected = false;
  },
  [M.WEBSOCKET_SUBSCRIBE] (state, websocketSubscribe) {
    if (state.websocketStompClient) {
      state.websocketStompClient.subscribe('/topic/' + websocketSubscribe.topicName, websocketSubscribe.successCallbackFunction, websocketSubscribe.errorCallbackFunction)
    }
  },
  [M.WEBSOCKET_SEND] (state, websocketSend) {
    if (state.websocketStompClient && state.websocketStompClient.connected) {
      state.websocketStompClient.send('/topic/' + websocketSend.topicName, websocketSend.payload, {});
    }
  },
}

const getters = {}

export default {
  state,
  actions,
  getters,
  mutations,
}
