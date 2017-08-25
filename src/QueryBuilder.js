var QueryBuilder = function QueryBuilder() {
  this.fieldList = [];
  this.groups = [];
  this.orders = [];
  this.parameters = {};
};

QueryBuilder.prototype.assignParams = function assignParams(query, params) {
  return _.reduce(params, function replace(result, value, key) {
    return result.replace(':' + key, value);
  }, query);
};

QueryBuilder.prototype.getQuery = function getQuery() {
  var query = 'SELECT ' + this.fieldList.join(', ') + ' FROM ' + this.sobject;

  if (this.whereClause) {
    query += ' WHERE ' + this.whereClause;
  }

  if (this.groups.length) {
    query += ' GROUP BY ' + this.groups.join(', ');
  }

  if (this.orders.length) {
    query += ' ORDER BY ' + this.orders.join(', ');
  }

  if (this.limit) {
    query += ' LIMIT ' + this.limit;
  }

  if (this.offset) {
    query += ' OFFSET ' + this.offset;
  }

  return this.assignParams(query, this.parameters);
};

QueryBuilder.prototype.fields = function fields(fieldList) {
  if (!Obj.isArray(fieldList) && !Obj.isString(fieldList)) {
    throw new Error('Fields must be an array or a string');
  }

  this.fieldList = this.fieldList.concat(fieldList);
  return this;
};

QueryBuilder.prototype.from = function from(sobject) {
  if (!Obj.isString(sobject)) {
    throw new Error('SObject must be a string');
  }

  this.sobject = sobject;
  return this;
};

QueryBuilder.prototype.groupBy = function groupBy(columns) {
  if (!Obj.isArray(columns) && !Obj.isString(columns)) {
    throw new Error('Group columns must be an array or a string');
  }

  this.groups = this.groups.concat(columns);
  return this;
};

QueryBuilder.prototype.limit = function limit(x) {
  if (!Obj.isInteger(x)) {
    throw new Error('Limit must be an integer');
  }

  this.maxResults = x;
  return this;
};

QueryBuilder.prototype.offset = function offset(x) {
  if (!Obj.isInteger(x)) {
    throw new Error('Offset must be an integer');
  }

  this.firstResult = x;
  return this;
};

QueryBuilder.prototype.orderBy = function orderBy(column, order) {
  if (!Obj.isString(column)) {
    throw new Error('Column must be a string');
  }

  var orderUpperCase;
  if (order) {
    orderUpperCase = order.toUpperCase();
  } else {
    orderUpperCase = 'ASC';
  }
  if (orderUpperCase !== 'ASC' && orderUpperCase !== 'DESC') {
    throw new Error('Order must be "ASC" or "DESC"');
  }

  this.orders = this.orders.concat(column + ' ' + orderUpperCase);
  return this;
};

QueryBuilder.prototype.params = function params(parameters) {
  if (!Obj.isObject(parameters)) {
    throw new Error('Parameters must be an object');
  }

  this.parameters = Obj.merge(this.parameters, parameters);
  return this;
};

QueryBuilder.prototype.quoteString = function quoteString(str) {
  return "'" + str.replace("'", "\'") + "'";
};

QueryBuilder.prototype.where = function where(whereClause) {
  if (!Obj.isString(whereClause)) {
    throw new Error('Where clause must be a string');
  }

  this.whereClause = whereClause;
  return this;
};
