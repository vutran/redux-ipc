const EventEmitter = require('events');

if (global.process) {
  const WebSocketServer = require('ws').Server;
  module.exports = class Server extends EventEmitter {
    constructor({ server, port, socketName }) {
      super();
      const self = this;
      // creates a new server
      const wss = new WebSocketServer({
        server,
        port,
        handleProtocols: (protocols, callback) => {
          callback(true, socketName);
        },
      });
      // listen for connections
      wss.on('connection', connection => {
        connection.on('message', message => {
          self.emit('message', message);
        });
      });
    }
  };
} else {
  module.exports = class Server extends EventEmitter { };
}
