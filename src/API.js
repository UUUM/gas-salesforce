var API = function API(version, clientId, clientSecret) {
  this.client = new Client(version, clientId, clientSecret);
};

API.prototype.oauth2Callback = function oauth2Callback(request) {
  return this.client.oauth2.callback(request);
};

API.prototype.oauth2DoGet = function oauth2DoGet(e) {
  return this.client.oauth2.doGet(e);
};

API.prototype.query = function query(soql) {
  var response = this.client.fetchGet('query', { q: soql });
  if (response instanceof ResponseError) {
    return response;
  }

  return new Records(this.client, response);
};
