var Records = function Records(client, response) {
  if (!(client instanceof Client)) {
    throw new Error('client must be a Client object');
  }
  this.client = client;

  this.setResponse(response);
};

Records.prototype.fetchNext = function fetchNext() {
  if (!this.nextApiPath || this.content.done) {
    return false;
  }

  var response = this.client.fetchGet(this.nextApiPath);
  if (response instanceof ResponseError) {
    throw response;
  }

  this.setResponse(response);
  return true;
};

Records.prototype.forEach = function forEach(func) {
  for (;;) {
    var records = this.records;
    for (var i = 0; i < records.length; i++) {
      func(records[i]);
    }

    if (!this.fetchNext()) {
      break;
    }
  }
};

Records.prototype.setResponse = function setResponse(response) {
  if (!(response instanceof Response)) {
    throw new Error('response must be a Response object');
  }

  this.response = response;

  this.content = response.getContentJson();
  this.nextApiPath = this.content.nextRecordsUrl;
  this.records = this.content.records;
  this.total = this.content.totalSize;

  return this;
};
