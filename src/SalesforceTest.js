testRunner.functions.push(function (test) {
  var sf;

  function setup() {
    var common = new TestCommon();
    sf = common.createSalesforce();
  }

  test('new Salesforce()', function (assert) {
    setup();

    assert.ok(sf instanceof Salesforce, 'creates Salesforce object with a valid argument');
    assert.ok(sf.client instanceof Client, 'has a client property');
  });

  test('Salesforce.doGet', function (assert) {
    setup();

    var output = sf.doGet();
    assert.equal(typeof output, 'object', 'returns HtmlOutput object');
  });

  test('Salesforce.getAuthorizationUrl', function (assert) {
    setup();

    var url = sf.getAuthorizationUrl();
    assert.equal(typeof url, 'string', 'returns string');
    assert.ok(url.length > 0, 'returned string is longer than 0');
  });

  test('Salesforce.query', function (assert) {
    setup();

    var records = sf.query('SELECT Id FROM Opportunity');
    assert.ok(records instanceof Records, 'returns a Records object');

    var error = sf.query('SELECT * FROM Opportunity');
    assert.ok(error instanceof ResponseError, 'returns a ResponseError object');
  });
});

/* eslint func-names: ["error", "never"] */
