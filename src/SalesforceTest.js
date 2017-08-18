testRunner.functions.push(function (test) {
  var sf;

  function setup() {
    var common = new TestCommon();
    sf = common.createSalesforce();
  }

  test('new Salesforce()', function (assert) {
    setup();

    assert.ok(sf instanceof Salesforce, 'creates Salesforce object with a valid argument');
    assert.ok(sf.oauth2, 'has a oauth2 property');
  });

  test('Salesforce auth', function (assert) {
    setup();

    var url = sf.oauth2.getInstanceUrl() + '/services/data';
    UrlFetchApp.fetch(url);
    var response = UrlFetchApp.fetch(url, {
      contentType: 'application/json',
      headers: {
        Authorization: 'Bearer ' + sf.oauth2.getAccessToken(),
        Accept: 'application/json'
      },
      muteHttpExceptions: true
    });
    Logger.log(response.getContentText());
  });
});

/* eslint func-names: ["error", "never"] */
