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

    assert.throws(
      function () {
        api.query('SELECT * FROM Opportunity');
      },
      'throws a ResponseError'
    );
  });

  test('API.resources()', function (assert) {
    var resources = api.resources();
    assert.ok(Obj.isObject(resources), 'returns resources');
  });

  test('API.versions()', function (assert) {
    var versions = api.versions();
    assert.ok(Obj.isArray(versions), 'returns versions');
  });
});

/* eslint func-names: ["error", "never"] */
