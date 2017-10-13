testRunner.functions.push(function (test, common) {
  var sf = common.getSalesforce();

  test('new Salesforce()', function (assert) {
    assert.ok(sf instanceof Salesforce, 'creates Salesforce object with a valid argument');
    assert.ok(sf.client instanceof Client, 'has a client property');
  });

  test('Salesforce.doGet', function (assert) {
    var output = sf.doGet();
    assert.ok(Obj.isGASObject(output, 'HtmlOutput'), 'returns HtmlOutput object');
  });

  test('Salesforce.getAuthorizationUrl', function (assert) {
    var url = sf.getAuthorizationUrl();
    assert.ok(Obj.isString(url), 'returns string');
    assert.ok(url.length > 0, 'returned string is longer than 0');
  });

  test('Salesforce.query', function (assert) {
    var records = sf.query('SELECT Id FROM Opportunity');
    assert.ok(records instanceof Records, 'returns a Records object');

    var error = sf.query('SELECT * FROM Opportunity');
    assert.ok(error instanceof ResponseError, 'returns a ResponseError object');
  });
});

/* eslint func-names: ["error", "never"] */
