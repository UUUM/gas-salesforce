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
  });
});

/* eslint func-names: ["error", "never"] */
