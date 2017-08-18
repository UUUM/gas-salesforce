function doGet(e) {
  return (new TestCommon()).createSalesforce().oauth2.doGet(e);
}

function authCallback(request) {
  return (new TestCommon()).createSalesforce().oauth2.callback(request);
}

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(doGet|authCallback)$" }] */
