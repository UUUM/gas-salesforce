var OAuth2Client = function OAuth2Client(serviceName) {
  this.serviceName = serviceName;
  this.service = this.createService(serviceName);
};

OAuth2Client.prototype.callback = function callback(request) {
  var isAuthorized = this.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  }
  return HtmlService.createHtmlOutput('Denied. You can close this tab');
};

OAuth2Client.prototype.createService = function createService(serviceName) {
  var service = OAuth2.createService(serviceName);

  // Set the property store where authorized tokens should be persisted.
  service.setPropertyStore(PropertiesService.getUserProperties());

  return service;
};

OAuth2Client.prototype.doGet = function doGet() {
  return HtmlService.createHtmlOutput('<a href="' + this.getAuthorizationUrl() + '" target="_blank">Authorize</a>');
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
