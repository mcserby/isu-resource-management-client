import A from '../../constants/actions'
import M from '../../constants/mutations'
import Resource from '../../contracts/resource'
import Unit from '../../contracts/unit'
import Vue from 'vue'

// can be moved or removed, use contract for unit
const defaultUnits = [
  new Unit('Departament 1 CLUJ',[
    new Resource('BMW','CJ21ABC', '241', ['cpt. plt. Serby']),
    new Resource('AUDI','CJ21ABC', '241', ['cpt. plt. Serby'])
    ]),
  new Unit('Departament 2 CLUJ',[
    new Resource('AUTOBASCULANTA','CJ21ABC', '123', ['cpt. plt. Serby']),
    new Resource('MOTOSTIVUITOR','CJ21ABC', '456', ['cpt. plt. Serby', 'tatuca\'', 'iliescu']),
    new Resource('AMBULANTA','CJ55URG', '666', ['sofer ambulanta Fifth', 'copilu\''])
  ]),
  new Unit('GILAU',[
    new Resource('FANDROMA','CJ21ABC', '123', ['cpt. plt. Serby']),
    new Resource('CHOPPA','CJ21ABC', '456', ['cpt. plt. Serby']),
    new Resource('AMBULANTA','CJ55URG', '666', ['sofer ambulanta Fifth', 'boss care nu face nimic'])
  ]),
  new Unit('Deva',[
    new Resource('FANDROMA','CJ21ABC', '123', ['cpt. plt. Serby']),
    new Resource('CHOPPA','CJ21ABC', '456', ['cpt. plt. Serby']),
    new Resource('AMBULANTA','CJ55URG', '666', ['sofer ambulanta Fifth', 'boss care nu face nimic'])
  ]),
  new Unit('Vatra Dornei',[
    new Resource('FANDROMA','CJ21ABC', '123', ['cpt. plt. Serby']),
    new Resource('CHOPPA','CJ21ABC', '456', ['cpt. plt. Serby']),
    new Resource('AMBULANTA','CJ55URG', '666', ['sofer ambulanta Fifth', 'boss care nu face nimic'])
  ]),
  new Unit('Costesti',[
    new Resource('FANDROMA','CJ21ABC', '123', ['cpt. plt. Serby']),
    new Resource('CHOPPA','CJ21ABC', '456', ['cpt. plt. Serby']),
    new Resource('AMBULANTA','CJ55URG', '666', ['sofer ambulanta Fifth', 'boss care nu face nimic'])
  ]),
  new Unit('Scornicesti',[
    new Resource('FANDROMA','CJ21ABC', '123', ['cpt. plt. Serby']),
    new Resource('CHOPPA','CJ21ABC', '456', ['cpt. plt. Serby']),
    new Resource('AMBULANTA','CJ55URG', '666', ['sofer ambulanta Fifth', 'boss care nu face nimic'])
  ]),
  new Unit('Mamaia',[
    new Resource('FANDROMA','CJ21ABC', '123', ['cpt. plt. Serby']),
    new Resource('CHOPPA','CJ21ABC', '456', ['cpt. plt. Serby']),
    new Resource('AMBULANTA','CJ55URG', '666', ['sofer ambulanta Fifth', 'boss care nu face nimic'])
  ]),
  new Unit('Voronet',[
    new Resource('FANDROMA','CJ21ABC', '123', ['cpt. plt. Serby']),
    new Resource('CHOPPA','CJ21ABC', '456', ['cpt. plt. Serby']),
    new Resource('AMBULANTA','CJ55URG', '666', ['sofer ambulanta Fifth', 'boss care nu face nimic'])
  ])
]

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
