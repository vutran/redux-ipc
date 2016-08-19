const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const http = require('http');
const express = require('express');
const Server = require('redux-ipc').Server;
const config = require('./webpack.config')

const PORT = process.env.REDUX_IPC_PORT || 8080;
const PROTOCOL = process.env.REDUX_IPC_PROTOCOL || 'redux-ipc';

const app = express();

const server = http.createServer(app);

// create a new redux ipc server
const wss = new Server({ server, socketName: PROTOCOL });
// listen to messages
wss.on('message', message => {
  console.log(message);
});

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", PORT, PORT);
  }
});
