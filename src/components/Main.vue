<template>
  <div id = "content">
    <div v-on:click="changeActiveModule(availableModules.PRINCIPAL_MODULE)">Modulul Principal</div>
    <div v-on:click="changeActiveModule(availableModules.UAT_MODULE)">Modulul UAT</div>
    <div v-on:click="changeActiveModule(availableModules.SERVICES_MODULE)">Modulul servicii</div>
    <component v-bind:is="activeModule"></component>
  </div>
</template>

<script>
import AvailableModulesContract from '../contracts/availableModules';
import PricipalModule from './Principal/Principal';
import ServicesModule from './Services/Services';
import UatModule from './Uat/Uat';

export default {
  components: {
    'PrincipalModule': PricipalModule,
    'ServicesModule': ServicesModule,
    'UatModule': UatModule
  },
  data: function () {
    return {
      availableModules: AvailableModulesContract.availableModules,
      activeModule: AvailableModulesContract.availableModules.PRINCIPAL_MODULE
    }
  },
  methods: {
    changeActiveModule: function (newActiveModule) {
      this.activeModule = newActiveModule;
    }
  }
}

</script>

<style scoped>
  #content{
    display : grid;
    grid-template-columns: 33.3% 33.3% 33.3%;
  }

  #content div{
    background : #3bbced;
    padding: 30px;
    border: 1px  solid;
  }

  #content div:nth-child(even){
    background : #777;
  }
</style>
