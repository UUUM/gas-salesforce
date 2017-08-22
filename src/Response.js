var Response = function Response(response) {
  if (typeof response !== 'object') {
    throw new Error('response must be an HTTPResponse object');
  }
  this.response = response;
};

Response.prototype.getContentJson = function getContentJson() {
  if (this.json) {
    return this.json;
  }

  var text = this.response.getContentText();
  if (text) {
    try {
      this.json = JSON.parse(text);
    } catch (error) {
      if (error instanceof SyntaxError) {
        this.json = text;
      } else {
        throw error;
      }
    }
  } else {
    this.json = {};
  }
  return this.json;
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
