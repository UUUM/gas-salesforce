var API = function API(version, clientId, clientSecret) {
  this.client = new Client(version, clientId, clientSecret);
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

API.prototype.sobjectDescribe = function sobjectDescribe(name) {
  return this.client.jsonGet('sobjects/' + name + '/describe');
};

API.prototype.sobjectInfo = function sobjectInfo(name) {
  return this.client.jsonGet('sobjects/' + name);
};

API.prototype.sobjects = function sobjects() {
  return this.client.jsonGet('sobjects');
};

API.prototype.versions = function versions() {
  return this.client.jsonGet('/services/data/');
};
