import A from "../../constants/actions";
import M from "../../constants/mutations";
import ManagedResourceType from "../../constants/managedResourceType";
import { stat } from "fs";

const state = {
  managedFunctions: [],
  managedTrucks: [],
  selectedResourceType: ManagedResourceType.SUBUNITS,
  selectedSubUnit: "",
  selectedFunction: null,
  selectedTruck: null
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
  },
  [A.SELECT_MANAGED_TRUCK]({ commit }, managedTruck) {
    commit(M.SELECT_MANAGED_TRUCK, managedTruck);
  },
  [A.MANAGED_TRUCKS_RECEIVED]({ commit }, trucksUpdatedNotification) {
    commit(M.MANAGED_TRUCKS_RECEIVED, trucksUpdatedNotification);
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
    if (state.selectedFunction === null) {
      state.selectedFunction = state.managedFunctions[0];
    }
  },
  [M.SELECT_MANAGED_TRUCK]({ commit }, managedTruck) {
    state.selectedTruck = managedTruck;
  },
  [M.MANAGED_TRUCKS_RECEIVED]({ commit }, trucksUpdatedNotification) {
    state.managedTrucks = trucksUpdatedNotification.trucks;
    if (state.selectedTruck === null) {
      state.selectedTruck = state.managedTrucks[0];
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
