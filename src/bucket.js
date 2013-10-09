(function () {
  'use strict';

  mmd.define('Bucket', [
    'PhysicEntity'
  ], function (PhysicEntity) {


    var Bucket = PhysicEntity.extend({

      init: function () {
        this._super.apply(this, arguments);
      },

      getSprite: function (params) {
        var texture = new PIXI.Texture.fromImage('assets/img/funnel.png');
        var sprite = new PIXI.Sprite(texture);

        sprite.anchor = {
          x: 0.5,
          y: 0
        };

        sprite.position = {
          x: params.x,
          y: params.y
        };

        return sprite;
      },

      getPhysicDef: function (sprite) {

        var leftEdge = PhysicEntity.getEdgeDef(
          {x: -25, y: 0},
          {x: -20, y: 50}
        );

        var rightEdge = PhysicEntity.getEdgeDef(
          {x: 25, y: 0},
          {x: 20, y: 50}
        );

        var bottomEdge = PhysicEntity.getEdgeDef(
          {x: -20, y: 50},
          {x: 20, y:  50}
        );

        return {
          body: PhysicEntity.getBodyDef(sprite, PhysicEntity.TYPE.KINEMATIC),
          fixtures: [
            leftEdge,
            rightEdge,
            bottomEdge
          ]
        };
      },

      onContact: function (entity) {
        entity.deleted = true;
      }
    });

    return Bucket;

  });

}());