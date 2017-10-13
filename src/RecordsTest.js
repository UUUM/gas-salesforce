testRunner.functions.push(function (test, common) {
  var client = common.getClient();
  var response = client.fetchGet('query', { q: 'SELECT Id FROM Opportunity' });

  test('new Records()', function (assert) {
    assert.throws(
      function () {
        return new Records(null, response);
      },
      'throws an exception if client was not a Client object'
    );

    assert.throws(
      function () {
        return new Records(client, null);
      },
      'throws an exception if response was not a Response object'
    );

    var records = new Records(client, response);
    assert.ok(records.client instanceof Client, 'has a client property');
    assert.ok(records.response instanceof Response, 'has a response property');
  });

  test('Records.fetchNext', function (assert) {
    var records = new Records(client, response);

    for (;;) {
      if (records.content.done) {
        assert.notOk(records.fetchNext(), 'returns false if no records are available');
        break;
      }

      var prevResponse = records.response;
      assert.ok(records.fetchNext(), 'returns true if some records are available');
      assert.notEqual(records.response, prevResponse, 'a response object is different');
    }
  });

  test('Records.forEach', function (assert) {
    var records = new Records(client, response);

    var i = 0;
    records.forEach(function (record) {
      i++;

      if (i !== 1) {
        return;
      }

      assert.ok(record instanceof Record, 'record is a record object');
    });
    assert.equal(records.total, i, 'calls a function thu number of records times');
  });

  test('Records.setResponse', function (assert) {
    var records = new Records(client, response);

    records.setResponse(response);
    assert.ok(records.response instanceof Response, 'has a response property');
    assert.ok(records.content instanceof Object, 'has a content property');
    assert.ok(Obj.isString(records.nextApiPath), 'has a nextApiPath property');
    assert.ok(Obj.isArray(records.records), 'has a records property');
    assert.ok(Obj.isInteger(records.total), 'has a total property');
  });
});

/* eslint func-names: ["error", "never"] */
