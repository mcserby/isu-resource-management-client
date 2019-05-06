import Vue from "vue";
import Router from "vue-router";
import Main from "../components/Main.vue";
import Services from "../components/services/Services.vue";
import Report from "../components/reports/Report.vue";
import Uat from "../components/uat/Uat.vue";
import Principal from "../components/principal/Principal.vue";
import Management from "../components/management/Management.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/principal",
      name: "Principal",
      component: Principal
    },
    {
      path: "/",
      redirect: "principal"
    },
    {
      path: "/services",
      name: "Services",
      component: Services
    },
    {
      path: "/uat",
      name: "UAT",
      component: Uat
    },
    {
      path: "/report",
      name: "Report",
      component: Report
    },
    {
      path: "/management",
      name: "Management",
      component: Management
    }
  ]
});
