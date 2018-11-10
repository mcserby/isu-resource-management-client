import A from '../../constants/actions'
import M from '../../constants/mutations'
import Vue from 'vue'

// can be moved or removed, use contract for unit
const defaultUnits = [{
  id: 'CLUJ',
  resources: [{
    name: 'BMW',
    plateNumber: 'CJ21ABC',
    identificationNumber: '241',
    crew: ['cpt. plt. Serby']
  }, {name: 'AUDI', plateNumber: 'CJ21ABC', identificationNumber: '241', crew: ['cpt. plt. Serby']}],
},
  {
    id: 'DEJ',
    resources: [{
      name: 'AUTOBASCULANTA',
      plateNumber: 'CJ21ABC',
      identificationNumber: '241',
      crew: ['cpt. plt. Serby']
    }, {name: 'MOTOPERCUTOR', plateNumber: 'CJ21ABC', identificationNumber: '241', crew: ['cpt. plt. Serby']}],
  },
  {
    id: 'FLORESTI',
    resources: [{
      name: 'FANDROMA',
      plateNumber: 'CJ21ABC',
      identificationNumber: '241',
      crew: ['cpt. plt. Serby']
    }, {name: 'TAF', plateNumber: 'CJ21ABC', identificationNumber: '241', crew: ['cpt. plt. Serby']}, {
      name: 'CHOPPA',
      plateNumber: 'CJ21ABC',
      identificationNumber: '241',
      crew: ['cpt. plt. Serby']
    }],
  }]

const state = {
  units: defaultUnits,
  activeUnit: null,
  resourceDialogIsOpen: false,
}

const actions = {
  [A.CLEAR_UNIT_RESOURCES] ({commit}, unitId) {
    commit(M.CLEAR_UNIT_RESOURCES, unitId)
  },
  [A.OPEN_ADD_RESOURCE_DIALOG] ({commit}, unitId) {
    commit(M.OPEN_ADD_RESOURCE_DIALOG, unitId)
  },
  [A.CLOSE_ADD_RESOURCE_DIALOG] ({commit}) {
    commit(M.CLOSE_ADD_RESOURCE_DIALOG)
  },
  [A.ADD_RESOURCE] ({commit}, resource) {
    commit(M.ADD_RESOURCE, resource)
  },
}

const mutations = {
  [M.CLEAR_UNIT_RESOURCES] (state, unitId) {
    let unit = state.units.find(u => u.id === unitId)
    if (unit) {
      Vue.set(unit, 'resources', [])
    }
  },
  [M.OPEN_ADD_RESOURCE_DIALOG] (state, unitId) {
    let unit = state.units.find(u => u.id === unitId);
    if(unit){
      state.activeUnit = unit;
    }
    state.resourceDialogIsOpen = true;
  },
  [M.CLOSE_ADD_RESOURCE_DIALOG] (state, unitId) {
    state.resourceDialogIsOpen = false;
  },
  [M.ADD_RESOURCE] (state, resource) {
    state.activeUnit.resources.push(resource);
  },
}

const getters = {}

export default {
  state,
  actions,
  getters,
  mutations,
}
