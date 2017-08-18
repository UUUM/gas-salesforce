var Response = function Response(response) {
  if (typeof response !== 'object') {
    throw new Error('response must be an HTTPResponse object');
  }
  this.response = response;
};

Response.prototype.getBody = function getBody() {
  if (this.body) {
    return this.body;
  }

  var text = this.response.getContentText();
  if (text) {
    try {
      this.body = JSON.parse(text);
    } catch (error) {
      if (error instanceof SyntaxError) {
        this.body = text;
      } else {
        throw error;
      }
    }
  } else {
    this.body = {};
  }
  return this.body;
};

Response.prototype.getHeader = function getHeader(key) {
  return this.response.getHeaders()[key];
};

Response.prototype.getHeaders = function getHeaders() {
  return this.response.getAllHeaders();
};

Response.prototype.getResponseCode = function getResponseCode() {
  return this.response.getResponseCode();
};
