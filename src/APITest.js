testRunner.functions.push(function (test, common) {
  var client = common.getClient();
  var api = new API(client);

  test('new API()', function (assert) {
    assert.throws(
      function () {
        return new API();
      },
      'throws an exception if client was not a Client object'
    );

    assert.ok(api instanceof API, 'creates API object with a valid argument');
    assert.ok(api.client instanceof Client, 'has a client property');
  });

  test('API.limits()', function (assert) {
    var limits = api.limits();
    assert.ok(Obj.isObject(limits), 'returns limits');
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

  test('API.sobjects()', function (assert) {
    var sobjects = api.sobjects();
    assert.ok(Obj.isObject(sobjects), 'returns sobjects');
  });

  test('API.versions()', function (assert) {
    var versions = api.versions();
    assert.ok(Obj.isArray(versions), 'returns versions');
  });
});

/* eslint func-names: ["error", "never"] */
