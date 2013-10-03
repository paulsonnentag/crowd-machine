(function () {
  'use strict';

  mmd.define('Ball', [
    'PhysicEntity'
  ], function (PhysicEntity) {

    var Ball = PhysicEntity.extend({

      getSprite: function (params) {
        var sprite = new PIXI.Sprite(params.texture);

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

    return Ball;

  });

}());