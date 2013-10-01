(function () {
  'use strict';

  mmd.define('PhysicEntity', function () {

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

      init: function () {
        throw new Error('PhysicEntity is a abstract class');
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

    return PhysicEntity;

  });


}());