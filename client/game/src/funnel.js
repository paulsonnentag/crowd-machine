(function () {
  'use strict';

  mmd.define('Funnel', [
    'PhysicEntity'
  ], function (PhysicEntity) {


    var Funnel = PhysicEntity.extend({

      getSprite: function (params) {
        var texture = new PIXI.Texture.fromImage('assets/img/funnel.png');
        var sprite = new PIXI.Sprite(texture);

        sprite.anchor = {
          x: 0.5,
          y: 1
        };

        sprite.position = {
          x: params.x,
          y: params.y
        };

        return sprite;
      },

      getPhysicDef: function (sprite) {
        return {
          body: PhysicEntity.getBodyDef(sprite, PhysicEntity.TYPE.KINEMATIC),
          fixtures: [
            PhysicEntity.getEdgeDef(
              {x: -25, y: -50},
              {x: -13, y: 0}
            ),
            PhysicEntity.getEdgeDef(
              {x: 25, y: -50},
              {x: 13, y: 0}
            )
          ]
        };
      },

      setRotation: function (rotation) {
        var transform = PhysicEntity.getTransform(this.sprite.position, rotation);
        this.body.SetTransform(transform);
      }

    });

    return Funnel;

  });

}());