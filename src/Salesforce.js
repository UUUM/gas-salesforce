var Salesforce = function Salesforce(clientId, clientSecret) {
  this.clientId = clientId;
  this.clientSecret = clientSecret;

  this.service = this.createService();
};

Salesforce.prototype.createService = function createService() {
  var service = OAuth2.createService('salesforce');

  // Set the endpoint URLs
  service.setAuthorizationBaseUrl('https://login.salesforce.com/services/oauth2/authorize');
  service.setTokenUrl('https://login.salesforce.com/services/oauth2/token');

  // Set the client Id and secret
  service.setClientId(this.clientId);
  service.setClientSecret(this.clientSecret);

  // Set the property store where authorized tokens should be persisted.
  service.setPropertyStore(PropertiesService.getUserProperties());

  return service;
};

Salesforce.prototype.getAuthorizationUrl = function getAuthorizationUrl() {
  return this.service.getAuthorizationUrl();
};

Salesforce.prototype.setCallback = function setCallback(callback) {
  this.service.setCallbackFunction(callback);
  return this;
};
