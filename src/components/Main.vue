<template>
  <div class="main-wrapper">
<!--    <div id="headline">
      ISU - Managementul resurselor
    </div>-->
    <div class = "menu-wrapper">
      <div id="headline">
        ISU - Managementul resurselor
      </div>
      <router-link class="btn menu-link" role="button" to="/principal">Modulul Principal</router-link>
      <router-link class="btn menu-link" role="button" to="/services">Modulul Servicii</router-link>
      <router-link class="btn menu-link" role="button" to="/uat">Modulul UAT</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
}
</script>
<style src="./main.css"></style>
