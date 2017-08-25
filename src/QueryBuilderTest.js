testRunner.functions.push(function testFunc(test) {
  test('new QueryBuilder()', function f(assert) {
    var qb = new QueryBuilder();
    assert.ok(qb instanceof QueryBuilder, 'creates QueryBuilder object');
  });

  test('QueryBuilder.fields()', function f(assert) {
    var qb = new QueryBuilder();
    assert.deepEqual(qb.fields, [], 'has an empty array');

    assert.throws(
      function f2() {
        qb.fields(1);
      },
      'throws an exception if value was a number'
    );

    assert.throws(
      function f2() {
        qb.fields({});
      },
      'throws an exception if value was an object'
    );

    assert.equal(qb.fields('foo'), qb, 'returns itself');
    assert.deepEqual(qb.fieldList, ['foo'], 'recieves a string');

    assert.equal(qb.fields(['bar', 'baz']), qb, 'returns itself');
    assert.deepEqual(qb.fieldList, ['foo', 'bar', 'baz'], 'recieves an array');
  });

  test('QueryBuilder.from()', function f(assert) {
    var qb = new QueryBuilder();
    assert.notOk(qb.sobject, 'not have a sobject property');

    assert.throws(
      function f2() {
        qb.from(1);
      },
      'throws an exception if value was a number'
    );

    assert.throws(
      function f2() {
        qb.from([]);
      },
      'throws an exception if value was an array'
    );

    assert.throws(
      function f2() {
        qb.from({});
      },
      'throws an exception if value was an object'
    );

    assert.equal(qb.from('Opportunity'), qb, 'returns itself');
    assert.equal(qb.sobject, 'Opportunity', 'has a sobject property');

    assert.equal(qb.from('Account'), qb, 'returns itself');
    assert.equal(qb.sobject, 'Account', 'has a sobject property');
  });

  test('QueryBuilder.groupBy()', function f(assert) {
    var qb = new QueryBuilder();
    assert.deepEqual(qb.groups, [], 'has an empty array');

    assert.throws(
      function f2() {
        qb.groupBy(1);
      },
      'throws an exception if value was a number'
    );

    assert.throws(
      function f2() {
        qb.groupBy({});
      },
      'throws an exception if value was an object'
    );

    assert.equal(qb.groupBy('foo'), qb, 'returns itself');
    assert.deepEqual(qb.groups, ['foo'], 'recieves a string');

    assert.equal(qb.groupBy(['bar', 'baz']), qb, 'returns itself');
    assert.deepEqual(qb.groups, ['foo', 'bar', 'baz'], 'has two groups');
  });

  test('QueryBuilder.limit()', function f(assert) {
    var qb = new QueryBuilder();
    assert.notOk(qb.maxResults, 'not have a maxResults property');

    assert.throws(
      function f2() {
        qb.limit('');
      },
      'throws an exception if value was a string'
    );

    assert.throws(
      function f2() {
        qb.limit([]);
      },
      'throws an exception if value was an array'
    );

    assert.throws(
      function f2() {
        qb.limit({});
      },
      'throws an exception if value was an object'
    );

    assert.equal(qb.limit(1), qb, 'returns itself');
    assert.equal(qb.maxResults, 1, 'has a maxResults property');

    assert.equal(qb.limit(2), qb, 'returns itself');
    assert.equal(qb.maxResults, 2, 'has a maxResults property');
  });

  test('QueryBuilder.offset()', function f(assert) {
    var qb = new QueryBuilder();
    assert.notOk(qb.firstResult, 'not have a firstResult property');

    assert.throws(
      function f2() {
        qb.offset('');
      },
      'throws an exception if value was a string'
    );

    assert.throws(
      function f2() {
        qb.offset([]);
      },
      'throws an exception if value was an array'
    );

    assert.throws(
      function f2() {
        qb.offset({});
      },
      'throws an exception if value was an object'
    );

    assert.equal(qb.offset(1), qb, 'returns itself');
    assert.equal(qb.firstResult, 1, 'has a firstResult property');

    assert.equal(qb.offset(2), qb, 'returns itself');
    assert.equal(qb.firstResult, 2, 'has a firstResult property');
  });

  test('QueryBuilder.orderBy()', function f(assert) {
    var qb = new QueryBuilder();
    assert.deepEqual(qb.orders, [], 'has an empty array');

    assert.throws(
      function f2() {
        qb.orderBy(1);
      },
      'throws an exception if column was a number'
    );

    assert.throws(
      function f2() {
        qb.orderBy([]);
      },
      'throws an exception if column was an array'
    );

    assert.throws(
      function f2() {
        qb.orderBy({});
      },
      'throws an exception if column was an object'
    );

    assert.throws(
      function f2() {
        qb.orderBy('foo', 'bar');
      },
      'throws an exception if order was not ASC nor DESC'
    );

    assert.equal(qb.orderBy('foo'), qb, 'returns itself');
    assert.deepEqual(qb.orders, ['foo ASC'], 'has an orders property');

    assert.equal(qb.orderBy('bar', 'DESC'), qb, 'returns itself');
    assert.deepEqual(qb.orders, ['foo ASC', 'bar DESC'], 'has an orders property');
  });

  test('QueryBuilder.params()', function f(assert) {
    var qb = new QueryBuilder();
    assert.deepEqual(qb.parameters, {}, 'has an empty object');

    assert.throws(
      function f2() {
        qb.params(1);
      },
      'throws an exception if value was a number'
    );

    assert.throws(
      function f2() {
        qb.params('');
      },
      'throws an exception if value was a string'
    );

    assert.throws(
      function f2() {
        qb.params([]);
      },
      'throws an exception if value was an array'
    );

    assert.equal(qb.params({foo: 'bar'}), qb, 'returns itself');
    assert.deepEqual(qb.parameters, {foo: 'bar'}, 'has a parameters property');

    assert.equal(qb.params({bar: 'baz'}), qb, 'returns itself');
    assert.deepEqual(qb.parameters, {foo: 'bar', bar: 'baz'}, 'has a parameters property');
  });

  test('QueryBuilder.quoteString()', function f(assert) {
    var qb = new QueryBuilder();

    assert.equal(qb.quoteString('foo'), "'foo'", 'returns quoted string');
    assert.equal(qb.quoteString("' \" ' \\ "), "'\' \" \' \\ '", 'returns quoted string');
  });

  test('QueryBuilder.where()', function f(assert) {
    var qb = new QueryBuilder();
    assert.notOk(qb.whereClause, 'not have a whereClause property');

    assert.throws(
      function f2() {
        qb.where(1);
      },
      'throws an exception if value was a number'
    );

    assert.throws(
      function f2() {
        qb.where([]);
      },
      'throws an exception if value was an array'
    );

    assert.throws(
      function f2() {
        qb.where({});
      },
      'throws an exception if value was an object'
    );

    assert.equal(qb.where('foo'), qb, 'returns itself');
    assert.equal(qb.whereClause, 'foo', 'has a whereClause property');

    assert.equal(qb.where('bar'), qb, 'returns itself');
    assert.equal(qb.whereClause, 'bar', 'has a whereClause property');
  });
});
