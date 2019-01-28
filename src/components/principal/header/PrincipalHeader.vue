<template>
  <div class="principal-header">
    <div class="principal-title">{{activeTab.name}}</div>
    <div class="search-bar-wrapper">
      <form>
        <div class="row no-gutters align-items-center">
          <div class="col-auto">
            <i class="fas fa-search h4 text-body"></i>
          </div>
          <div class="col">
            <input class="form-control form-control-lg form-control-borderless"  v-model="searchText" type="search" placeholder="caută">
          </div>
          <div class="col-auto">
            <button class="btn btn-lg  custom-button " type="submit">Caută</button>
          </div>
        </div>
      </form>
    </div>
    <div v-if="searchText !== ''" class="filter-activated">Filtru activ!</div>
    <div class="other-modules-wrapper">
      <div>
        <router-link class="btn menu-link-custom-properties menu-link" role="button" to="/services">Modul Servicii</router-link>
      </div>
      <div>
        <router-link class="btn menu-link-custom-properties menu-link" role="button" to="/uat">Modul UAT</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import A from '../../../constants/actions';

  export default {
    name: 'PrincipalHeader',
    components: {},
    computed: {
      searchText: {
        get () {
          return this.$store.state.principalStore.searchText;
        },
        set (value) {
          this.$store.dispatch(A.APPLY_RESOURCE_FILTER, value);
        },
      },
      activeTab() {
        return this.$store.state.principalStore.activeTab
      },
    },
  }
</script>

<style src="./principalHeader.css"></style>
<style src="../../main.css"></style>
