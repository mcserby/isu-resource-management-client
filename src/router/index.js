import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main.vue';
import Services from '../components/services/Services.vue';
import Uat from '../components/uat/Uat.vue';
import Principal from '../components/principal/Principal.vue';
import WebsocketClient from '../components/websocket/WebsocketClient.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/principal',
      name: 'Principal',
      component: Principal
    },
    {
      path: '/services',
      name: 'Services',
      component: Services
    },
    {
      path: '/uat',
      name: 'UAT',
      component: Uat
    },
    {
      path: '/test',
      name: 'WebsocketClient',
      component: WebsocketClient
    }
  ]
})
