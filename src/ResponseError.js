var ResponseError = function ResponseError(response) {
  this.response = response;

  var content = response.getContentJson();
  if (content instanceof Object) {
    this.code = content.errorCode;
    this.message = content.message;
  } else {
    this.message = content;
  }
};

ResponseError.prototype.toString = function toString() {
  return this.message;
};
