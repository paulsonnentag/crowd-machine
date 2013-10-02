(function () {
  'use strict';

  mmd.define('Tube', [
    'PhysicEntity'
  ], function (PhysicEntity) {


    var Tube = PhysicEntity.extend({

      getSprite: function (params) {
        var texture = new PIXI.Texture.fromImage('assets/img/pipe.png');
        var sprite = new PIXI.Sprite(texture);

        sprite.anchor.x = 0.5;

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
            PhysicEntity.getEdgeDef(
              {x: 0, y: 0},
              {x: 0, y: sprite.height}
            ),
            PhysicEntity.getEdgeDef(
              {x: sprite.width, y: 0},
              {x: sprite.width, y: sprite.height}
            )
          ]
        };
      }

    });

    return Tube;

  });

}());