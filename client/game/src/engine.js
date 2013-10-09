(function () {
  'use strict';

  var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  }());

  mmd.define('Engine',
    ['PhysicEntity'],
    function (PhysicEntity) {
      var B2Vec2 = Box2D.Common.Math.b2Vec2;
      var B2World = Box2D.Dynamics.b2World;
      var B2DebugDraw = Box2D.Dynamics.b2DebugDraw;
      var B2ContactListener = Box2D.Dynamics.b2ContactListener;

      var Engine = Class.extend({

        init: function () {
          this.entities = [];
          this.stage = new PIXI.Stage(0x000000);
          this.renderer = getRenderer();
          this.world = getWorld();
          this.contactListener = getContactListener(this.world, this.entities);
        },

        add: function (entity) {
          entity.addTo(this);
          this.entities.push(entity);

          return this;
        },

        start: function () {
          this.loop();
        },

        loop: function () {
          updateWorld(this.world);
          updateEntities(this.entities, this.world, this.stage);

          this.renderer.render(this.stage);

          requestAnimFrame(this.loop.bind(this));
        }
      });

      function getRenderer() {
        var renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.view);

        return renderer;
      }

      function getWorld() {
        var world = new B2World(
          new B2Vec2(0, 10),
          true
        );

        world.SetContactListener(getContactListener());
        world.SetDebugDraw(getDebugDraw());

        return world;
      }

      function getContactListener() {
        var contactListener = new B2ContactListener();

        contactListener.BeginContact = function (contact) {
          var entityA = contact.GetFixtureA().GetBody().GetUserData();
          var entityB = contact.GetFixtureB().GetBody().GetUserData();

          if (entityA instanceof PhysicEntity && entityB instanceof PhysicEntity) {
            entityA.onContact(entityB);
            entityB.onContact(entityA);
          }
        };

        return contactListener;
      }

      function getDebugDraw() {
        var debugCanvas;
        var debugDraw;
        var debugContext;

        debugDraw = new B2DebugDraw();

        debugCanvas = document.getElementById('debugCanvas');
        debugCanvas.width = window.innerWidth;
        debugCanvas.height = window.innerHeight;

        debugContext = debugCanvas.getContext('2d');

        debugDraw.SetSprite(debugContext);
        debugDraw.SetDrawScale(30.0);
        debugDraw.SetFillAlpha(0.3);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(B2DebugDraw.e_shapeBit | B2DebugDraw.e_jointBit);

        return debugDraw;
      }

      function updateWorld(world) {
        world.Step(1 / 60, 10, 10);
        world.ClearForces();
        //world.DrawDebugData();
      }

      function updateEntities(entities, world, stage) {
        var i, entity;

        for (i = 0; i < entities.length; i++) {
          entity = entities[i];

          if (entity.deleted) {
            deleteEntity(entity);

          } else {
            entities[i].update();
          }
        }

        function deleteEntity(entity) {
          var index;
          world.DestroyBody(entity.body);
          stage.removeChild(entity.sprite);

          index = entities.indexOf(entity);
          if (index !== -1) {
            entities.splice(index, 1);
          }
        }
      }


      return Engine;

    });


}());