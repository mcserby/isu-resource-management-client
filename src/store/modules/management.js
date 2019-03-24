import A from "../../constants/actions";
import M from "../../constants/mutations";
import ManagedResourceType from "../../constants/managedResourceType";
import Function from "../../contracts/management/functions/function";
import Truck from "../../contracts/management/trucks/truck";
import SubUnit from "../../contracts/management/subunits/subUnit.js";
import Utils from "../../services/utils";

const state = {
  managedSubUnits: [],
  managedFunctions: [],
  managedTrucks: [],
  selectedResourceType: ManagedResourceType.SUBUNITS,
  nextSelectedResourceType: null,
  selectedSubUnit: null,
  nextSelectedSubUnit: null,
  selectedFunction: null,
  nextSelectedFunction: null,
  selectedTruck: null,
  nextSelectedTruck: null,
  hasNewlyCreatedResource: false,
  hasUnsavedChanges: false,
  showUnsavedChangesDialog: false
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
  },
  [A.CHANGES_SAVED]({ commit }) {
    commit(M.CHANGES_SAVED);
  },
  [A.SELECTED_RESOURCE_DATA_CHANGED]({ commit }) {
    commit(M.SELECTED_RESOURCE_DATA_CHANGED);
  },
  [A.CHANGES_REVERTED]({ commit }) {
    commit(M.CHANGES_REVERTED);
  },
  [A.SHOW_UNSAVED_CHANGES_DIALOG]({ commit }) {
    commit(M.SHOW_UNSAVED_CHANGES_DIALOG);
  },
  [A.HIDE_UNSAVED_CHANGES_DIALOG]({ commit }) {
    commit(M.HIDE_UNSAVED_CHANGES_DIALOG);
  },
  [A.MANAGEMENT_SUBUNIT_NAME_CHANGE]({ commit }) {
    commit(M.MANAGEMENT_SUBUNIT_NAME_CHANGE);
  }
};

const mutations = {
  [M.SELECT_MANAGED_RESOURCE_TYPE](state, selectedResourceType) {
    if (state.hasUnsavedChanges === false) {
      state.selectedResourceType = selectedResourceType;
    } else {
      state.showUnsavedChangesDialog = true;
      state.nextSelectedResourceType = selectedResourceType;
    }
  },
  [M.SELECT_MANAGED_SUBUNIT]({ commit }, name) {
    if (state.hasUnsavedChanges === false) {
      state.selectedSubUnit = name;
    } else {
      state.showUnsavedChangesDialog = true;
      state.nextSelectedSubUnit = name;
    }
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
    if (state.hasUnsavedChanges === false) {
      state.selectedFunction = managedFunction;
    } else {
      state.showUnsavedChangesDialog = true;
      state.nextSelectedFunction = managedFunction;
    }
  },
  [M.MANAGED_FUNCTIONS_RECEIVED]({ commit }, functionsUpdatedNotification) {
    state.managedFunctions = functionsUpdatedNotification.functions;
    if (state.selectedFunction === null) {
      state.selectedFunction = state.managedFunctions[0];
    }
  },
  [M.SELECT_MANAGED_TRUCK]({ commit }, managedTruck) {
    if (state.hasUnsavedChanges === false) {
      state.selectedTruck = managedTruck;
    } else {
      state.showUnsavedChangesDialog = true;
      state.nextSelectedTruck = managedTruck;
    }
  },
  [M.MANAGED_TRUCKS_RECEIVED]({ commit }, trucksUpdatedNotification) {
    state.managedTrucks = trucksUpdatedNotification.trucks;
    if (state.selectedTruck === null) {
      state.selectedTruck = state.managedTrucks[0];
    }
  },
  [M.ADD_MANAGED_RESOURCE]({ commit }) {
    if (state.hasUnsavedChanges === false) {
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

      state.hasNewlyCreatedResource = true;
      state.hasUnsavedChanges = true;
    } else {
      state.showUnsavedChangesDialog = true;
    }
  },
  [M.DELETE_MANAGED_RESOURCE]({ commit }) {
    if (
      state.hasNewlyCreatedResource === true ||
      state.hasUnsavedChanges === true
    ) {
      state.hasNewlyCreatedResource = false;
      state.hasUnsavedChanges = false;
    }

    deleteManagedResource();
  },
  [M.CHANGES_REVERTED]({ commit }) {
    if (state.hasNewlyCreatedResource === true) {
      deleteManagedResource();
    }

    state.hasNewlyCreatedResource = false;
    state.hasUnsavedChanges = false;
    switch (state.selectedResourceType) {
      case ManagedResourceType.SUBUNITS:
        if (state.nextSelectedSubUnit != null) {
          state.selectedSubUnit = state.nextSelectedSubUnit;
          state.nextSelectedSubUnit = null;
        } else if (state.nextSelectedResourceType != null) {
          state.selectedResourceType = state.nextSelectedResourceType;
          state.nextSelectedResourceType = null;
        }

        break;
      case ManagedResourceType.FUNCTIONS:
        if (state.nextSelectedFunction != null) {
          state.selectedFunction = state.nextSelectedFunction;
          state.nextSelectedFunction = null;
        } else if (state.nextSelectedResourceType != null) {
          state.selectedResourceType = state.nextSelectedResourceType;
          state.nextSelectedResourceType = null;
        }
        break;
      case ManagedResourceType.TRUCKS:
        if (state.nextSelectedTruck != null) {
          state.selectedTruck = state.nextSelectedTruck;
          state.nextSelectedTruck = null;
        } else if (state.nextSelectedResourceType != null) {
          state.selectedResourceType = state.nextSelectedResourceType;
          state.nextSelectedResourceType = null;
        }
        break;
    }
  },
  [M.CHANGES_SAVED]({ commit }) {
    state.hasNewlyCreatedResource = false;
    state.hasUnsavedChanges = false;
  },
  [M.SELECTED_RESOURCE_DATA_CHANGED]({ commit }) {
    state.hasUnsavedChanges = true;
  },
  [M.SHOW_UNSAVED_CHANGES_DIALOG]({ commit }) {
    state.showUnsavedChangesDialog = true;
  },
  [M.HIDE_UNSAVED_CHANGES_DIALOG]({ commit }) {
    state.showUnsavedChangesDialog = false;
  },
  [M.MANAGEMENT_SUBUNIT_NAME_CHANGE]({ commit }) {
    state.hasUnsavedChanges = true;
  },
};
const getters = {};

export default {
  state,
  actions,
  getters,
  mutations
};

function deleteManagedResource() {
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

function addTruck() {
  let newTruck = new Truck(Utils.createUUID(), "**Autospeciala nouă**", "**Autospeciala nouă**");
  state.managedTrucks.push(newTruck);
  state.selectedTruck = newTruck;
}

function addFunction() {
  let newFunction = new Function(Utils.createUUID(), "**Funcție nouă**");
  state.managedFunctions.push(newFunction);
  state.selectedFunction = newFunction;
}

function addSubUnit() {
  let newSubUnit = new SubUnit(Utils.createUUID(), "**Subunitate nouă**");
  state.managedSubUnits.push(newSubUnit);
  state.selectedSubUnit = newSubUnit;
}

function deleteSubUnit() {
  state.managedSubUnits.pop(
    state.managedSubUnits.find(s => s.id === state.selectedSubUnit.id)
  );
  state.selectedSubUnit = state.managedSubUnits[0];
}

function deleteFunction() {
  state.managedFunctions.pop(
    state.managedFunctions.find(f => f.id === state.selectedFunction.id)
  );
  state.selectedFunction = state.managedFunctions[0];
}

function deleteTruck() {
  state.managedTrucks.pop(
    state.managedTrucks.find(t => t.id === state.selectedTruck.id)
  );
  state.selectedTruck = state.managedTrucks[0];
}
