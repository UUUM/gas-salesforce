testRunner.functions.push(function (test) {
  var sobject = {
    attributes: {
      type: 'Opportunity',
      url: '/services/data/v40.0/sobjects/Opportunity/0062800000KkTKJAA3'
    },
    Id: '0062800000KkTKJAA3'
  };

  test('new Record()', function (assert) {
    var record = new Record();
    assert.ok(Obj.isObject(record), 'record is an object');
  });

  test('Record.setRecord', function (assert) {
    var record = new Record(sobject);
    assert.equal(record.get('Id'), '0062800000KkTKJAA3', 'returns a value');
  });

  test('Record.setRecord', function (assert) {
    var record = new Record(sobject);

    assert.throws(
      function () {
        record.setRecord();
      },
      'throws an exception if record was not an object'
    );

    record.setRecord(sobject);
    assert.deepEqual(record.attributes, sobject.attributes, 'record has an attributes property');
    assert.equal(record.apiPath, sobject.attributes.url, 'record has an sobject property');
    assert.equal(record.sobject, sobject.attributes.type, 'record has an apiPath property');
  });

  test('Record.toObject', function (assert) {
    var record = new Record(sobject);
    assert.deepEqual(record.toObject(), {Id: '0062800000KkTKJAA3'}, 'returns an object');
  });
});

/* eslint func-names: ["error", "never"] */
