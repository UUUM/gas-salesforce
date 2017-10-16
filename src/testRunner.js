function testRunner() {
  var test = new GasTap();
  var common = new TestCommon();

  if (!common.getClient().hasAccess()) {
    Logger.log('Authorize by Salesforce, first');
    return;
  }

  var functions = testRunner.functions;
  for (var i = 0; i < functions.length; i++) {
    try {
      functions[i](test, common);
    } catch (error) {
      test('Exception occurred', function f(assert) {
        Logger.log(error);
        assert.fail(error);
      });
    }
  }

  test.finish();
}

testRunner.functions = [];
