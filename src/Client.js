var Client = function Client(clientId, clientSecret) {
  if (typeof clientId !== 'string' || clientId.length < 1) {
    throw new Error('clientId must be specified');
  }
  this.clientId = clientId;

  if (typeof clientSecret !== 'string' || clientSecret.length < 1) {
    throw new Error('clientSecret must be specified');
  }
  this.clientSecret = clientSecret;

  this.oauth2 = this.createOAuth2();

  this.option = {
    contentType: 'application/json',
    headers: this.objMerge(this.getAuthorizationHeader(), {
      Accept: 'application/json'
    }),
    muteHttpExceptions: true
  };
};


Client.prototype.serviceName = 'salesforce';

Client.prototype.authorizationBaseUrl = 'https://login.salesforce.com/services/oauth2/authorize';
Client.prototype.tokenUrl = 'https://login.salesforce.com/services/oauth2/token';

Client.prototype.callback = 'authCallback';


Client.prototype.createOAuth2 = function createOAuth2() {
  var oauth2 = new OAuth2Client(this.serviceName);

  oauth2.setAuthorizationBaseUrl(this.authorizationBaseUrl);
  oauth2.setTokenUrl(this.tokenUrl);

  oauth2.setClientId(this.clientId);
  oauth2.setClientSecret(this.clientSecret);

  oauth2.setCallback(this.callback);

  return oauth2;
};

Client.prototype.fetch = function fetch(method, path) {
  var url = this.getApiUrl(path);
  var option = this.objMerge(this.option, {
    method: method
  });
  return new Response(UrlFetchApp.fetch(url, option));
};

Client.prototype.getApiUrl = function getApiUrl(path) {
  return this.oauth2.getInstanceUrl() + '/' + path;
};

Client.prototype.getAuthorizationHeader = function getAuthorizationHeader() {
  return { Authorization: 'Bearer ' + this.oauth2.getAccessToken() };
};

Client.prototype.objMerge = function merge() {
  var obj = {};
  for (var i = 0; i < arguments.length; i++) {
    var argument = arguments[i];
    for (var key in argument) {
      if (!argument.hasOwnProperty(key)) {
        continue;
      }
      obj[key] = argument[key];
    }
  }
  return obj;
};
