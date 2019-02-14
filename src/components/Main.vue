<template>
  <div class="main-wrapper app-sa">
    <div class = "menu-wrapper">
      <div id="headline">
        ISU EasyManage
      </div>
      <router-link class="custom-button btn" role="button" to="/principal">Principal</router-link>
      <router-link class="custom-button btn" role="button" to="/services">Servicii</router-link>
      <router-link class="custom-button btn" role="button" to="/uat">UAT</router-link>
      <router-link class="custom-button btn" role="button" to="/management">Management</router-link>
    </div>
  </div>
</template>

<script>
  export default {
  name: 'Main',

}
</script>
<style src="./main.css"></style>
