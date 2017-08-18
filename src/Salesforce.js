var Salesforce = function Salesforce(clientId, clientSecret) {
  this.serviceName = 'salesforce';

  this.authorizationBaseUrl = 'https://login.salesforce.com/services/oauth2/authorize';
  this.tokenUrl = 'https://login.salesforce.com/services/oauth2/token';

  this.callback = 'authCallback';

  this.clientId = clientId;
  this.clientSecret = clientSecret;

  this.oauth2 = this.createOAuth2();
};

Salesforce.prototype.createOAuth2 = function createOAuth2() {
  var oauth2 = new OAuth2Client(this.serviceName);

  oauth2.setAuthorizationBaseUrl(this.authorizationBaseUrl);
  oauth2.setTokenUrl(this.tokenUrl);

  oauth2.setClientId(this.clientId);
  oauth2.setClientSecret(this.clientSecret);

  oauth2.setCallback(this.callback);

  return oauth2;
};
