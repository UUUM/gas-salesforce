testRunner.functions.push(function (test) {
  var client;
  var clientId;
  var clientSecret;
  var version;

  function setup() {
    var common = new TestCommon();
    version = common.version;
    clientId = common.clientId;
    clientSecret = common.clientSecret;
    client = common.createClient();
  }

  test('new Client()', function (assert) {
    setup();

    assert.throws(
      function () {
        return new Client(1, clientId, clientSecret);
      },
      'throws an exception if version was not a string'
    );

    assert.throws(
      function () {
        return new Client('', clientId, clientSecret);
      },
      'throws an exception if version was an empty string'
    );

    assert.throws(
      function () {
        return new Client(version, 1, clientSecret);
      },
      'throws an exception if clientId was not a string'
    );

    assert.throws(
      function () {
        return new Client(version, '', clientSecret);
      },
      'throws an exception if clientId was an empty string'
    );

    assert.throws(
      function () {
        return new Client(version, clientId, 1);
      },
      'throws an exception if clientSecret was not a string'
    );

    assert.throws(
      function () {
        return new Client(version, clientId, '');
      },
      'throws an exception if clientSecret was an empty string'
    );

    client = new Client(version, clientId, clientSecret);
    assert.ok(client instanceof Client, 'creates Client object with a valid argument');
    assert.equal(client.version, version, 'has a version property');
    assert.equal(client.clientId, clientId, 'has a clientId property');
    assert.equal(client.clientSecret, clientSecret, 'has a clientSecret property');
    assert.equal(client.option.contentType, 'application/json', 'has a valid content type');
    assert.equal(client.option.muteHttpExceptions, true, 'has a valid muteHttpExceptions value');
    assert.ok(client.oauth2 instanceof OAuth2Client, 'has a oauth2 property');
  });

  test('Client.createQueryString()', function (assert) {
    setup();

    var queryString = client.createQueryString({});
    assert.equal(queryString, '', 'returns an empty string with no parameters');

    queryString = client.createQueryString({foo: 'bar', bar: 'baz'});
    assert.equal(queryString, 'foo=bar&bar=baz', 'returns a query string');

    queryString = client.createQueryString({foo: 'bar', ids: [1, 2]});
    assert.equal(queryString, 'foo=bar&ids%5B0%5D=1&ids%5B1%5D=2', 'returns an array query string');
  });

  test('Client.getApiPath()', function (assert) {
    setup();

    assert.equal('/services/data/v40.0/query', client.getApiPath('query'), 'returns a valid api path');
    assert.equal('/query', client.getApiPath('/query'), 'returns a path itself if it starts with /');
  });

  test('Client.getApiUrl()', function (assert) {
    setup();

    assert.equal(
      client.getApiUrl('query'),
      'https://uuum.my.salesforce.com/services/data/v40.0/query',
      'returns a valid api url'
    );

    assert.equal(
      client.getApiUrl('query', {q: 'SELECT'}),
      'https://uuum.my.salesforce.com/services/data/v40.0/query?q=SELECT',
      'returns a valid api url with query strings'
    );
  });

  test('Client.getAuthorizationHeader()', function (assert) {
    setup();

    assert.deepEqual(
      client.getAuthorizationHeader(),
      { Authorization: 'Bearer ' + client.oauth2.getAccessToken() },
      'returns a valid authorization header'
    );
  });
});

/* eslint func-names: ["error", "never"] */
