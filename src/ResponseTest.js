testRunner.functions.push(function (test) {
  var url;
  var response;

  function setup() {
    var client = (new TestCommon()).createClient();
    url = client.getApiUrl('');
    response = new Response(UrlFetchApp.fetch(url, client.option));
  }

  test('new Response()', function (assert) {
    setup();

    assert.throws(
      function () {
        return new Response('foo');
      },
      'throws an exception if response was not a HTTPResponse object'
    );

    var httpResponse = UrlFetchApp.fetch(url, {muteHttpExceptions: true});
    response = new Response(httpResponse);
    assert.ok(response instanceof Response, 'creates Response object with a valid argument');
    assert.equal(response.response, httpResponse, 'has a response property');
  });

  test('Response.getContentJson()', function (assert) {
    setup();

    var content = response.getContentJson();
    assert.equal(typeof content, 'object', 'returns an object');
  });

  test('Response.getHeader()', function (assert) {
    setup();

    var contentType = response.getHeader('Content-Type');
    assert.equal(contentType, 'application/json;charset=UTF-8', 'returns a valid header value');
  });

  test('Response.getHeaders()', function (assert) {
    setup();

    var headers = response.getHeaders();
    assert.equal(typeof headers, 'object', 'returns an object');
    assert.equal(headers['Content-Type'], 'application/json;charset=UTF-8', 'has a valid Content-Type');
  });

  test('Response.getResponseCode()', function (assert) {
    setup();

    assert.equal(response.getResponseCode(), 200, 'returns an http response code');
  });
});

/* eslint func-names: ["error", "never"] */
