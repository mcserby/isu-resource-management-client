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
            <input class="form-control form-control-lg form-control-borderless" type="search" placeholder="Search">
          </div>
          <div class="col-auto">
            <button class="btn btn-lg btn-success" type="submit">Search</button>
          </div>
        </div>
      </form>
    </div>
    <div class = "other-modules-wrapper">
      <div>Navighează către alte module</div>
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
  export default {
    name: 'PrincipalHeader',
    components: {},
    computed: {
      activeTab() {
        return this.$store.state.principalStore.activeTab
      },
    }
  }
</script>

<style src="./principalHeader.css"></style>
<style src="../../main.css"></style>
