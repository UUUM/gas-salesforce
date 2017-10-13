var Client = function Client(version, clientId, clientSecret) {
  if (!Obj.isString(version) || version.length < 1) {
    throw new Error('version must be specified');
  }
  this.version = version;

  this.oauth2 = new OAuth2Client(clientId, clientSecret);

  this.option = {
    contentType: 'application/json',
    headers: Obj.merge(this.getAuthorizationHeader(), {
      Accept: 'application/json'
    }),
    muteHttpExceptions: true
  };
};

Client.prototype.createQueryString = function createQueryString(params) {
  var values = [];
  for (var key in params) {
    if (!params.hasOwnProperty(key)) {
      continue;
    }
    var value = params[key];

    if (value instanceof Array) {
      for (var i = 0; i < value.length; i++) {
        var k = key + '[' + i + ']';
        var v = value[i];
        values.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
      }
    } else {
      values.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
  }
  return values.join('&');
};

Client.prototype.fetch = function fetch(method, path, queryParams, bodyParams) {
  var url = this.getApiUrl(path, queryParams);

  var option = Obj.merge(this.option, {
    method: method
  });
  if (bodyParams) {
    option.payload = JSON.stringify(bodyParams);
  }

  var response = new Response(UrlFetchApp.fetch(url, option));
  if (Math.floor(response.getResponseCode() / 100) === 2) {
    return response;
  }
  return new ResponseError(response);
};

Client.prototype.fetchDelete = function fetchDelete(path, params) {
  return this.fetch('delete', path, params ? params : {});
};

Client.prototype.fetchGet = function fetchGet(path, params) {
  return this.fetch('get', path, params ? params : {});
};

Client.prototype.fetchPatch = function fetchPatch(path, params) {
  return this.fetch('patch', path, null, params ? params : {});
};

Client.prototype.fetchPost = function fetchPost(path, params) {
  return this.fetch('post', path, null, params ? params : {});
};

Client.prototype.getApiPath = function getApiPath(path) {
  if (path[0] === '/') {
    return path;
  }
  return '/services/data/v' + this.version + '/' + path;
};

Client.prototype.getApiUrl = function getApiUrl(path, params) {
  var url = this.oauth2.getInstanceUrl() + this.getApiPath(path);

  var queryString = this.createQueryString(params);
  if (queryString) {
    url += '?' + queryString;
  }

  return url;
};

Client.prototype.getAuthorizationHeader = function getAuthorizationHeader() {
  return { Authorization: 'Bearer ' + this.oauth2.getAccessToken() };
};
