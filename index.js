const Client = require('./client');
const Server = require('./server');

const PORT = process.env.REDUX_IPC_PORT || 8080;
const PROTOCOL = process.env.REDUX_IPC_PROTOCOL || 'redux-ipc';

const socket = new Client(`ws://localhost:${PORT}`, PROTOCOL);

module.exports = ({ getState }) => {
  return next => action => {
    const state = getState();
    const data = { action, state };
    // sends the data to the server
    socket.on('open', () => {
      socket.send(JSON.stringify(data));
    });
    return next(action);
  };
};

module.exports.port = PORT;
module.exports.protocol = PROTOCOL;
module.exports.Client = Client;
module.exports.Server = Server;
