import A from '../../constants/actions'
import M from '../../constants/mutations'
import Vue from 'vue'
import Tab from '../../contracts/tab';
import ResourceType from '../../constants/resourceType';
import Resource from '../../contracts/resource';


function sortResource (r1, r2) {
  let res = state.statuses[r2.status.status] - state.statuses[r1.status.status]
  if (res === 0) {
    if (r1.vehicleType > r2.vehicleType) {
      return 1
    } else if (r2.vehicleType === r1.vehicleType) {
      return 0
    } else return -1
  } else {
    return res
  }
}

const tabs = [
  new Tab('Tehnică de primă intervenție', ResourceType.FIRST_INTERVENTION),
  new Tab('Alte tipuri de tehnică', ResourceType.OTHER),
  new Tab('Echipamente', ResourceType.EQUIPMENT)
];

const state = {
  units: [],
  tabs: tabs,
  activeTab: tabs[0],
  activeUnit: null,
  activeStatusMenuId : null,
  statusMenuIsOpen : false,
  activeResource: null,
  resourceDialogIsOpen: false,
  confirmationDialogIsOpen: false,
  resourceViewDialogIsOpen: false,
  statuses: {'IN_MISSION': 2, 'AVAILABLE': 1, 'UNAVAILABLE': 0}
}

const actions = {
  [A.INIT_UNITS] ({commit}, units) {
    commit(M.INIT_UNITS, units)
  },
  [A.UNIT_UPDATED] ({commit}, unit) {
    commit(M.UNIT_UPDATED, unit)
  },
  [A.CLEAR_UNIT_RESOURCES] ({commit}, unitId) {
    commit(M.CLEAR_UNIT_RESOURCES, unitId)
  },
  [A.OPEN_CONFIRMATION_DIALOG] ({commit}, unitId) {
    commit(M.OPEN_CONFIRMATION_DIALOG, unitId)
  },
  [A.CLOSE_CONFIRMATION_DIALOG] ({commit}) {
    commit(M.CLOSE_CONFIRMATION_DIALOG)
  },
  [A.OPEN_ADD_RESOURCE_DIALOG] ({commit}, unitId) {
    commit(M.OPEN_ADD_RESOURCE_DIALOG, unitId)
  },
  [A.CLOSE_ADD_RESOURCE_DIALOG] ({commit}) {
    commit(M.CLOSE_ADD_RESOURCE_DIALOG)
  },
  [A.CLOSE_VIEW_RESOURCE_DIALOG] ({commit}) {
    commit(M.CLOSE_VIEW_RESOURCE_DIALOG)
  },
  [A.OPEN_VIEW_RESOURCE_DIALOG] ({commit}, identificationNumber) {
    commit(M.OPEN_VIEW_RESOURCE_DIALOG, identificationNumber)
  },
  [A.ADD_RESOURCE] ({commit}, resource) {
    commit(M.ADD_RESOURCE, resource)
  },
  [A.LOCK_UNIT] ({commit}, unitName) {
    commit(M.LOCK_UNIT, unitName)
  },
  [A.UNLOCK_UNIT] ({commit}, unitName) {
    commit(M.UNLOCK_UNIT, unitName)
  },
  [A.CHANGE_ACTIVE_TAB] ({commit}, tab) {
    commit(M.CHANGE_ACTIVE_TAB, tab)
  },
  [A.OPEN_STATUS_MENU] ({commit}, resourceId) {
    commit(M.OPEN_STATUS_MENU, resourceId)
  },
  [A.CLOSE_STATUS_MENU] ({commit}) {
    commit(M.CLOSE_STATUS_MENU)
  }
}

const mutations = {
  [M.INIT_UNITS](state, units) {
    state.units.splice(0, state.units.length);
    state.units = units;
    units.forEach(u => u.resources.sort((r1, r2) => sortResource(r1, r2)))
  },
  [M.UNIT_UPDATED](state, unit) {
    let updatedUnit = state.units.find(u => u.name === unit.name);
    if (updatedUnit) {
      unit.resources.sort((r1, r2) => sortResource(r1, r2))
      Vue.set(updatedUnit, 'resources', unit.resources);
      Vue.set(updatedUnit, 'lastUpdate', unit.lastUpdate);
    }
  },
  [M.CLEAR_UNIT_RESOURCES](state, unitName) {
    let unit = state.units.find(u => u.name === unitName)
    if (unit) {
      let currentResourceType = state.activeTab.resourceType;
      let updatedUnitResources = unit.resources.filter(r => r.type != currentResourceType);
      Vue.set(unit, 'resources', updatedUnitResources)
    }
  },
  [M.OPEN_CONFIRMATION_DIALOG](state, unitName) {
    let unit = state.units.find(u => u.name === unitName);
    if (unit) {
      state.activeUnit = unit;
      state.confirmationDialogIsOpen = true;
    }
  },
  [M.CLOSE_CONFIRMATION_DIALOG](state) {
    state.confirmationDialogIsOpen = false;
  },
  [M.OPEN_VIEW_RESOURCE_DIALOG](state, resource) {
    for (let unit of state.units) {
      let res = unit.resources.find(r => r === resource)
      if (res) {
        state.activeUnit = unit;
        state.activeResource = resource;
        state.resourceViewDialogIsOpen = true;
      }
    }
  },
  [M.CLOSE_VIEW_RESOURCE_DIALOG](state) {
    state.resourceViewDialogIsOpen = false;
  },
  [M.CLOSE_CONFIRMATION_DIALOG](state) {
    state.confirmationDialogIsOpen = false;
  },
  [M.OPEN_ADD_RESOURCE_DIALOG](state, unitName) {
    let unit = state.units.find(u => u.name === unitName);
    if (unit) {
      state.activeUnit = unit;
      state.resourceDialogIsOpen = true;
    }
  },
  [M.CLOSE_ADD_RESOURCE_DIALOG](state) {
    state.resourceDialogIsOpen = false;
  },
  [M.ADD_RESOURCE](state, resource) {
    state.activeUnit.resources.push(resource);
  },
  [M.LOCK_UNIT](state, unitName) {
    let unit = state.units.find(u => u.name === unitName);
    if (unit) {
      Vue.set(unit, 'isLocked', true);
    }
  },
  [M.UNLOCK_UNIT](state, unitName) {
    let unit = state.units.find(u => u.name === unitName);
    if (unit) {
      Vue.set(unit, 'isLocked', false);
    }
  },
  [M.CHANGE_ACTIVE_TAB](state, tab) {
    state.activeTab = tab;
  },
  [M.OPEN_STATUS_MENU](state, resourceId) {
    state.statusMenuIsOpen = true;
    state.activeStatusMenuId = resourceId;
  },
  [M.CLOSE_STATUS_MENU](state) {
    state.statusMenuIsOpen = false;
  }
}

const getters = {}

export default {
  state,
  actions,
  getters,
  mutations,
}
