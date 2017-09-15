var TestCommon = function TestCommon() {
  this.version = '40.0';

  var properties = PropertiesService.getScriptProperties();

  this.clientId = properties.getProperty('clientId');
  this.clientSecret = properties.getProperty('clientSecret');
  this.spreadsheetId = properties.getProperty('spreadsheetId');
};

TestCommon.prototype.createClient = function createClient() {
  return new Client(this.version, this.clientId, this.clientSecret);
};

TestCommon.prototype.createSalesforce = function createSalesforce() {
  return new Salesforce(this.version, this.clientId, this.clientSecret);
};

TestCommon.prototype.getSpreadsheet = function getSpreadsheet() {
  return SpreadsheetApp.openById(this.spreadsheetId);
};
