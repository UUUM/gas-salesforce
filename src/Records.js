var Records = function Records(client, response) {
  this.client = client;
  this.setResponse(response);
};

Records.prototype.fetchNext = function fetchNext() {
  if (!this.nextApiPath || this.content.done) {
    return false;
  }

  this.setResponse(this.client.fetchGet(this.nextApiPath));
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
  if (typeof response !== 'object') {
    throw new Error('response must be a Response object');
  }

  this.response = response;

  this.content = response.getContentJson();
  this.nextApiPath = this.content.nextRecordsUrl;
  this.records = this.content.records;
};
