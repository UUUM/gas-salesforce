var OAuth2Client = function OAuth2Client(clientId, clientSecret) {
  if (!Obj.isString(clientId) || clientId.length < 1) {
    throw new Error('clientId must be specified');
  }
  this.clientId = clientId;

  if (!Obj.isString(clientSecret) || clientSecret.length < 1) {
    throw new Error('clientSecret must be specified');
  }
  this.clientSecret = clientSecret;

  this.service = this.createService();
};

OAuth2Client.prototype.serviceName = 'salesforce';

OAuth2Client.prototype.authorizationBaseUrl = 'https://login.salesforce.com/services/oauth2/authorize';
OAuth2Client.prototype.tokenUrl = 'https://login.salesforce.com/services/oauth2/token';

OAuth2Client.prototype.callbackFunction = 'authCallback';

OAuth2Client.prototype.callback = function callback(request) {
  var isAuthorized = this.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  }
  return HtmlService.createHtmlOutput('Denied. You can close this tab');
};

OAuth2Client.prototype.createService = function createService() {
  var service = OAuth2.createService(this.serviceName);

  service.setAuthorizationBaseUrl(this.authorizationBaseUrl);
  service.setTokenUrl(this.tokenUrl);

  service.setClientId(this.clientId);
  service.setClientSecret(this.clientSecret);

  service.setCallbackFunction(this.callbackFunction);

  service.setPropertyStore(PropertiesService.getUserProperties());

  return service;
};

OAuth2Client.prototype.doGet = function doGet() {
  var template = HtmlService.createTemplateFromFile('authorization');
  template.authorizationUrl = this.getAuthorizationUrl();
  return template.evaluate();
};

OAuth2Client.prototype.getAccessToken = function getAccessToken() {
  return this.service.getAccessToken();
};

OAuth2Client.prototype.getAuthorizationUrl = function getAuthorizationUrl() {
  return this.service.getAuthorizationUrl();
};

OAuth2Client.prototype.getInstanceUrl = function getInstanceUrl() {
  if (!this.hasAccess()) {
    return false;
  }

  return this.getToken().instance_url;
};

OAuth2Client.prototype.getRedirectUrl = function getRedirectUrl() {
  return this.service.getRedirectUri();
};

OAuth2Client.prototype.getToken = function getToken() {
  return this.service.getToken_();
};

OAuth2Client.prototype.handleCallback = function handleCallback(request) {
  return this.service.handleCallback(request);
};

OAuth2Client.prototype.hasAccess = function hasAccess() {
  return this.service.hasAccess();
};

OAuth2Client.prototype.reset = function reset() {
  return this.service.reset();
};

OAuth2Client.prototype.setAuthorizationBaseUrl = function setAuthorizationBaseUrl(url) {
  this.service.setAuthorizationBaseUrl(url);
  return this;
};

OAuth2Client.prototype.setCallback = function setCallback(callback) {
  this.service.setCallbackFunction(callback);
  return this;
};

OAuth2Client.prototype.setClientId = function setClientId(clientId) {
  this.service.setClientId(clientId);
  return this;
};

OAuth2Client.prototype.setClientSecret = function setClientSecret(clientSecret) {
  this.service.setClientSecret(clientSecret);
  return this;
};

OAuth2Client.prototype.setTokenUrl = function setTokenUrl(url) {
  this.service.setTokenUrl(url);
  return this;
};
