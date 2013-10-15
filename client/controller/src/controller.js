(function () {
  'use strict';

  var controllerElement = document.getElementById('controller');
  var rightButtonElement = document.getElementById('rightButton');
  var leftButtonElement = document.getElementById('leftButton');
  var spinnerElement = document.getElementById('spinner');
  var socket = io.connect();

  function vibrate(time) {
    if (navigator.vibrate) {
      navigator.vibrate(time);
    }
  }

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
    socket.emit('left');
    vibrate(50);
  });

  rightButtonElement.addEventListener('click', function () {
    socket.emit('right');
    vibrate(50);
  });

  window.addEventListener('load', function () {
    FastClick.attach(document.body);
  }, false);

}());