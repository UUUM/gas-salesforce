var Record = function Record(record) {
  if (record) {
    this.setRecord(record);
  }
};

Record.prototype.get = function get(key) {
  return this.params[key];
};

Record.prototype.setRecord = function setRecord(record) {
  if (!Obj.isObject(record)) {
    throw new Error('record must be an object');
  }

  this.attributes = record.attributes;
  this.apiPath = record.attributes.url;
  this.sobject = record.attributes.type;

  var params = {};
  for (var key in record) {
    if (!record.hasOwnProperty(key) || key === 'attributes') {
      continue;
    }

    params[key] = record[key];
  }
  this.params = params;

  return this;
};

Record.prototype.toObject = function toObject() {
  return this.params;
};
