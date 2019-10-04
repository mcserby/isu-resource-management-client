import A from '../../constants/actions';
import M from '../../constants/mutations';
import Location from '../../contracts/uat/location';

const dummyLocations = [
  new Location("1", "Pe dealu cu flori", [2000.0, 2000.5], [{
    id: 1,
    name: "Padurea cu alune"
  }, {
    id: 2,
    name: "Cenusareasa"
  }]),
  new Location("2", "Acasa la Serby", [4000.0, 3000.5], [{
    id: 1,
    name: "Living"
  }, {
    id: 2,
    name: "Bucatarie"
  }])
]

const state = {
  locations: dummyLocations,
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
  }
};

const getters = {};

export default {
  state,
  actions,
  getters,
  mutations,
};
