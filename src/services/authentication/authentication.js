import AppConfig from "../../config/appConfig";
import A from "../../constants/actions";
import KeyCloak from 'keycloak-js';

export default {
  authenticate: function(store, doAfterAuthenticate) {
    if (AppConfig.ui.authenticationRequired) {
      const keycloak = new KeyCloak(AppConfig.ui.auth);
      keycloak.init({onLoad: 'check-sso', checkLoginIframeInterval: 1}).success(authenticated => {
        if (keycloak.authenticated) {
          const userRoles = keycloak.realmAccess.roles;
          console.log('userRoles', userRoles);
          // TODO if user roles don't match:
          //Logger.error('User has no SmartSIS permissions assigned');
          //alert('You have no SmartSIS permissions assigned. You will be automatically logged out.');
          //keycloak.logout();
          sessionStorage.setItem('kctoken', keycloak.token);
          store.dispatch(A.AUTH_UPDATE_TOKEN, keycloak);
          keycloak.loadUserProfile().success(userProfile => {
            userProfile['userRoles'] = userRoles;
            store.dispatch(A.AUTH_SET_USER_PROFILE, userProfile);
            console.log('User has successfully logged in');
            doAfterAuthenticate();
          })
          setInterval(() => {
            keycloak.updateToken(10).error(() => keycloak.logout());
            sessionStorage.setItem('kctoken', keycloak.token);
            store.dispatch(A.AUTH_UPDATE_TOKEN, keycloak);
          }, 10000)
        } else {
          keycloak.login();
          doAfterAuthenticate();
        }
      });
    } else {
      doAfterAuthenticate();
    }
  }
}
