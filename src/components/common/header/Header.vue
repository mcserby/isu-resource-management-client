<template>
  <div class="principal-header">
    <div class="principal-title">ISU EasyManage - {{title}}</div>
    <div class="search-bar-wrapper" v-if="displaySearchBar">
      <form>
        <div class="row no-gutters align-items-center">
          <div class="col-auto">
            <i class="fas fa-search h4 text-body"></i>
          </div>
          <div class="col">
            <input class="form-control form-control-lg form-control-borderless"
                   v-model="searchText" type="search" :placeholder="searchBarPlaceholder">
          </div>
        </div>
      </form>
    </div>
    <div v-if="searchText !== ''" class="filter-activated">Filtru activ!</div>
    <div class="user-info">
      <span>Salut {{username}}!</span>
      <span> </span>
      <span> </span>
      <span><a href="#" v-on:click="logout($event)">Deconectare</a></span>
    </div>
    <div class="other-modules-wrapper">
      <div v-for="module in modules" v-bind:class="module.class" v-if="hasPermissions(module.associatedRole)">
        <router-link class="custom-button btn" role="button" :to="module.link">{{module.name}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>

  import A from "../../../constants/actions";
  import Modules from '../../../config/modules';

  export default {
    name: "Header",
    props: {
      title : String,
      displaySearchBar: Boolean,
      searchBarPlaceholder: String,
    },
    data: () => {
      return {
        confirmationDialogTitle: "Schimb de tură",
        modules: [ Modules.principal, Modules.services, Modules.reports, Modules.management, Modules.uat],
      };
    },
    components: {},
    computed: {
      username() {
        return this.$store.state.user.userProfile.username;
      },
      userRoles() {
        return this.$store.state.user.userProfile.userRoles;
      },
      searchText: {
        get() {
          return this.$store.state.principalStore.searchText;
        },
        set(value) {
          this.$emit('text', value);
        }
      },
      activeTab() {
        return this.$store.state.principalStore.activeTab;
      },
    },
    methods: {
      hasPermissions(moduleName){
        if(!moduleName){
          return true;
        }
        return Boolean(
          this.userRoles.find(r => r === moduleName)
        );
      },
      logout(event){
        this.$store.dispatch(A.AUTH_LOGOUT, null);
        console.log("user logout successfully.");
        event.preventDefault();
      }
    }
  };
</script>

<style src="./header.css"></style>
<style src="../../main.css"></style>
