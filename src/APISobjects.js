var APISobjects = function APISobjects(client, name) {
  this.client = client;
  this.pathPrefix = 'sobjects/' + name + '/';
};

APISobjects.prototype.create = function create(params) {
  return this.client.jsonPost(this.getPath(), params);
};

APISobjects.prototype.describe = function describe() {
  return this.jsonGet('describe');
};

APISobjects.prototype.get = function get(id, fields) {
  var params = {};
  if (fields) {
    params.fields = fields.join(',');
  }
  return this.client.jsonGet(this.getPath(id), params);
};

APISobjects.prototype.getPath = function getPath(path) {
  return path ? this.pathPrefix + path : this.pathPrefix;
};

APISobjects.prototype.jsonGet = function jsonGet(path, params) {
  return this.client.jsonGet(this.getPath(path), params);
};

APISobjects.prototype.info = function info() {
  return this.jsonGet();
};

APISobjects.prototype.remove = function remove(id) {
  this.client.fetchDelete(this.getPath(id));
  return true;
};

APISobjects.prototype.update = function update(id, params) {
  return this.client.jsonPatch(this.getPath(id), params);
};
