/**
 * Manual facebook login flow
 * https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow
 * http://localhost:3000/api/auth/facebook
 */

export default {
  clientId: '1655272257894090',
  clientSecret: '7971deaa031f28a9bffa5dba9e2d9bff',
  callbackUrl: 'https://localhost/api/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'email']
}