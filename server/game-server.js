(function () {
  'use strict';

  var _ = require('underscore');

  var viewerConnection;
  var playerConnections = [];
  var ids = {};

  function reserveId(id) {
    var isValid;

    id = Math.floor(id);
    isValid = id >= 0 && id <= 100 && ids[id] === undefined;

    if (isValid) {
      ids[id] = true;
    }
    return isValid;
  }

  function emitEvent(name, event, connection) {
    connection.emit(name, event);
  }

  function hasJoined(connection) {
    return connection === viewerConnection || _(playerConnections).contains(connection);
  }

  function addViewer(connection) {
    if (!hasJoined(connection) && connection === undefined) {

      connection.emit('join', {role: 'viewer'});

      connection.on('disconnect', function () {
        connection = undefined;
      });

    } else {
      connection.emit('reject');
    }
  }

  function addPlayer(connection, data) {

    if (!hasJoined(connection) && reserveId(data.id)) {

      playerConnections.push(connection);

      connection.emit('join', {role: 'player'});

      connection.on('toggle', function () {
        viewerConnection.emit('toggle', {id: data.id});
      });

      connection.on('disconnect', function () {
        delete ids[data.id];
        playerConnections = _(playerConnections).without(connection);
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