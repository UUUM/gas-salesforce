testRunner.functions.push(function (test, common) {
  function getResponse() {
    var client = common.getClient();
    var url = client.getApiUrl('');
    return new Response(UrlFetchApp.fetch(url, client.option));
  }

  test('new Response()', function (assert) {
    assert.throws(
      function () {
        return new Response('foo');
      },
      'throws an exception if response was not a HTTPResponse object'
    );

    var httpResponse = UrlFetchApp.fetch(common.getClient().getApiUrl(''), {muteHttpExceptions: true});
    var response = new Response(httpResponse);
    assert.ok(response instanceof Response, 'creates Response object with a valid argument');
    assert.equal(response.response, httpResponse, 'has a response property');
  });

  test('Response.getContentJson()', function (assert) {
    var content = getResponse().getContentJson();
    assert.ok(Obj.isObject(content), 'returns an object');
  });

  test('Response.getHeader()', function (assert) {
    var contentType = getResponse().getHeader('Content-Type');
    assert.equal(contentType, 'application/json;charset=UTF-8', 'returns a valid header value');
  });

  test('Response.getHeaders()', function (assert) {
    var headers = getResponse().getHeaders();
    assert.ok(Obj.isObject(headers), 'returns an object');
    assert.equal(headers['Content-Type'], 'application/json;charset=UTF-8', 'has a valid Content-Type');
  });

  test('Response.getResponseCode()', function (assert) {
    assert.equal(getResponse().getResponseCode(), 200, 'returns an http response code');
  });
});

/* eslint func-names: ["error", "never"] */
