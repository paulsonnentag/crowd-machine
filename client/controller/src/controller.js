(function () {
  'use strict';

  var controllerElement = document.getElementById('controller');
  var teamSelectionElement = document.getElementById('teamSelection');
  var team1ButtonElement = document.getElementById('team1Button');
  var team2ButtonElement = document.getElementById('team2Button');
  var rightButtonElement = document.getElementById('rightButton');
  var leftButtonElement = document.getElementById('leftButton');
  var spinnerElement = document.getElementById('spinner');
  var socket = io.connect();

  function vibrate(time) {
    if (navigator.vibrate) {
      navigator.vibrate(time);
    }
  }

  socket.on('connect', function () {
    spinnerElement.classList.add('hidden');
    teamSelectionElement.classList.remove('hidden');
    console.log('connect');
  });

  socket.on('join', function () {
    console.log('join');
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

  team1ButtonElement.addEventListener('click', function () {
    socket.emit('addPlayer', {team: 0});
    controllerElement.classList.remove('hidden');
    teamSelectionElement.classList.add('hidden');
  });

  team2ButtonElement.addEventListener('click', function () {
    socket.emit('addPlayer', {team: 1});
    controllerElement.classList.remove('hidden');
    teamSelectionElement.classList.add('hidden');
  });


  window.addEventListener('load', function () {
    FastClick.attach(document.body);
  }, false);

}());