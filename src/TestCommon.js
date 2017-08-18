var TestCommon = function TestCommon() {
  var properties = PropertiesService.getScriptProperties();

  this.clientId = properties.getProperty('clientId');
  this.clientSecret = properties.getProperty('clientSecret');
};

TestCommon.prototype.createSalesforce = function createSalesforce() {
  return new Salesforce(this.clientId, this.clientSecret);
};
