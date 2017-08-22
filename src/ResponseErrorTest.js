testRunner.functions.push(function (test) {
  test('new ResponseError()', function (assert) {
    var client = (new TestCommon()).createClient();

    var url = client.getApiUrl('foo');
    var option = {
      muteHttpExceptions: true
    };
    var response = new Response(UrlFetchApp.fetch(url, option));
    var content = response.getContentJson();

    var error = new ResponseError(response);
    assert.ok(error instanceof ResponseError, 'creates ResponseError object with a valid argument');
    assert.equal(error.response, response, 'has a response property');
    assert.equal(error.code, content.code, 'has a code property');
    assert.equal(error.message, content.message, 'has a message property');
  });
});

/* eslint func-names: ["error", "never"] */
