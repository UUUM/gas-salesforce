function doGet(e) {
  return (new TestCommon()).getClient().oauth2.doGet(e);
}

function authCallback(request) {
  return (new TestCommon()).getClient().oauth2.callback(request);
}

var TestCommon = function TestCommon() {
  this.version = '40.0';

  var properties = PropertiesService.getScriptProperties();

  this.clientId = properties.getProperty('clientId');
  this.clientSecret = properties.getProperty('clientSecret');
  this.spreadsheetId = properties.getProperty('spreadsheetId');
};

TestCommon.prototype.getClient = function getClient() {
  if (this.client) {
    return this.client;
  }

  this.client = new Client(this.version, this.clientId, this.clientSecret);
  return this.client;
};

TestCommon.prototype.getSalesforce = function createSalesforce() {
  if (this.sf) {
    return this.sf;
  }

  this.sf = new Salesforce(this.version, this.clientId, this.clientSecret);
  return this.sf;
};

TestCommon.prototype.getSpreadsheet = function getSpreadsheet() {
  if (this.ss) {
    return this.ss;
  }

  this.ss = SpreadsheetApp.openById(this.spreadsheetId);
  return this.ss;
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(doGet|authCallback)$" }] */
