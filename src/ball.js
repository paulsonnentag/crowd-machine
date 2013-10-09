(function () {
  'use strict';

  mmd.define('Ball', [
    'PhysicEntity'
  ], function (PhysicEntity) {

    var TYPE = {
      'PLUS': 0,
      'MINUS': 1
    };

    var TEXTURE_URL = {};
    TEXTURE_URL[TYPE.PLUS] = 'assets/img/plus-ball.png';
    TEXTURE_URL[TYPE.MINUS] = 'assets/img/minus-ball.png';

    var Ball = PhysicEntity.extend({

      init: function (params) {
        this.type = params;
        this._super.apply(this, arguments);
      },

      getSprite: function (params) {
        var texture = PIXI.Texture.fromImage(TEXTURE_URL[params.type]);
        var sprite = new PIXI.Sprite(texture);

        sprite.anchor = {
          x: 0.5,
          y: 0.5
        };

        sprite.position = {
          x: params.x,
          y: params.y
        };

        return sprite;
      },

      getPhysicDef: function (sprite) {
        return {
          body: PhysicEntity.getBodyDef(sprite),
          fixtures: [
            PhysicEntity.getCircleDef(25 / 2)
          ]
        };
      }

    });

    Ball.TYPE = TYPE;

    return Ball;

  });

}());