import A from '../../constants/actions'
import M from '../../constants/mutations'
import Vue from 'vue'
import Tab from '../../contracts/tab';
import ResourceType from '../../constants/resourceType';
import Resource from '../../contracts/resource';

const tabs = [
  new Tab('Tehnică de primă intervenție', ResourceType.INTERVENTION),
  new Tab('Alte tipuri de tehnică', ResourceType.OTHER),
  new Tab('Echipamente', ResourceType.EQUIPMENT)
];

const state = {
  units: [],
  tabs: tabs,
  activeTab: tabs[0],
  activeUnit: null,
  activeResource: null,
  resourceDialogIsOpen: false,
  confirmationDialogIsOpen: false,
  resourceViewDialogIsOpen: false
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
}

const mutations = {
  [M.INIT_UNITS] (state, units) {
    state.units.splice(0, state.units.length);
    // TODO randomly assigned type should be changed to the one receive from the backend service once ready
    units.forEach(u => u.resources.forEach(r => r.type = [ResourceType.EQUIPMENT, ResourceType.INTERVENTION, ResourceType.OTHER][Math.floor((Math.random() * 3))]));
    state.units = units;
  },
  [M.UNIT_UPDATED] (state, unit) {
    let updatedUnit = state.units.find(u =>  u.name === unit.name);
    if (updatedUnit) {
      // TODO randomly assigned type should be changed to the one receive from the backend service once ready
      unit.resources.forEach(r => r.type = [ResourceType.EQUIPMENT, ResourceType.INTERVENTION, ResourceType.OTHER][Math.floor((Math.random() * 3))]);
      Vue.set(updatedUnit, 'resources', unit.resources);
      Vue.set(updatedUnit, 'lastUpdate', unit.lastUpdate);
    }
  },
  [M.CLEAR_UNIT_RESOURCES] (state, unitName) {
    let unit = state.units.find(u =>  u.name === unitName)
    if (unit) {
      Vue.set(unit, 'resources', [])
    }
  },
  [M.OPEN_CONFIRMATION_DIALOG] (state, unitName) {
    let unit = state.units.find(u => u.name === unitName);
    if(unit){
      state.activeUnit = unit;
      state.confirmationDialogIsOpen = true;
    }
  },
  [M.CLOSE_CONFIRMATION_DIALOG] (state) {
    state.confirmationDialogIsOpen = false;
  },
 [M.OPEN_VIEW_RESOURCE_DIALOG] (state, resource) {
    for (let unit of state.units) {
      let res = unit.resources.find(r => r === resource)
      if (res) {
        state.activeUnit = unit;
        state.activeResource = resource;
        state.resourceViewDialogIsOpen = true;
      }
    }
},
  [M.CLOSE_VIEW_RESOURCE_DIALOG] (state) {
    state.resourceViewDialogIsOpen = false;
  },
[M.CLOSE_CONFIRMATION_DIALOG] (state) {
  state.confirmationDialogIsOpen = false;
},
  [M.OPEN_ADD_RESOURCE_DIALOG] (state, unitName) {
    let unit = state.units.find(u => u.name === unitName);
    if(unit){
      state.activeUnit = unit;
      state.resourceDialogIsOpen = true;
    }
  },
  [M.CLOSE_ADD_RESOURCE_DIALOG] (state) {
    state.resourceDialogIsOpen = false;
  },
  [M.ADD_RESOURCE] (state, resource) {
    state.activeUnit.resources.push(resource);
  },
  [M.LOCK_UNIT] (state, unitName) {
    let unit = state.units.find(u => u.name === unitName);
    if (unit) {
      Vue.set(unit, 'isLocked', true);
    }
  },
  [M.UNLOCK_UNIT] (state, unitName) {
    let unit = state.units.find(u => u.name === unitName);
    if (unit) {
      Vue.set(unit, 'isLocked', false);
    }
  },
  [M.CHANGE_ACTIVE_TAB] (state, tab) {
    state.activeTab = tab;
  },
}

const getters = {}

export default {
  state,
  actions,
  getters,
  mutations,
}
