const WebSocket = require('ws');

module.exports = class Client extends WebSocket {
  constructor(url, socketName) {
    super(url, socketName);
  }
}
