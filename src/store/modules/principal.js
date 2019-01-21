import A from '../../constants/actions'
import M from '../../constants/mutations'
import Vue from 'vue'
import Tab from '../../contracts/tab';
import ResourceType from '../../constants/resourceType';
import ResourceStatus from '../../constants/resourceStatus';
import LockUnit from '../../contracts/edit/lockUnit';
import Utils from '../../services/utils';

function sortResource (r1, r2) {
  return state.statuses[r2.status.status] === state.statuses[r1.status.status] ? r1.vehicleType.localeCompare(r2.vehicleType) :
    state.statuses[r2.status.status] - state.statuses[r1.status.status];
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
  activeEquipment: null,
  resourceDialogIsOpen: false,
  equipmentDialogIsOpen: false,
  addEquipmentDialogIsOpen: false,
  confirmationDialogIsOpen: false,
  resourceViewDialogIsOpen: false,
  statuses: {[ResourceStatus.IN_MISSION]: 2, [ResourceStatus.AVAILABLE]: 1, [ResourceStatus.UNAVAILABLE] : 0},
  lockUnits: [],
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
  },
  [A.DELETE_RESOURCE] ({commit}, resource) {
    commit(M.DELETE_RESOURCE, resource)
  },
  [A.UPDATE_RESOURCE] ({commit}, resource) {
    commit(M.UPDATE_RESOURCE, resource)
  },
  [A.UPDATE_EQUIPMENT] ({commit}, equipment) {
    commit(M.UPDATE_EQUIPMENT, equipment)
  },
}

const mutations = {
  [M.INIT_UNITS](state, units) {
    state.units.splice(0, state.units.length);
    state.units = units;
    state.units.forEach(u => u.resources.sort((r1, r2) => sortResource(r1, r2)));
    state.units.forEach(u => u.resources.forEach(r => r.id = r.id || Utils.createUUID()));
  },
  [M.UNIT_UPDATED](state, unit) {
    let updatedUnit = state.units.find(u => u.name === unit.name);
    if (updatedUnit) {
      unit.resources.sort((r1, r2) => sortResource(r1, r2));
      unit.resources.forEach(r => r.id = r.id || Utils.createUUID());
      Vue.set(updatedUnit, 'resources', unit.resources);
      Vue.set(updatedUnit, 'equipment', unit.equipment);
      Vue.set(updatedUnit, 'lastUpdate', unit.lastUpdate);
    }
  },
  [M.CLEAR_UNIT_RESOURCES](state, unitName) {
    let unit = state.units.find(u => u.name === unitName)
    if (unit) {
      let currentResourceType = state.activeTab.resourceType;
      let updatedUnitResources = unit.resources.filter(r => r.type !== currentResourceType);
      Vue.set(unit, 'resources', updatedUnitResources)
      let updatedUnitEquipments = unit.equipment.filter(r => r.resourceType !== currentResourceType);
      Vue.set(unit, 'equipment', updatedUnitEquipments)
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
      if (ResourceType.EQUIPMENT === state.activeTab.resourceType) {
        let equipment = unit.equipment.find(r => r === resource)
        if (equipment) {
          state.activeUnit = unit;
          state.activeEquipment = resource;
          state.equipmentDialogIsOpen = true;
        }
      } else {
        let res = unit.resources.find(r => r === resource)
        if (res) {
          state.activeUnit = unit;
          state.activeResource = resource;
          state.resourceViewDialogIsOpen = true;
        }
      }
    }
  },
  [M.CLOSE_VIEW_RESOURCE_DIALOG](state) {
    if (ResourceType.EQUIPMENT === state.activeTab.resourceType) {
      state.equipmentDialogIsOpen = false;
    } else {
      state.resourceViewDialogIsOpen = false;
    }
  },
  [M.CLOSE_CONFIRMATION_DIALOG](state) {
      state.confirmationDialogIsOpen = false;
  },
  [M.OPEN_ADD_RESOURCE_DIALOG](state, unitName) {
    let unit = state.units.find(u => u.name === unitName);
    if (unit) {
      state.activeUnit = JSON.parse(JSON.stringify(unit));
      if (ResourceType.EQUIPMENT === state.activeTab.resourceType) {
        state.addEquipmentDialogIsOpen = true;
      } else {
        state.resourceDialogIsOpen = true;
      }
    }
  },
  [M.CLOSE_ADD_RESOURCE_DIALOG](state) {
    if (ResourceType.EQUIPMENT === state.activeTab.resourceType) {
      state.addEquipmentDialogIsOpen = false;
    } else {
      state.resourceDialogIsOpen = false;
    }
  },
  [M.ADD_RESOURCE](state, resource) {
    if (ResourceType.EQUIPMENT === state.activeTab.resourceType) {
      state.activeUnit.equipment.push(resource);
    } else {
      state.activeUnit.resources.push(resource);
    }
  },
  [M.DELETE_RESOURCE](state, resource) {
    const resourceIndex = state.activeUnit.resources.findIndex(r => r.id === resource.id);
    state.activeUnit.resources.splice(resourceIndex, 1);
  },
  [M.UPDATE_RESOURCE](state, resource) {
    const resourceIndex = state.activeUnit.resources.findIndex(r => r.id === resource.id);
    state.activeUnit.resources.splice(resourceIndex, 1, resource);
  },
  [M.LOCK_UNIT](state, lockResponse) {
    let unit = state.lockUnits.find(u => u.name === lockResponse.subUnitName);
    if (unit) {
      Vue.set(unit, 'resourceTypes', lockResponse.lockedResourceTypes);
    } else {
      state.lockUnits.push(new LockUnit(lockResponse.subUnitName, lockResponse.lockedResourceTypes));
    }
  },
  [M.UNLOCK_UNIT](state, unlockResponse) {
    let unit = state.lockUnits.find(u => u.name === unlockResponse.subUnitName);
    const resourceTypes = unit.resourceTypes.filter(r => unlockResponse.lockedResourceTypes.indexOf(r) === -1);
    if (unit) {
      Vue.set(unit, 'resourceTypes', resourceTypes);
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
  },
  [M.UPDATE_EQUIPMENT](state, equipment) {
    //var updatedUnit = state.units.filter(u => u.equipment && u.equipment.equipmentId === equipment.equipmentId);
    var updatedUnit = state.units.filter(function(u){
      console.log(u.equipment[0].equipmentId);
    });

    console.log('a');
  },
}

const getters = {}

export default {
  state,
  actions,
  getters,
  mutations,
}
