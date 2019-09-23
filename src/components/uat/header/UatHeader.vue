<template>
  <div class="principal-header">
    <div class="principal-title">ISU EasyManage - Management</div>
    <div class="other-modules-wrapper">
      <div class="service-button">
        <router-link class="btn custom-button" role="button" to="/principal">Principal</router-link>
      </div>
      <div class="uat-button">
        <router-link class="btn custom-button" role="button" to="/services">Servicii</router-link>
      </div>
      <div class="management-button">
        <router-link class="btn custom-button" role="button" to="/management">Management</router-link>
      </div>
      <div class="report-button">
        <router-link class="btn custom-button" role="button" to="/report">Raport</router-link>
      </div>
    </div>
  </div>
</template>

<style src="../../principal/header/principalHeader.css"></style>
<style src="../../main.css"></style>
