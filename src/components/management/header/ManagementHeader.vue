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
        <router-link class="btn custom-button" role="button" to="/uat">UAT</router-link>
      </div>
      <div class="report-button">
        <button class="btn custom-button" role="button" @click="generateReport()">Raport</button>
      </div>
    </div>
  </div>
</template>

<style src="../../principal/header/principalHeader.css"></style>
<style src="../../main.css"></style>
