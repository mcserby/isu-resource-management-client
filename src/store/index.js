import Vue from "vue";
import Vuex from "vuex";

import PrincipalStore from "./modules/principal";
import ManagementStore from "./modules/management";
import ServicesStore from "./modules/services";
import UatStore from "./modules/uat";
import ReportStore from "./modules/report";
import WebsocketStore from "./modules/websocket";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    principalStore: PrincipalStore,
    servicesStore: ServicesStore,
    managementStore: ManagementStore,
    uatStore: UatStore,
    reportStore: ReportStore,
    websocket: WebsocketStore
  }
});
