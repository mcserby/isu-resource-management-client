import A from "../../constants/services/actions";
import M from "../../constants/services/mutations";

const state = {
  services: [],
  lastUpdate: "",
  searchText: ''
};

const actions = {
  [A.INIT_SERVICES]({ commit }, servicesUpdate) {
    commit(M.INIT_SERVICES, servicesUpdate);
  },
  [A.CLEAR_ALL_SERVICES]({ commit }) {
    commit(M.CLEAR_ALL_SERVICES);
  },
  [A.APPLY_FILTER] ({commit}, searchText) {
    commit(M.APPLY_FILTER, searchText)
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
  },
  [M.APPLY_FILTER](state, searchText) {
    state.searchText = searchText;
  }
};

const getters = {};

export default {
  state,
  actions,
  getters,
  mutations
};
