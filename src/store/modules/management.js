import A from "../../constants/actions";
import M from "../../constants/mutations";
import ManagedResourceType from "../../constants/managedResourceType";

const state = {
  managedFunctions: [],
  selectedResourceType: ManagedResourceType.SUBUNITS,
  selectedSubUnit: "",
  selectedFunction: {},
  selectedTruck: ""
};

const actions = {
  [A.SELECT_MANAGED_RESOURCE_TYPE]({ commit }, selectedResourceType) {
    commit(M.SELECT_MANAGED_RESOURCE_TYPE, selectedResourceType);
  },
  [A.SELECT_MANAGED_SUBUNIT]({ commit }, name) {
    commit(M.SELECT_MANAGED_SUBUNIT, name);
  },
  [A.SELECT_MANAGED_FUNCTION]({ commit }, managedFunction) {
    commit(M.SELECT_MANAGED_FUNCTION, managedFunction);
  },
  [A.MANAGED_FUNCTIONS_RECEIVED]({ commit }, functionsUpdatedNotification) {
    commit(M.MANAGED_FUNCTIONS_RECEIVED, functionsUpdatedNotification);
  }
};

const mutations = {
  [M.SELECT_MANAGED_RESOURCE_TYPE](state, selectedResourceType) {
    state.selectedResourceType = selectedResourceType;
  },
  [M.SELECT_MANAGED_SUBUNIT]({ commit }, name) {
    state.selectedSubUnit = name;
  },
  [M.SELECT_MANAGED_FUNCTION]({ commit }, managedFunction) {
    state.selectedFunction = managedFunction;
  },
  [M.MANAGED_FUNCTIONS_RECEIVED]({ commit }, functionsUpdatedNotification) {
    state.managedFunctions = functionsUpdatedNotification.functions;
  }
};

const getters = {};

export default {
  state,
  actions,
  getters,
  mutations
};
