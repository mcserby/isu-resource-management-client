import A from '../../constants/actions';
import M from '../../constants/mutations';

const state = {
  locations: [{
      id: "1",
      name: "Pe dealu cu flori",
      location: {
        "type": "Point",
        "coordinates": [2000.0, 2000.5]
      },
      pointsOfInterest: [{
        id: 1,
        name: "Padurea cu alune"
      }, {
        id: 2,
        name: "Cenusareasa"
      }]
    },
    {
      id: "2",
      name: "Acasa la Serby",
      location: {
        "type": "Point",
        "coordinates": [4000.0, 3000.5]
      },
      pointsOfInterest: [{
        id: 1,
        name: "Living"
      }, {
        id: 2,
        name: "Bucatarie"
      }]
    }
  ],
  currentLocation: null
};

const actions = {};

const mutations = {};

const getters = {};

export default {
  state,
  actions,
  getters,
  mutations,
};
