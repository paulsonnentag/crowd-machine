(function () {
  'use strict';

  var sliderElement = document.getElementById('slider');
  var teamSelectionElement = document.getElementById('teamSelection');
  var team1ButtonElement = document.getElementById('team1Button');
  var team2ButtonElement = document.getElementById('team2Button');
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
    sliderElement.classList.remove('hidden');
  });

  socket.on('reject', function () {
    spinnerElement.classList.add('hidden');
    alert('Verbindung konnte nicht hergestellt werden !');
  });

  team1ButtonElement.addEventListener('click', function () {
    socket.emit('addPlayer', {team: 0});
    sliderElement.classList.remove('hidden');
    teamSelectionElement.classList.add('hidden');
  });

  team2ButtonElement.addEventListener('click', function () {
    socket.emit('addPlayer', {team: 1});
    sliderElement.classList.remove('hidden');
    teamSelectionElement.classList.add('hidden');
  });


  $(function () {

    // enable fast click
    window.addEventListener('load', function () {
      FastClick.attach(document.body);
    }, false);

    var $slider = $('#slider').noUiSlider({
      range: [0, 1],
      start: 0.5,
      handles: 1,
      slide: function () {
        socket.emit('move', {pos: $slider.val()});
      }
    });

  });



}());