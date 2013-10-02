(function () {
  'use strict';


  mmd.require(['Ball'],
    function (Ball) {


      var B2Vec2 = Box2D.Common.Math.b2Vec2;
      var b2BodyDef = Box2D.Dynamics.b2BodyDef;
      var b2Body = Box2D.Dynamics.b2Body;
      var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
      var b2Fixture = Box2D.Dynamics.b2Fixture;
      var B2World = Box2D.Dynamics.b2World;
      var b2MassData = Box2D.Collision.Shapes.b2MassData;
      var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
      var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
      var B2DebugDraw = Box2D.Dynamics.b2DebugDraw;


      var ball = new Ball({
        x: 200,
        y: 100,
        texture: PIXI.Texture.fromImage('assets/img/minus-ball.png')
      });

      var ball2 = new Ball({
        x: 100,
        y: 200,
        texture: PIXI.Texture.fromImage('assets/img/plus-ball.png')
      });


      var debugCanvas = document.getElementById('debugCanvas');
      debugCanvas.width = window.innerWidth;
      debugCanvas.height = window.innerHeight;

      var debugContext = debugCanvas.getContext('2d');

      var renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);

      document.body.appendChild(renderer.view);

      var stage = new PIXI.Stage(0x000000);

      var world = new B2World(
        new B2Vec2(0, 10),
        true
      );

      var fixDef = new b2FixtureDef;
      fixDef.density = 1.0;
      fixDef.friction = 0.5;
      fixDef.restitution = 0.2;

      var bodyDef = new b2BodyDef;

      //create ground
      bodyDef.type = b2Body.b2_staticBody;
      bodyDef.position.x = 9;
      bodyDef.position.y = 13;
      bodyDef.angle = 0.2;
      fixDef.shape = new b2PolygonShape;
      fixDef.shape.SetAsBox(10, 0.5);
      world.CreateBody(bodyDef).CreateFixture(fixDef);


     ball.addTo({
        world: world,
        stage: stage
      });

      ball2.addTo({
        world: world,
        stage: stage
      });


      var debugDraw = new B2DebugDraw();
      debugDraw.SetSprite(debugContext);
      debugDraw.SetDrawScale(30.0);
      debugDraw.SetFillAlpha(0.3);
      debugDraw.SetLineThickness(1.0);
      debugDraw.SetFlags(B2DebugDraw.e_shapeBit | B2DebugDraw.e_jointBit);
      world.SetDebugDraw(debugDraw);


      window.world = world;

      requestAnimationFrame(animate);

      function animate() {

        // simulate physics
        world.Step(1 / 60, 10, 10);
        world.ClearForces();
        world.DrawDebugData();

        ball.update();
        ball2.update();

        // render
        renderer.render(stage);

        requestAnimationFrame(animate);
      }

    });

}());