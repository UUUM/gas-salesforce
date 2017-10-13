testRunner.functions.push(function (test, common) {
  var api = common.getAPI();

  test('new API()', function (assert) {
    assert.ok(api instanceof API, 'creates API object with a valid argument');
    assert.ok(api.client instanceof Client, 'has a client property');
  });

  test('API.oauth2DoGet()', function (assert) {
    var output = api.oauth2DoGet();
    assert.ok(Obj.isGASObject(output, 'HtmlOutput'), 'returns HtmlOutput object');
  });

  test('API.query()', function (assert) {
    var records = api.query('SELECT Id FROM Opportunity');
    assert.ok(records instanceof Records, 'returns a Records object');

    var error = api.query('SELECT * FROM Opportunity');
    assert.ok(error instanceof ResponseError, 'returns a ResponseError object');
  });

  test('API.versions()', function (assert) {
    var versions = api.versions();
    assert.ok(Obj.isArray(versions), 'returns versions');
  });
});

/* eslint func-names: ["error", "never"] */
