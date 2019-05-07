<template>
  <div class="principal-header">
    <div class="principal-title">ISU EasyManage - Principal</div>
    <div class="search-bar-wrapper">
      <form>
        <div class="row no-gutters align-items-center">
          <div class="col-auto">
            <i class="fas fa-search h4 text-body"></i>
          </div>
          <div class="col">
            <input class="form-control form-control-lg form-control-borderless"  v-model="searchText" type="search" placeholder="Caută după cheia misiunii">
          </div>
        </div>
      </form>
    </div>
    <div v-if="searchText !== ''" class="filter-activated">Filtru activ!</div>
    <div class="other-modules-wrapper">
      <div class="service-button">
        <router-link class="custom-button btn" role="button" to="/services">Servicii</router-link>
      </div>
      <div class="uat-button">
        <router-link class="custom-button btn" role="button" to="/uat">UAT</router-link>
      </div>
      <div class="management-button">
        <router-link class="custom-button btn" role="button" to="/management">Management</router-link>
      </div>
      <div class="report-button">
        <router-link class="custom-button btn" role="button" to="/report">Raport</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import A from "../../../constants/actions";
import WebsocketSend from "../../../contracts/websocketSend";
import UnlockSubUnitRequest from "../../../contracts/edit/unlockSubUnitRequest";

export default {
  name: "PrincipalHeader",
  components: {},
  computed: {
    searchText: {
      get() {
        return this.$store.state.principalStore.searchText;
      },
      set(value) {
        this.$store.dispatch(A.APPLY_RESOURCE_FILTER, value);
      }
    },
    activeTab() {
      return this.$store.state.principalStore.activeTab;
    }
  },
  methods: {
    generateReport() {
      this.$store.dispatch(
        A.WEBSOCKET_SEND,
        new WebsocketSend(
          "getEquipmentReport",
          new UnlockSubUnitRequest("", "")
        )
      );
    }
  }
};
</script>

<style src="./principalHeader.css"></style>
<style src="../../main.css"></style>
