const { createStore, applyMiddleware } = require('redux');
const reduxIpcMiddleware = require('../');
const Server = reduxIpcMiddleware.Server;

const PORT = process.env.REDUX_IPC_PORT || 8080;
const PROTOCOL = process.env.REDUX_IPC_PROTOCOL || 'redux-ipc';

// create a new redux ipc server
const wss = new Server({ port: PORT, socketName: PROTOCOL });

// listen to messages
wss.on('message', message => {
  console.log(message);
});

function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1;
  case 'DECREMENT':
    return state - 1;
  default:
    return state;
  }
}

let store = createStore(counter, 0, applyMiddleware(reduxIpcMiddleware));

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
