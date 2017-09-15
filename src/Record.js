var Record = function Record(record) {
  if (record) {
    this.setRecord(record);
  }
};

Record.prototype.get = function get(key) {
  return this.record[key];
};

Record.prototype.getApiPath = function getApiPath() {
  return this.record.attributes.url;
};

Record.prototype.getType = function getType() {
  return this.record.attributes.type;
};

Record.prototype.getValues = function getValues() {
  if (this.values) {
    return this.values;
  }

  this.values = this._getValues(this.record);
  return this.values;
};

Record.prototype.setRecord = function setRecord(record) {
  if (!record || !Obj.isObject(record)) {
    throw new Error('record must be an object');
  }

  this.record = record;
  this.values = null;

  return this;
};

Record.prototype._getValues = function _getValues(record) {
  var values = {};
  for (var key in record) {
    if (!record.hasOwnProperty(key) || key === 'attributes') {
      continue;
    }

    var value = record[key];
    if (value.hasOwnProperty('attributes')) {
      values[key] = this._getValues(value);
    } else {
      values[key] = value;
    }
  }
  return values;
};
