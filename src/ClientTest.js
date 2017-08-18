testRunner.functions.push(function (test) {
  var client;
  var clientId;
  var clientSecret;

  function setup() {
    var common = new TestCommon();
    clientId = common.clientId;
    clientSecret = common.clientSecret;
    client = common.createClient();
  }

  test('new Client()', function (assert) {
    setup();

    assert.throws(
      function () {
        return new Client(1, clientSecret);
      },
      'throws an exception if clientId was not a string'
    );

    assert.throws(
      function () {
        return new Client('', clientSecret);
      },
      'throws an exception if clientId was an empty string'
    );

    assert.throws(
      function () {
        return new Client(clientId, 1);
      },
      'throws an exception if clientSecret was not a string'
    );

    assert.throws(
      function () {
        return new Client(clientId, '');
      },
      'throws an exception if clientSecret was an empty string'
    );

    client = new Client(clientId, clientSecret);
    assert.ok(client instanceof Client, 'creates Client object with a valid argument');
    assert.equal(client.clientId, clientId, 'has a clientId property');
    assert.equal(client.clientSecret, clientSecret, 'has a clientSecret property');
    assert.equal(client.option.contentType, 'application/json', 'has a valid content type');
    assert.equal(client.option.muteHttpExceptions, true, 'has a valid muteHttpExceptions value');
  });

  test('Client.fetch', function (assert) {
    var response = client.fetch('get', 'services/data');
    Logger.log(response.getBody());
  });
});

/* eslint func-names: ["error", "never"] */
