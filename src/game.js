(function () {
  'use strict';


  mmd.require(['Ball', 'Tube', 'Engine'],
    function (Ball, Tube, Engine) {

      var ball = new Ball({
        x: 200,
        y: 100,
        texture: PIXI.Texture.fromImage('assets/img/minus-ball.png')
      });

      var ball2 = new Ball({
        x: 100,
        y: 200,
        texture: PIXI.Texture.fromImage('assets/img/plus-ball.png')
      });

      var tube = new Tube({
        x: 102,
        y: 300,
        rotation: 20
      });



      var engine = new Engine();

      engine
        .add(ball)
        .add(ball2)
        .add(tube);



      var i = 20;

      setInterval(function () {


        i+= 0.1;

        tube.setRotation(i);


      }, 10);


      engine.start();

    });

}());