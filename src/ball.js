(function () {
  'use strict';

  mmd.define('Ball', [
    'PhysicEntity'
  ], function (PhysicEntity) {

    function createSprite(params) {
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
    }

    function createPhysicDef(params) {
      var fixtureDef, bodyDef;
      var B2FixtureDef = Box2D.Dynamics.b2FixtureDef;
      var B2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
      var B2BodyDef = Box2D.Dynamics.b2BodyDef;
      var b2Body = Box2D.Dynamics.b2Body;

      bodyDef = new B2BodyDef();
      bodyDef.type = b2Body.b2_dynamicBody;
      bodyDef.position.x = params.x / 30;
      bodyDef.position.y = params.y / 30;

      fixtureDef = new B2FixtureDef();
      fixtureDef.density = 1.0;
      fixtureDef.friction = 0.5;
      fixtureDef.restitution = 0.2;
      fixtureDef.shape = new B2CircleShape(12 / 30);

      return {
        body: bodyDef,
        fixtures: [fixtureDef]
      };
    }

    var Ball = PhysicEntity.extend({

      init: function (params) {
        this.sprite = createSprite(params);
        this.physicDef = createPhysicDef(params);


        console.log('create ball', this);
      }
    });


    return Ball;



  });

}());