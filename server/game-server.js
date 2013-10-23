(function () {
  'use strict';

  var _ = require('underscore');

  var viewerConnection;

  var getId = (function () {

    var id = 0;

    return function () {
      return id++;
    };
  }());

  function addViewer(connection) {

    viewerConnection = connection;

    connection.emit('join', {role: 'viewer'});

    connection.on('disconnect', function () {
      connection = undefined;
    });

  }

  function addPlayer(connection, data) {
    var player;

    if (viewerConnection !== undefined && (data.team === 0 || data.team === 1)) {

      player = {
        id: getId(),
        team: data.team
      };

      console.log(player);

      connection.emit('join', player);
      viewerConnection.emit('addPlayer', player);

      connection.on('left', function () {
        viewerConnection.emit('left', player);
      });

      connection.on('right', function () {
        viewerConnection.emit('right', player);
      });

      connection.on('disconnect', function () {
        viewerConnection.emit('removePlayer', player);
      });

    } else {
      connection.emit('reject');
    }
  }

  module.exports = {
    handleConnection: function (connection) {
      connection.on('addViewer', _(addViewer).partial(connection));
      connection.on('addPlayer', _(addPlayer).partial(connection));
    }
  };

}());