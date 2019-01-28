import A from "../../constants/services/actions";
import M from "../../constants/services/mutations";

const state = {
  services: [],
  lastUpdate: "",
  searchText: '',
  isEditServiceDialogOpen: false,
  isDeleteServiceDialogOpen: false,
  service: null,

};

const actions = {
  [A.INIT_SERVICES]({ commit }, servicesUpdate) {
    commit(M.INIT_SERVICES, servicesUpdate);
  },
  [A.CLEAR_ALL_SERVICES]({ commit }) {
    commit(M.CLEAR_ALL_SERVICES);
  },
  [A.APPLY_SERVICE_FILTER] ({commit}, searchText) {
    commit(M.APPLY_SERVICE_FILTER, searchText)
  },
  [A.OPEN_DELETE_SERVICE_DIALOG] ({commit}) {
    commit(M.OPEN_DELETE_SERVICE_DIALOG)
  },
  [A.OPEN_EDIT_SERVICE_DIALOG] ({commit}) {
    commit(M.OPEN_EDIT_SERVICE_DIALOG)
  },
  [A.CLOSE_DELETE_SERVICE_DIALOG] ({commit}) {
    commit(M.CLOSE_DELETE_SERVICE_DIALOG)
  },
  [A.CLOSE_EDIT_SERVICE_DIALOG] ({commit}) {
    commit(M.CLOSE_EDIT_SERVICE_DIALOG)
  },
  [A.SET_SERVICE] ({commit}, service) {
    commit(M.SET_SERVICE, service)
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
  [M.APPLY_SERVICE_FILTER](state, searchText) {
    state.searchText = searchText;
  },
  [M.OPEN_DELETE_SERVICE_DIALOG](state) {
    state.isDeleteServiceDialogOpen = true;
  },
  [M.OPEN_EDIT_SERVICE_DIALOG](state) {
    state.isEditServiceDialogOpen = true;
  },
  [M.CLOSE_DELETE_SERVICE_DIALOG](state) {
    state.isDeleteServiceDialogOpen = false;
  },
  [M.CLOSE_EDIT_SERVICE_DIALOG](state) {
    state.isEditServiceDialogOpen = false;
  },
  [M.SET_SERVICE](state, service) {
    state.service = service;
  },
};

const getters = {};

export default {
  state,
  actions,
  getters,
  mutations
};
