function doGet() {
  return (new TestCommon()).getOAuth2Client().getAuthorizationHtml();
}

function authCallback(request) {
  return (new TestCommon()).getOAuth2Client().callback(request);
}

var TestCommon = function TestCommon() {
  this.version = '40.0';

  var properties = PropertiesService.getScriptProperties();

  this.clientId = properties.getProperty('clientId');
  this.clientSecret = properties.getProperty('clientSecret');
  this.spreadsheetId = properties.getProperty('spreadsheetId');
};

TestCommon.prototype.getAPI = function getAPI() {
  if (this.api) {
    return this.api;
  }

  this.api = new API(this.getClient());
  return this.api;
};

TestCommon.prototype.getClient = function getClient() {
  if (this.client) {
    return this.client;
  }

  this.client = new Client(this.version, this.getOAuth2Client());
  return this.client;
};

TestCommon.prototype.getOAuth2Client = function getOAuth2Client() {
  if (this.oauth2client) {
    return this.oauth2client;
  }

  this.oauth2client = new OAuth2Client(this.clientId, this.clientSecret);
  return this.oauth2client;
};

TestCommon.prototype.getSpreadsheet = function getSpreadsheet() {
  if (this.ss) {
    return this.ss;
  }

  this.ss = SpreadsheetApp.openById(this.spreadsheetId);
  return this.ss;
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(doGet|authCallback)$" }] */
