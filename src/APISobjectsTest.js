testRunner.functions.push(function (test, common) {
  var client = common.getClient();
  var api = new APISobjects(client, 'Account');

  test('new APISobjects()', function (assert) {
    assert.ok(api instanceof APISobjects, 'creates APISobjects object with a valid argument');
    assert.ok(api.client instanceof Client, 'has a client property');
    assert.equal(api.pathPrefix, 'sobjects/Account/', 'has a pathPrefix property');
  });

  test('APISobjects CRUD', function (assert) {
    var result = api.create({ Name: 'foo' });
    assert.ok(Obj.isObject(result), 'returns result');

    var id = result.id;
    Logger.log(api.get(id));
    Logger.log(api.update(id, { Name: 'bar' }));
    Logger.log(api.get(id));
    api.remove(id);
  });

  test('APISobjects.describe()', function (assert) {
    var describe = api.describe();
    assert.ok(Obj.isObject(describe), 'returns describe');
  });

  test('APISobjects.info()', function (assert) {
    var info = api.info();
    assert.ok(Obj.isObject(info), 'returns info');
  });
});

/* eslint func-names: ["error", "never"] */
