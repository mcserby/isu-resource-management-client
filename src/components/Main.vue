<template>
  <div class="main-wrapper">
<!--    <div id="headline">
      ISU - Managementul resurselor
    </div>-->
    <div class = "menu-wrapper">
      <div id="headline">
        ISU EasyManage
      </div>
      <router-link class="btn menu-link" role="button" to="/principal">Modul Principal</router-link>
      <router-link class="btn menu-link" role="button" to="/services">Modul Servicii</router-link>
      <router-link class="btn menu-link" role="button" to="/uat">Modul UAT</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
}
</script>
<style src="./main.css"></style>
