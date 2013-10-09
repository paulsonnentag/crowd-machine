(function () {
  'use strict';

  // express
  var server, io, app;
  var socketIO = require('socket.io');
  var http = require('http');
  var express = require('express');

  app = express();
  app.use(express.logger('dev'));
  app.use('/game', express.static('../client/game'));
  app.use('/controller', express.static('../client/controller'));

  server = http.createServer(app);
  server.listen(8080);

  io = socketIO.listen(server);
  io.sockets.on('connection', function (socket) {

    console.log('connected client !!!');

  });

}());