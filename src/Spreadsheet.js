var Spreadsheet = function Spreadsheet(sf, sheet, qb) {
  if (!(sf instanceof Salesforce)) {
    throw new Error('sf must be a Salesforce object');
  }
  this.sf = sf;

  if (!Obj.isGASObject(sheet, 'Sheet')) {
    throw new Error('sheet must be a Sheet object');
  }
  this.sheet = sheet;

  if (!(qb instanceof QueryBuilder)) {
    throw new Error('qb must be a QueryBuilder object');
  }
  this.qb = qb;

  this.row = 1;
  this.column = 1;
  this.hasHeader = true;
};

Spreadsheet.prototype.sync = function sync() {
  var sf = this.sf;
  var sheet = this.sheet;
  var qb = this.qb;
  var fieldList = qb.fieldList;
  var fieldNum = fieldList.length;
  var row = this.row;
  var column = this.column;

  var records = sf.query(qb.getQuery());
  if (records instanceof ResponseError) {
    throw records;
  }

  if (this.hasHeader) {
    sheet.getRange(row, column, 1, fieldNum).setValues([fieldList]);
    row++;
  }

  records.forEach(function f(record) {
    var values = [];
    for (var i = 0; i < fieldNum; i++) {
      values[values.length] = record.get(fieldList[i]);
    }
    sheet.getRange(row, column, 1, fieldNum).setValues([values]);
    row++;
  });

  return this;
};
