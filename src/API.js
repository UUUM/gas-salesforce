var API = function API(client) {
  if (!(client instanceof Client)) {
    throw new Error('client must be a Client object');
  }
  this.client = client;
};

API.prototype.limits = function limits() {
  return this.client.jsonGet('limits');
};

API.prototype.oauth2Callback = function oauth2Callback(request) {
  return this.client.oauth2.callback(request);
};

API.prototype.oauth2DoGet = function oauth2DoGet(e) {
  return this.client.oauth2.doGet(e);
};

API.prototype.query = function query(soql) {
  var response = this.client.fetchGet('query', { q: soql });
  return new Records(this.client, response);
};

API.prototype.resources = function resources() {
  return this.client.jsonGet('');
};

API.prototype.sobjects = function sobjects() {
  return this.client.jsonGet('sobjects');
};

API.prototype.versions = function versions() {
  return this.client.jsonGet('/services/data/');
};
