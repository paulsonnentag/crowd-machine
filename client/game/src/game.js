(function () {
  'use strict';

  mmd.require(['Ball', 'Tube', 'Funnel', 'Bucket', 'Engine'],
    function (Ball, Tube, Funnel, Bucket, Engine) {

      var socket;
      var engine = new Engine();
      var tubes = [];

      function init() {
        var i, j, funnel, tube, bucket;

        for (j = 0; j < 3; j++) {
          for (i = 0; i < (7 + (j + 1) % 2); i++) {

            funnel = new Funnel({
              x: 110 * i + 100 + (55 * (j % 2)),
              y: 250 + 200 * j
            });

            tube = new Tube({
              x: 110 * i + 100 + (55 * (j % 2)),
              y: 250 + 200 * j,
              rotation: 20
            });

            tubes.push(tube);

            engine.add(funnel);
            engine.add(tube);
          }
        }

        bucket = new Bucket({
          x: 65,
          y: 750,
          type: Bucket.TYPE.TEAM1
        });

        engine.add(bucket);

        engine.start();

        loop();

      }

      function loop() {

        var ball  = new Ball({
          x: 110 * Math.floor(Math.random() * 8) + 100,
          y: -50,
          type: Math.random() < 0.5 ? Ball.TYPE.MINUS : Ball.TYPE.PLUS
        });

        engine.add(ball);

        setTimeout(function () {
          requestAnimationFrame(loop);
        }, 100);
      }

      socket = io.connect();

      socket.on('connect', function () {
        socket.emit('addViewer');
      });

      socket.on('join', function () {
        console.log('joined');
        init();
      });

      socket.on('reject', function () {
        alert('Verbindung konnte nicht hergestellt werden !');
      });

      socket.on('left', function (data) {
        var tube = tubes[data.id];

        tube.setRotation(20);
      });

      socket.on('right', function (data) {
        var tube = tubes[data.id];

        tube.setRotation(-20);
      });

    });

}());