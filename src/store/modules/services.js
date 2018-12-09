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
  }
};

const mutations = {
  [M.INIT_SERVICES](state, services) {
    state.services.splice(0, state.services.length);
    state.services = services;
  }
};

const getters = {};

export default {
  state,
  actions,
  getters,
  mutations
};
