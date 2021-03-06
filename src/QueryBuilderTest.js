testRunner.functions.push(function testFunc(test) {
  test('new QueryBuilder()', function f(assert) {
    var qb = new QueryBuilder();
    assert.ok(qb instanceof QueryBuilder, 'creates QueryBuilder object');
  });

  test('QueryBuilder.assignParams()', function f(assert) {
    var qb = new QueryBuilder();

    var query = 'foo1 :foo2 :foo3 :foo4';
    var params = {
      foo1: 'bar',
      foo2: 1,
      foo3: 'bar',
      foo4: 'b\'"r\''
    };
    var str = qb.assignParams(query, params);
    assert.equal(str, "foo1 1 'bar' 'b\'\"r\''", 'returns a substituted string');
  });

  test('QueryBuilder.getQuery()', function f(assert) {
    var qb = (new QueryBuilder())
      .fields(['Id', 'Name'])
      .from('Opportunity')
      .groupBy('Name')
      .limit(1)
      .offset(2)
      .where('Id > :id and Name like :name')
      .params({id: 3, name: '%a\'b%'});

    var query = "SELECT Id, Name FROM Opportunity WHERE Id > 3 and Name like '%a\'b%' GROUP BY Name LIMIT 1 OFFSET 2";
    assert.equal(qb.getQuery(), query, 'returns an exact query');
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

  test('QueryBuilder.setupByParams()', function f(assert) {
    var qb = new QueryBuilder();
    qb.setupByParams({
      from: 'Opportunity',
      fields: ['Id', 'Name'],
      groupBy: 'Name',
      limit: 1,
      offset: 2,
      orderBy: [['Id', 'DESC']],
      where: 'Id > :id and Name like :name',
      params: {id: 3, name: '%a\'b%'}
    });
    assert.equal(qb.sobject, 'Opportunity', 'has an sobject property');
    assert.deepEqual(qb.fieldList, ['Id', 'Name'], 'has a fieldList property');
    assert.deepEqual(qb.groups, ['Name'], 'has a groups property');
    assert.equal(qb.maxResults, 1, 'has a maxResults property');
    assert.equal(qb.firstResult, 2, 'has a firstResult property');
    assert.deepEqual(qb.orders, ['Id DESC'], 'has a orders property');
    assert.equal(qb.whereClause, 'Id > :id and Name like :name', 'has a whereClause property');
    assert.deepEqual(qb.parameters, {id: 3, name: '%a\'b%'}, 'has a parameters property');
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
