<template>
  <table>
    <thead>
    <tr>
      <th>Timestamp</th>
      <th>Author</th>
      <th>Status</th>
    </tr>
    </thead>
    <tbody>

    <tr v-for="(resourceLog) in resourceLogs.resourceLogs" >
      <td>
        {{resourceLog.updateTime}}
      </td>
      <td>
        {{resourceLog.author}}
      </td>
      <td>
        {{resourceLog.status}}
      </td>
    </tr>
    </tbody>
  </table>

  </template>

<script>

  export default {
    name: 'ResourceLogs',
    props: ['resourceLogs'],
  }
</script>

<style scoped>

</style>
