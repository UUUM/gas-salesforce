function doGet(e) {
  var sf = (new TestCommon()).createSalesforce();
  return HtmlService.createHtmlOutput('<a href="' + sf.getAuthorizationUrl() + '" target="_blank">Authorize</a>');
}

function authCallback(request) {
  var sf = (new TestCommon()).createSalesforce();
  var isAuthorized = sf.service.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  }
}
