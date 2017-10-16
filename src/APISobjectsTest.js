testRunner.functions.push(function (test, common) {
  var client = common.getClient();
  var api = new APISobjects(client, 'Account');

  test('new APISobjects()', function (assert) {
    assert.ok(api instanceof APISobjects, 'creates APISobjects object with a valid argument');
    assert.ok(api.client instanceof Client, 'has a client property');
    assert.equal(api.pathPrefix, 'sobjects/Account/', 'has a pathPrefix property');
  });

  test('APISobjects CRUD', function (assert) {
    var id = api.create({ Name: 'foo' });
    assert.ok(Obj.isString(id), 'returns id');

    var record = api.get(id);
    assert.ok(record instanceof Record, 'returns Record object');
    assert.equal(record.get('Name'), 'foo', 'has an exact Name column');

    assert.ok(api.update(id, { Name: 'bar' }), 'returns true update()');
    record = api.get(id);
    assert.equal(record.get('Name'), 'bar', 'Name has been changed');

    assert.ok(api.remove(id), 'return true for remove()');
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
