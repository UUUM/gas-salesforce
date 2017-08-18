var Salesforce = function Salesforce(version, clientId, clientSecret) {
  this.client = new Client(version, clientId, clientSecret);
};
