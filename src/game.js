(function () {
  'use strict';


  mmd.require(['Ball', 'Tube', 'Funnel', 'Engine'],
    function (Ball, Tube, Funnel, Engine) {


      var engine = new Engine();

      var i, j, funnel, tube;

      for (j = 0; j < 3; j++) {
        for (i = 0; i < (7 + (j+1) % 2); i++) {

          funnel = new Funnel({
            x: 110 * i + 100 + (55 * (j % 2)),
            y: 250 + 200 * j
          });

          tube = new Tube({
            x: 110 * i + 100 + (55 * (j % 2)),
            y: 250 + 200 * j,
            rotation: 20
          });

          engine.add(funnel);
          engine.add(tube);

        }

      }

      setInterval(function () {

        var ball  = new Ball({
          x: 110 * Math.floor(Math.random() * 8) + 100,
          y: -50,
          texture: Math.random() < 0.5 ? PIXI.Texture.fromImage('assets/img/minus-ball.png') : PIXI.Texture.fromImage('assets/img/plus-ball.png')
        });


        engine.add(ball);

      }, 300);


      engine.start();

    });

}());