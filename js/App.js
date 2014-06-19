/*
 * App serves as the hub that connects each of the pieces
 */
define(["Kinetic", "Stage", "pubsub", "Resources", "game/World", "game/Robot", "game/Controls"],
  function (Kinetic, Stage, pubsub, R, World, Robot) {


    function load() {
    }

    function start() {
      w = new World();
      var layer = new Kinetic.Layer();
      Stage.add(layer);
      /*
      var bg_layer = new Kinetic.Layer();
      bg = new Kinetic.Rect({
        x:0, y:0, width:Stage.getWidth(), height:Stage.getHeight(),
        //fill: 'blue'
        fillPatternImage: R.point_img,
        fillPatternOffset: {x:0, y:0}
      });
      bg_layer.add(bg);
      //bg_layer.setDraggable(true);
      Stage.add(bg_layer);
      */

      pubsub.subscribe("world.add", function(msg, item) {
        layer.add(item);
        layer.draw();
      });

/*      var Stage = new Kinetic.Stage({
        container:'container',
        width:500, height:500
      });*/


      pubsub.publish("world.add", new Robot({x:0.5, y:0.5}));
      layer.setScale(100);
      /*
      layer.add( new Kinetic.Rect({
        x:0, y:0, width:490, height:490, stroke: 'red'//, fill: 'white'
      }));

      r = new Kinetic.Rect({
        x:0, y:200, width:100, height:100, stroke: 'red'
      });
      layer.add(r);
      (new Kinetic.Tween({
        node:r,
        x:600,
        duration:1
      })).play();
      */
    }

    return {
      load: load,
      start: start
    };
  });
