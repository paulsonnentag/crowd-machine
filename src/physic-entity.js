(function () {
  'use strict';

  mmd.define('PhysicEntity', function () {
    var B2Vec2 = Box2D.Common.Math.b2Vec2;
    var B2Mat22 = Box2D.Common.Math.b2Mat22;
    var B2Transform = Box2D.Common.Math.b2Transform;
    var B2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    var B2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    var B2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
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

      addTo: function (game) {
        var stage = game.stage;
        var world = game.world;

        stage.addChildAt(this.sprite, 0);
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
        friction: 0.1,
        restitution: 0.01
      }
    };

    function getFixtureDef(material) {
      var fixtureDef;

      if (material === undefined) {
        material = PhysicEntity.MATERIAL.SOLID;
      }

      fixtureDef = new B2FixtureDef();
      fixtureDef.density = material.density;
      fixtureDef.friction = material.friction;
      fixtureDef.restitution = material.restitution;

      return fixtureDef;
    }

    PhysicEntity.getCircleDef = function (radius, material) {
      var circleDef = getFixtureDef(material);
      circleDef.shape = new B2CircleShape(radius / PhysicEntity.SCALE);

      return circleDef;
    };

    PhysicEntity.getEdgeDef = function (point1, point2, material) {
      var edgeDef = getFixtureDef(material);
      edgeDef.shape = new B2PolygonShape();
      edgeDef.shape.SetAsEdge(
        new B2Vec2(point1.x / PhysicEntity.SCALE, point1.y / PhysicEntity.SCALE),
        new B2Vec2(point2.x / PhysicEntity.SCALE, point2.y / PhysicEntity.SCALE)
      );

      return edgeDef;
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
      bodyDef.angle = sprite.rotation;

      return bodyDef;
    };

    PhysicEntity.getTransform = function (position, rotation) {
      var b2Matt22 = new B2Mat22();
      b2Matt22.Set(rotation / 180 * Math.PI);

      return new B2Transform(
        new B2Vec2(
          position.x / PhysicEntity.SCALE,
          position.y / PhysicEntity.SCALE
        ),
        b2Matt22
      );
    };

    return PhysicEntity;

  });


}());