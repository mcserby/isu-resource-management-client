import A from "../../constants/services/actions";
import M from "../../constants/services/mutations";

const state = {
  services: [],
  lastUpdate: ""
};

const actions = {
  [A.INIT_SERVICES]({ commit }, servicesUpdate) {
    commit(M.INIT_SERVICES, servicesUpdate);
  },
  [A.CLEAR_ALL_SERVICES]({ commit }) {
    commit(M.CLEAR_ALL_SERVICES);
  }
};

const mutations = {
  [M.INIT_SERVICES](state, servicesUpdate) {
    state.services.splice(0, state.services.length);
    state.services = servicesUpdate.services;
    state.lastUpdate = servicesUpdate.lastUpdate;
  },
  [M.CLEAR_ALL_SERVICES](state) {
    state.services = [];
  }
};

const getters = {};

export default {
  state,
  actions,
  getters,
  mutations
};
