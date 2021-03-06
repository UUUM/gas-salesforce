testRunner.functions.push(function (test, common) {
  test('new OAuth2Client()', function (assert) {
    var clientId = common.clientId;
    var clientSecret = common.clientSecret;

    assert.throws(
      function () {
        return new OAuth2Client(1, clientSecret);
      },
      'throws an exception if clientId was not a string'
    );

    assert.throws(
      function () {
        return new OAuth2Client('', clientSecret);
      },
      'throws an exception if clientId was an empty string'
    );

    assert.throws(
      function () {
        return new OAuth2Client(clientId, 1);
      },
      'throws an exception if clientSecret was not a string'
    );

    assert.throws(
      function () {
        return new OAuth2Client(clientId, '');
      },
      'throws an exception if clientSecret was an empty string'
    );

    var oauth2 = new OAuth2Client(clientId, clientSecret);
    assert.ok(oauth2 instanceof OAuth2Client, 'creates OAuth2Client object with a valid argument');
    assert.equal(oauth2.clientId, clientId, 'has a clientId property');
    assert.equal(oauth2.clientSecret, clientSecret, 'has a clientSecret property');
    assert.ok(Obj.isObject(oauth2.service), 'has a service property');
  });

  test('oauth2client.getAuthorizationHtml()', function (assert) {
    var output = common.getOAuth2Client().getAuthorizationHtml();
    assert.ok(Obj.isGASObject(output, 'HtmlOutput'), 'returns HtmlOutput object');
  });
});

/* eslint func-names: ["error", "never"] */
