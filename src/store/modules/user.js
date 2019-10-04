import A from '../../constants/actions';
import M from '../../constants/mutations';

const state = {
  isOpen: false,
  authInstance: null,
  userProfile: null,
}

const actions = {

  [A.AUTH_UPDATE_TOKEN] ({commit}, authInstance) {
    commit(M.AUTH_UPDATE_TOKEN, authInstance)
  },

  [A.AUTH_LOGOUT] ({state}) {
    state.authInstance.logout()
  },

  [A.AUTH_SET_USER_PROFILE] ({commit}, profile) {
    commit(M.AUTH_SET_USER_PROFILE, profile)
  },

}

const mutations = {

  [M.AUTH_UPDATE_TOKEN] (state, authInstance) {
    state.authInstance = authInstance
  },

  [M.AUTH_LOGOUT]({state}) {
    state.authInstance.logout();
  },

  [M.AUTH_SET_USER_PROFILE] (state, profile) {
    state.userProfile = profile
  },

}

const getters = {}

export default {
  state,
  actions,
  mutations,
  getters,
}
