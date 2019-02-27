import A from "../../constants/actions";
import M from "../../constants/mutations";
import ManagedResourceType from "../../constants/managedResourceType";
import Function from "../../contracts/management/functions/function";
import Truck from "../../contracts/management/trucks/truck";
import SubUnit from "../../contracts/management/subunits/subUnit.js";

const state = {
  managedSubUnits: [],
  managedFunctions: [],
  managedTrucks: [],
  selectedResourceType: ManagedResourceType.SUBUNITS,
  selectedSubUnit: null,
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
  [A.MANAGED_SUBUNITS_RECEIVED]({ commit }, functionsUpdatedNotification) {
    commit(M.MANAGED_SUBUNITS_RECEIVED, functionsUpdatedNotification);
  },
  [A.MANAGED_FUNCTIONS_RECEIVED]({ commit }, functionsUpdatedNotification) {
    commit(M.MANAGED_FUNCTIONS_RECEIVED, functionsUpdatedNotification);
  },
  [A.SELECT_MANAGED_TRUCK]({ commit }, managedTruck) {
    commit(M.SELECT_MANAGED_TRUCK, managedTruck);
  },
  [A.MANAGED_TRUCKS_RECEIVED]({ commit }, trucksUpdatedNotification) {
    commit(M.MANAGED_TRUCKS_RECEIVED, trucksUpdatedNotification);
  },
  [A.ADD_MANAGED_RESOURCE]({ commit }) {
    commit(M.ADD_MANAGED_RESOURCE);
  },
  [A.DELETE_MANAGED_RESOURCE]({ commit }) {
    commit(M.DELETE_MANAGED_RESOURCE);
  }
};

const mutations = {
  [M.SELECT_MANAGED_RESOURCE_TYPE](state, selectedResourceType) {
    state.selectedResourceType = selectedResourceType;
  },
  [M.SELECT_MANAGED_SUBUNIT]({ commit }, name) {
    state.selectedSubUnit = name;
  },
  [M.MANAGED_SUBUNITS_RECEIVED]({ commit }, subUnitsUpdatedNotification) {
    state.managedSubUnits = subUnitsUpdatedNotification.subUnitsList.map(
      s => new SubUnit(s.id, s.name)
    );
    if (state.selectedSubUnit === null) {
      state.selectedSubUnit = state.managedSubUnits[0];
    }
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
  },
  [M.ADD_MANAGED_RESOURCE]({ commit }) {
    switch (state.selectedResourceType) {
      case ManagedResourceType.SUBUNITS:
        addSubUnit();
        break;
      case ManagedResourceType.FUNCTIONS:
        addFunction();
        break;
      case ManagedResourceType.TRUCKS:
        addTruck();
        break;
    }
  },
  [M.DELETE_MANAGED_RESOURCE]({ commit }) {
    switch (state.selectedResourceType) {
      case ManagedResourceType.SUBUNITS:
        deleteSubUnit();
        break;
      case ManagedResourceType.FUNCTIONS:
        deleteFunction();
        break;
      case ManagedResourceType.TRUCKS:
        deleteTruck();
        break;
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

function addTruck() {
  let newTruck = new Truck(null, "**Autospeciala nouă**", "");
  state.managedTrucks.push(newTruck);
  state.selectedTruck = newTruck;
}

function addFunction() {
  let newFunction = new Function(null, "**Funcție nouă**");
  state.managedFunctions.push(newFunction);
  state.selectedFunction = newFunction;
}

function addSubUnit() {
  let newSubUnit = new SubUnit(null, "**Subunitate nouă**");
  state.managedSubUnits.push(newSubUnit);
  state.selectedSubUnit = newSubUnit;
}

function deleteSubUnit() {
  if (state.selectedSubUnit.id != null) {
    state.managedSubUnits.pop(state.selectedSubUnit);
  } else {
    state.managedSubUnits.pop(
      state.managedSubUnits[state.managedSubUnits.length - 1]
    );
  }
  state.selectedSubUnit = state.managedSubUnits[0];
}

function deleteFunction() {
  if (state.selectedFunction.id != null) {
    state.managedFunctions.pop(state.selectedFunction);
  } else {
    state.managedFunctions.pop(
      state.managedFunctions[state.managedFunctions.length - 1]
    );
  }
  state.selectedFunction = state.managedFunctions[0];
}

function deleteTruck() {
  if (state.selectedTruck.id != null) {
    state.managedTrucks.pop(state.selectedTruck);
  } else {
    state.managedTrucks.pop(
      state.managedTrucks[state.managedTrucks.length - 1]
    );
  }
  state.selectedTruck = state.managedTrucks[0];
}
