<template>
  <div class="main-wrapper app-sa">
    <div class = "menu-wrapper">
      <div id="headline">
        ISU EasyManage
      </div>
      <router-link class="btn custom-button" role="button" to="/principal">Principal</router-link>
      <router-link class="btn custom-button" role="button" to="/services">Servicii</router-link>
      <router-link class="btn custom-button" role="button" to="/uat">UAT</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
}
</script>
<style src="./main.css"></style>
