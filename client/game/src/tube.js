(function () {
  'use strict';

  mmd.define('Tube', [
    'PhysicEntity'
  ], function (PhysicEntity) {


    var Tube = PhysicEntity.extend({

      addTo: function (world) {
        this._super(world);


        this.sprite.mouseenter = function () {
          console.log('judge fudge!')

        };

      },

      getSprite: function (params) {
        var texture = new PIXI.Texture.fromImage('assets/img/pipe.png');
        var sprite = new PIXI.Sprite(texture);

        sprite.anchor.x = 0.5;

        sprite.position = {
          x: params.x,
          y: params.y
        };

        sprite.interactive = true;
        sprite.rotation = (params.rotation / 180) * Math.PI;

        return sprite;
      },

      getPhysicDef: function (sprite) {
        return {
          body: PhysicEntity.getBodyDef(sprite, PhysicEntity.TYPE.KINEMATIC),
          fixtures: [
            PhysicEntity.getEdgeDef(
              {x: -13, y: 0},
              {x: -13, y: 75}
            ),
            PhysicEntity.getEdgeDef(
              {x: 13, y: 0},
              {x: 13, y: 75}
            )
          ]
        };
      },

      setRotation: function (rotation) {
        var transform = PhysicEntity.getTransform(this.sprite.position, rotation)
        this.body.SetTransform(transform);
      },

      toggleRotation: function () {
        console.log('click');
        this.setRotation(-this.sprite.rotation);
      }

    });

    return Tube;

  });

}());