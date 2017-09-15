testRunner.functions.push(function (test) {
  var sf;
  var sheet;
  var qb;
  var ss;

  function setup() {
    var common = new TestCommon();
    sf = common.createSalesforce();
    sheet = common.getSpreadsheet().getSheetByName('Opportunity');
    qb = (new QueryBuilder())
      .from('Opportunity')
      .fields(['Id', 'Name', 'Account.Id', 'Account.Name'])
      .limit(10);
    ss = new Spreadsheet(sf, sheet, qb);
  }

  test('new Salesforce()', function (assert) {
    setup();

    assert.throws(
      function () {
        return new Spreadsheet(null, sheet, qb);
      },
      'throws an exception if sf was not a Salesforce object'
    );

    assert.throws(
      function () {
        return new Spreadsheet(sf, null, qb);
      },
      'throws an exception if sheet was not a Sheet object'
    );

    assert.throws(
      function () {
        return new Spreadsheet(sf, sheet, null);
      },
      'throws an exception if qb was not a QueryBuilder object'
    );

    ss = new Spreadsheet(sf, sheet, qb);
    assert.ok(ss instanceof Spreadsheet, 'creates Spreadsheet object with a valid argument');
    assert.equal(ss.sf, sf, 'has a sf property');
    assert.equal(ss.sheet, sheet, 'has a sheet property');
    assert.equal(ss.qb, qb, 'has a sheet property');
    assert.equal(ss.row, 1, 'has a row property');
    assert.equal(ss.column, 1, 'has a column property');
    assert.ok(ss.hasHeader, 'has a hasHeader property');
  });

  test('Salesforce.sync()', function () {
    setup();

    ss.sync();
  });
});

/* eslint func-names: ["error", "never"] */
