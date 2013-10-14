(function () {
  'use strict';

  var controllerElement = document.getElementById('controller');
  var leftButtonElement = document.getElementById('rightButton');
  var rightButtonElement = document.getElementById('leftButton');
  var spinnerElement = document.getElementById('spinner');
  var socket = io.connect();

  function getId() {
    return window.location.hash.slice(1);
  }

  socket.on('connect', function () {
    socket.emit('addPlayer', {id: getId()});
  });

  socket.on('join', function () {
    spinnerElement.classList.add('hidden');
    controllerElement.classList.remove('hidden');
  });

  socket.on('reject', function () {
    spinnerElement.classList.add('hidden');
    alert('Verbindung konnte nicht hergestellt werden !');
  });

  leftButtonElement.addEventListener('click', function () {
    socket.emit('right');
  });

  rightButtonElement.addEventListener('click', function () {
    socket.emit('left');
  });

  window.addEventListener('load', function () {
    FastClick.attach(document.body);
  }, false);

}());