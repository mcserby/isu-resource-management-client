<template>
  <div class="principal-header">
    <div class="row justify-content-center" style="max-width: 99%">
      <div class="col-10 col-md-10 col-lg-10">
        <div class="principal-title">{{activeTab.name}}</div>
        <form class="search-bar-wrapper">
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
      <div class="col-2 col-md-2 col-lg-2">
        <div>Navighează către alte module</div>
        <div>
          <router-link class="btn menu-link" role="button" to="/services">Modul Servicii</router-link>
        </div>
        <div>
          <router-link class="btn menu-link" role="button" to="/uat">Modul UAT</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PrincipalHeader',
    components: {},
    computed: {
      activeTab () {
        return this.$store.state.principalStore.activeTab
      },
    }
  }
</script>

<style src="./principalHeader.css"></style>
