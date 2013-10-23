(function () {
  'use strict';

  var HEIGHT = 600;
  var WIDTH = 800;
  var PADDLE_WIDTH = 25;
  var PADDLE_HEIGHT = 100;
  var PADDLE_SPEED = 10;
  var LEFT_BORDER = 20;
  var RIGHT_BORDER = WIDTH - 20;

  var socket;
  var players = [
    [],
    []
  ];

  var score = [0, 0];

  var paddles = [];

  var ball = {
    pos: {
      x: WIDTH / 2,
      y: HEIGHT / 2
    },
    speed: {
      x: 5,
      y: 5
    },
    width: 20,
    height: 20
  };

  var canvas = document.getElementById('game');
  var context = canvas.getContext('2d');

  function init() {
    loop();
  }

  function drawRect(rect) {
    context.fillStyle = '#fff';
    context.fillRect(rect.pos.x - rect.width / 2, rect.pos.y - rect.height / 2, rect.width, rect.height);
  }

  function getPaddles(players, posX) {

    return _.map(players, function (player) {
      return {
        pos: {
          x: posX,
          y: player.posY
        },
        height: PADDLE_HEIGHT / players.length,
        width: PADDLE_WIDTH
      };
    });
  }

  function resetBall(team) {
    score[team] += 1;

    setTimeout(function () {
      ball.pos = {
        x: WIDTH / 2,
        y: HEIGHT / 2
      };

      ball.speed = {
        x: team ?  5 : -5,
        y: 0
      };

      ball.outOfField = false;

    }, 500);
  }

  function updateBall() {

    if (players[0].length > 0 && players[1].length > 0) {
      ball.pos.x += ball.speed.x;
      ball.pos.y += ball.speed.y;
    } else {
      ball.pos = {
        x: WIDTH / 2,
        y: HEIGHT / 2
      };
    }

    if (!ball.outOfField) {

      if (ball.pos.x - ball.width / 2 < LEFT_BORDER + PADDLE_WIDTH / 2) {

        if (hitTestBall(getPaddles(players[0]))) {
          ball.speed.x *= -1;
          ball.pos.x = LEFT_BORDER + PADDLE_WIDTH / 2 + ball.width / 2;
        } else {
          resetBall(1);
          ball.outOfField = true;
        }

      } else if (ball.pos.x + ball.width / 2 > RIGHT_BORDER - PADDLE_WIDTH / 2) {

        if (hitTestBall(getPaddles(players[1]))) {
          ball.speed.x *= -1;
          ball.pos.x = RIGHT_BORDER - PADDLE_WIDTH / 2 - ball.width / 2;
        } else {
          resetBall(0);
          ball.outOfField = true;
        }
      }

      if (ball.pos.y < ball.height / 2) {
        ball.speed.y *= -1;
        ball.pos.y = ball.height / 2;
      } else if (ball.pos.y + ball.height / 2 > HEIGHT) {
        ball.speed.y *= -1;
        ball.pos.y = HEIGHT - ball.height / 2;
      }

    }

  }

  function hitTestBall(paddles) {
    return _(paddles).any(testCollisionWithBall);
  }

  function testCollisionWithBall(paddle) {
    return (ball.pos.y + ball.height / 2 > paddle.pos.y - paddle.height / 2) && (ball.pos.y - ball.height / 2 < paddle.pos.y + paddle.height / 2);
  }

  function drawPaddles(paddles) {
    _(paddles).each(drawRect);
  }

  function drawScore(score, xPos) {
    context.fillStyle = 'red';
    context.font = 'bold 30px sans-serif';
    context.fillText(score, xPos, 30);
  }

  function loop() {

    context.fillStyle = '#000';
    context.fillRect(0, 0, WIDTH, HEIGHT);

    updateBall();

    drawRect(ball);

    paddles[0] = getPaddles(players[0], LEFT_BORDER);
    paddles[1] = getPaddles(players[1], RIGHT_BORDER);

    drawPaddles(paddles[0]);
    drawPaddles(paddles[1]);

    drawScore(score[0], LEFT_BORDER);
    drawScore(score[1], RIGHT_BORDER - 20);

    requestAnimationFrame(loop);
  }

  socket = io.connect();

  socket.on('connect', function () {
    socket.emit('addViewer');
  });

  socket.on('join', function () {
    console.log('join');
    init();
  });

  socket.on('reject', function () {
    alert('Verbindung konnte nicht hergestellt werden !');
  });

  socket.on('addPlayer', function (data) {
    players[data.team].push({
      id: data.id,
      posY: Math.random() * HEIGHT
    });

    console.log(players);
  });

  function idEquals(id, object) {
    return object.id === id;
  }

  socket.on('removePlayer', function (data) {
    players[data.team] = _.reject(players[data.team], _(idEquals).partial(data.id));
  });

  function getPaddle(paddleData, paddles) {
    return _.find(paddles[paddleData.team], _(idEquals).partial(paddleData.id));
  }

  function movePaddle(paddleData) {

    var paddle = getPaddle(paddleData, players);
    paddle.posY =  HEIGHT * paddleData.pos;
  }

  socket.on('move', movePaddle);


}());