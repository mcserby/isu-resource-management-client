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
  searchText: '',
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
  [A.APPLY_FILTER] ({commit}, searchText) {
    commit(M.APPLY_FILTER, searchText)
  },
  [A.SHOW_PDF_FILE]({ commit }, response) {
    commit(M.SHOW_PDF_FILE, response);
  }
}

const mutations = {
  [M.INIT_UNITS](state, units) {
    state.units.splice(0, state.units.length);
    state.units = units;
    state.units.forEach(u => u.resources.sort((r1, r2) => sortResource(r1, r2)));
    state.units.forEach(u => u.resources.forEach(r => r.id = r.id || Utils.createUUID()));
    state.units.forEach(u => u.equipment.forEach(e => e.equipmentId = e.equipmentId || Utils.createUUID()));
  },
  [M.UNIT_UPDATED](state, unit) {
    let updatedUnit = state.units.find(u => u.name === unit.name);
    if (updatedUnit) {
      unit.resources.sort((r1, r2) => sortResource(r1, r2));
      unit.resources.forEach(r => r.id = r.id || Utils.createUUID());
      Vue.set(updatedUnit, 'resources', unit.resources);
      Vue.set(updatedUnit, 'equipment', unit.equipment);
      Vue.set(updatedUnit, 'lastUpdateFirstInterventionResource', unit.lastUpdateFirstInterventionResource);
      Vue.set(updatedUnit, 'lastUpdateOtherResource', unit.lastUpdateOtherResource);
      Vue.set(updatedUnit, 'lastUpdateEquipment', unit.lastUpdateEquipment);
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
    if (ResourceType.EQUIPMENT === state.activeTab.resourceType) {
      const resourceIndex = state.activeUnit.equipment.findIndex(r => r.id === resource.id);
      state.activeUnit.equipment.splice(resourceIndex, 1);
    } else {
      const resourceIndex = state.activeUnit.resources.findIndex(r => r.id === resource.id);
      state.activeUnit.resources.splice(resourceIndex, 1);
    }

  },
  [M.UPDATE_RESOURCE](state, resource) {
    if (ResourceType.EQUIPMENT === state.activeTab.resourceType) {
      const resourceIndex = state.activeUnit.equipment.findIndex(r => r.id === resource.id);
      state.activeUnit.equipment.splice(resourceIndex, 1, resource);
    } else {
      const resourceIndex = state.activeUnit.resources.findIndex(r => r.id === resource.id);
      state.activeUnit.resources.splice(resourceIndex, 1, resource);
    }
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
  [M.APPLY_FILTER](state, searchText) {
    state.searchText = searchText;
  },
  [M.SHOW_PDF_FILE](state, response) {
    // create the blob object with content-type "application/pdf"
    let newBlob = new Blob([b64toBlob(response)], { type: "application/pdf" });

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    }

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob);
    let link = document.createElement("a");
    link.href = data;
    link.download = "Report.xlsx";
    link.click();
  },
};

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || "";
  sliceSize = sliceSize || 512;

  let byteCharacters = atob(b64Data);
  let byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize);

    let byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    let byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  let blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

const getters = {}

export default {
  state,
  actions,
  getters,
  mutations,
}
