(function () {
  'use strict';


  mmd.require(['Ball', 'Engine'],
    function (Ball, Engine) {

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

      var engine = new Engine();

      engine
        .add(ball)
        .add(ball2);

    });

}());