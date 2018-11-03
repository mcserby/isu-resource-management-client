import A from '../../constants/actions';
import M from '../../constants/mutations';
import Vue from 'vue';

// can be moved or removed, use contract for unit
const defaultUnits = [{
  id: 'CLUJ',
  resources: [{name: 'BMW'}, {name: 'AUDI'}],
},
  {
    id: 'DEJ',
    resources: [{name: 'AUTOBASCULANTA'}, {name: 'MOTOPERCUTOR'}],
  }];

const state = {
  units: defaultUnits,
};

const actions = {
  [A.CLEAR_UNIT_RESOURCES]({commit}, unitId) {
    commit(M.CLEAR_UNIT_RESOURCES, unitId);
  },
};

const mutations = {
  [M.CLEAR_UNIT_RESOURCES](state, unitId) {
    let unit = state.units.find(u => u.id === unitId);
    if (unit){
      Vue.set(unit, 'resources', []);
    }
  },
};

const getters = {};

export default {
  state,
  actions,
  getters,
  mutations,
};
