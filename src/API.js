var API = function API(version, clientId, clientSecret) {
  this.client = new Client(version, clientId, clientSecret);
};

API.prototype.jsonGet = function jsonGet(path, params) {
  return this.client.fetchGet(path, params).getContentJson();
};

API.prototype.limits = function limits() {
  return this.jsonGet('limits');
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
  return this.jsonGet('');
};

API.prototype.sobjectDescribe = function sobjectDescribe(name) {
  return this.jsonGet('sobjects/' + name + '/describe');
};

API.prototype.sobjectInfo = function sobjectInfo(name) {
  return this.jsonGet('sobjects/' + name);
};

API.prototype.sobjects = function sobjects() {
  return this.jsonGet('sobjects');
};

API.prototype.versions = function versions() {
  return this.jsonGet('/services/data/');
};
