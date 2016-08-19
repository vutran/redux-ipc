const EventEmitter = require('events');
const WebSocketServer = require('ws').Server;

module.exports = class Server extends EventEmitter {
  constructor(port, socketName) {
    super(port, socketName);
    const self = this;
    // creates a new server
    const wss = new WebSocketServer({
      handleProtocols: (protocols, callback) => {
        callback(true, socketName);
      },
      port,
    });
    // listen for connections
    wss.on('connection', connection => {
      connection.on('message', message => {
        self.emit('message', message);
      });
    });
  }

};
