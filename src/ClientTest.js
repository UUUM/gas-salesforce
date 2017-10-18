testRunner.functions.push(function (test, common) {
  test('new Client()', function (assert) {
    var oauth2client = common.getOAuth2Client();
    var version = common.version;

    assert.throws(
      function () {
        return new Client(1, oauth2client);
      },
      'throws an exception if version was not a string'
    );

    assert.throws(
      function () {
        return new Client('', oauth2client);
      },
      'throws an exception if version was an empty string'
    );

    assert.throws(
      function () {
        return new Client(version, {});
      },
      'throws an exception if oauth2client was not an OAuth2Client object'
    );

    var client = new Client(version, oauth2client);
    assert.ok(client instanceof Client, 'creates Client object with a valid argument');
    assert.equal(client.version, version, 'has a version property');
    assert.equal(client.option.contentType, 'application/json', 'has a valid content type');
    assert.equal(client.option.muteHttpExceptions, true, 'has a valid muteHttpExceptions value');
    assert.ok(client.oauth2client instanceof OAuth2Client, 'has a oauth2client property');
  });

  test('Client.createQueryString()', function (assert) {
    var client = common.getClient();

    var queryString = client.createQueryString({});
    assert.equal(queryString, '', 'returns an empty string with no parameters');

    queryString = client.createQueryString({foo: 'bar', bar: 'baz'});
    assert.equal(queryString, 'foo=bar&bar=baz', 'returns a query string');

    queryString = client.createQueryString({foo: 'bar', ids: [1, 2]});
    assert.equal(queryString, 'foo=bar&ids%5B0%5D=1&ids%5B1%5D=2', 'returns an array query string');
  });

  test('Client.getApiPath()', function (assert) {
    var client = common.getClient();

    assert.equal('/services/data/v40.0/query', client.getApiPath('query'), 'returns a valid api path');
    assert.equal('/query', client.getApiPath('/query'), 'returns a path itself if it starts with /');
  });

  test('Client.getApiUrl()', function (assert) {
    var client = common.getClient();

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
    var client = common.getClient();
    var oauth2client = common.getOAuth2Client();

    assert.deepEqual(
      client.getAuthorizationHeader(),
      { Authorization: 'Bearer ' + oauth2client.getAccessToken() },
      'returns a valid authorization header'
    );
  });
});

/* eslint func-names: ["error", "never"] */
