export default {
  server: {
    websocketUrl: window.isuEnv.serverUrl + 'resources-ws',
  },
  ui: {
    authenticationRequired: window.isuEnv.authenticationRequired,
    auth: {
      realm: 'ISU',
      url: 'http://' + window.isuEnv.authServiceUrl + '/auth',
      sslRequired: 'external',
      clientId: 'login',
      publicClient: true,
    },
  }
}
