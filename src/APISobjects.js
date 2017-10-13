var APISobjects = function APISobjects(client, name) {
  this.client = client;
  this.pathPrefix = 'sobjects/' + name + '/';
};

APISobjects.prototype.describe = function describe() {
  return this.jsonGet('describe');
};

APISobjects.prototype.getPath = function getPath(path) {
  return this.pathPrefix + path;
};

APISobjects.prototype.jsonGet = function jsonGet(path, params) {
  return this.client.jsonGet(this.getPath(path), params);
};

APISobjects.prototype.info = function info() {
  return this.jsonGet('');
};
