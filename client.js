// if within node, use the ws package
// otherwise, use default web sockets

if (global.process) {
  const WebSocket = require('ws');

  module.exports = class Client extends WebSocket {
    constructor(url, socketName) {
      super(url, socketName);
    }
  }
} else {
  module.exports = WebSocket;
}
