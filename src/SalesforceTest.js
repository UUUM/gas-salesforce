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

  test('Salesforce.query', function (assert) {
    setup();

    var result = sf.query('SELECT Id, Name FROM Opportunity');
    Logger.log(result);
  });
});

/* eslint func-names: ["error", "never"] */
