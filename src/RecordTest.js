testRunner.functions.push(function (test) {
  var sobject = {
    attributes: {
      type: 'Opportunity',
      url: '/services/data/v40.0/sobjects/Opportunity/0062800000KkTKJAA3'
    },
    Id: '0062800000KkTKJAA3',
    Account: {
      attributes: {
        type: 'Account',
        url: '/services/data/v40.0/sobjects/Account/00128000008zBAoAAM'
      },
      Id: '00128000008zBAoAAM'
    }
  };

  test('new Record()', function (assert) {
    var record = new Record();
    assert.ok(Obj.isObject(record), 'record is an object');
  });

  test('Record.get()', function (assert) {
    var record = new Record(sobject);
    assert.equal(record.get('Id'), sobject.Id, 'returns Id');
    assert.equal(record.get('Account.Id'), sobject.Account.Id, 'returns Account.Id');
  });

  test('Record.getApiPath()', function (assert) {
    var record = new Record(sobject);
    assert.equal(record.getApiPath(), sobject.attributes.url, 'returns an apiPath');
  });

  test('Record.getType()', function (assert) {
    var record = new Record(sobject);
    assert.equal(record.getType(), sobject.attributes.type, 'returns a type');
  });

  test('Record.getValues()', function (assert) {
    var record = new Record(sobject);
    var values = {
      Id: '0062800000KkTKJAA3',
      Account: {
        Id: '00128000008zBAoAAM'
      }
    };
    assert.deepEqual(record.getValues(), values, 'returns values');
  });

  test('Record.setRecord()', function (assert) {
    var record = new Record(sobject);

    assert.throws(
      function () {
        record.setRecord();
      },
      'throws an exception if record was not an object'
    );

    record.setRecord(sobject);
    assert.deepEqual(record.record, sobject, 'record has a record property');
  });
});

/* eslint func-names: ["error", "never"] */
