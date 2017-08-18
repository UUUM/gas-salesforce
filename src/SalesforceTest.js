testRunner.functions.push(function (test) {
  var sf;

  function setup() {
    var common = new TestCommon();
    sf = common.createSalesforce();
  }

  test('new Salesforce()', function (assert) {
    setup();

    assert.ok(sf instanceof Salesforce, 'creates Salesforce object with a valid argument');
    assert.ok(sf.service, 'has a service property');
  });

  test('Salesforce auth', function (assert) {
    setup();

    Logger.log(sf.service.getRedirectUri());
    Logger.log(sf.getAuthorizationUrl());
    Logger.log(sf.service.hasAccess());
  });
});

/* eslint func-names: ["error", "never"] */
