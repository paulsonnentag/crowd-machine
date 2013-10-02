(function () {
  'use strict';

  mmd.define('PhysicEntity', function () {

    var B2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    var B2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    var B2BodyDef = Box2D.Dynamics.b2BodyDef;
    var b2Body = Box2D.Dynamics.b2Body;

    function getPhysicBody(physicDef, world) {
      var i;
      var body;

      body = world.CreateBody(physicDef.body);

      for (i = 0; i < physicDef.fixtures.length; i++) {
        body.CreateFixture(physicDef.fixtures[i]);
      }

      return body;
    }

    var PhysicEntity = Class.extend({

      init: function (params) {
        this.sprite = this.getSprite(params);
        this.physicDef = this.getPhysicDef(this.sprite);
      },

      addTo: function (params) {
        var stage = params.stage;
        var world = params.world;

        stage.addChild(this.sprite);
        this.body = getPhysicBody(this.physicDef, world);
      },

      update: function () {
        var position = this.body.GetPosition();
        this.sprite.rotation = this.body.GetAngle();
        this.sprite.position.x = position.x * 30;
        this.sprite.position.y = position.y * 30;
      }

    });

    PhysicEntity.SCALE = 30;

    PhysicEntity.TYPE = {
      STATIC: b2Body.b2_staticBody,
      DYNAMIC: b2Body.b2_dynamicBody,
      KINEMATIC: b2Body.b2_kinematicBody
    };

    PhysicEntity.MATERIAL = {
      SOLID: {
        density: 1.0,
        friction: 0.5,
        restitution: 0.2
      }
    };

    PhysicEntity.getCircleDef = function (sprite, material) {
      var circleDef;

      if (material === undefined) {
        material = PhysicEntity.MATERIAL.SOLID;
      }

      circleDef = new B2FixtureDef();
      circleDef.density = material.density;
      circleDef.friction = material.friction;
      circleDef.restitution = material.restitution;
      circleDef.shape = new B2CircleShape(12 / 30);

      return circleDef;
    };

    PhysicEntity.getEdgeDef = function () {

    };

    PhysicEntity.getBodyDef = function (sprite, type) {
      var bodyDef;

      if (type === undefined) {
        type = PhysicEntity.TYPE.DYNAMIC;
      }

      bodyDef = new B2BodyDef();
      bodyDef.type = type;
      bodyDef.position.x = sprite.position.x / PhysicEntity.SCALE;
      bodyDef.position.y = sprite.position.y / PhysicEntity.SCALE;

      return bodyDef;
    };


    return PhysicEntity;

  });


}());