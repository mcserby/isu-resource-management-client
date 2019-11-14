import A from '../../constants/actions';
import M from '../../constants/mutations';
import Location from '../../contracts/uat/location';

const state = {
  locations: [],
  currentLocation: null
};

const actions = {
  [A.ADD_LOCATION]({
    commit
  }, location) {
    commit(M.ADD_LOCATION, location);
  },
  [A.DELETE_LOCATION]({
    commit
  }, location) {
    commit(M.DELETE_LOCATION, location);
  },
  [A.INIT_LOCATIONS]({ commit }, locationsUpdate) {
    commit(M.INIT_LOCATIONS, locationsUpdate);
  },
};

const mutations = {
  [M.ADD_LOCATION](state, location) {
    const locationIndex = state.locations.findIndex(
      l => l.id === location.id
    );
    if(locationIndex >= 0){
      state.locations.splice(locationIndex, 1);
    }
    state.locations.push(location);
  },
  [M.DELETE_LOCATION](state, location) {
    const locationIndex = state.locations.findIndex(
      l => l.id === location.id
    );
    state.locations.splice(locationIndex, 1);
  },
  [M.INIT_LOCATIONS](state, locationsUpdate) {
    state.locations.splice(0, state.locations.length);
    state.locations = locationsUpdate.locations;
  },
};

const getters = {};

export default {
  state,
  actions,
  getters,
  mutations,
};
