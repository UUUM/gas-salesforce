var Salesforce = function Salesforce(version, clientId, clientSecret) {
  this.client = new Client(version, clientId, clientSecret);
};

Salesforce.prototype.callback = function callback(request) {
  return this.client.oauth2.callback(request);
};

Salesforce.prototype.doGet = function doGet(e) {
  return this.client.oauth2.doGet(e);
};

Salesforce.prototype.getAuthorizationUrl = function getAuthorizationUrl() {
  return this.client.oauth2.service.getAuthorizationUrl();
};

Salesforce.prototype.query = function query(soql) {
  var response = this.client.fetchGet('query', { q: soql });
  if (response instanceof ResponseError) {
    return response;
  }

  return new Records(this.client, response);
};
