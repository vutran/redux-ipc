const Client = require('./client');
const Server = require('./server');

const PORT = process.env.REDUX_IPC_PORT || 8080;
const PROTOCOL = process.env.REDUX_IPC_PROTOCOL || 'redux-ipc';

module.exports = ({ getState }) => {
  return next => action => {
    const nextState = next(action);
    const state = getState();
    const socket = new Client(`ws://localhost:${PORT}`, PROTOCOL);
    const data = { action, state };
    // sends the data to the server
    if (typeof WebSocket !== 'undefined' && socket instanceof WebSocket) {
      socket.onopen = () => {
        socket.send(JSON.stringify(data));
      };
    } else {
      socket.on('open', () => {
        socket.send(JSON.stringify(data));
      });
    }
    return nextState;
  };
};

module.exports.port = PORT;
module.exports.protocol = PROTOCOL;
module.exports.Client = Client;
module.exports.Server = Server;
