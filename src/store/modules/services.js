import A from "../../constants/services/actions";
import M from "../../constants/services/mutations";
import Vue from "vue";
import Service from "../../contracts/services/service";

const state = {
  services: []
};

const actions = {
  [A.INIT_SERVICES]({ commit }, services) {
    commit(M.INIT_SERVICES, services);
  },
  [A.CLEAR_ALL_SERVICES]({ commit }) {
    commit(M.CLEAR_ALL_SERVICES);
  }
};

const mutations = {
  [M.INIT_SERVICES](state, services) {
    state.services.splice(0, state.services.length);
    state.services = services;
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
