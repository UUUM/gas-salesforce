var Salesforce = function Salesforce(version, clientId, clientSecret) {
  this.client = new Client(version, clientId, clientSecret);
};

Salesforce.prototype.query = function query(soql) {
  var response = this.client.fetchGet('query', { q: soql });
  return response.getBody();
};
